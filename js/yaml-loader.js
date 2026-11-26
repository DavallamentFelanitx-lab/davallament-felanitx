/* ==========================================================================
   Lightweight Zero-Dependency YAML List Parser for Browser (GitHub Pages + Sveltia CMS Ready)
   Supports:
     - Comments (#)
     - Root lists of objects (- key: value) AND Sveltia CMS wrapped lists (items:\n  - key: value)
     - Quoted strings ("..." / '...') with escaped quotes & colons
     - Booleans (true/false) & numbers
     - Inline arrays: ["A", "B", "C"]
     - Multi-line child lists (scalars or objects)
     - Multi-line block scalars (|, |-, >, >-) and wrapped plain scalars
   ========================================================================== */

window.SimpleYAML = (function () {
  "use strict";

  function parseScalar(raw) {
    const val = raw.trim();
    if (!val) return "";

    if (val.startsWith('"') && val.endsWith('"') && val.length >= 2) {
      return val
        .slice(1, -1)
        .replace(/\\"/g, '"')
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t")
        .replace(/\\\\/g, "\\");
    }

    if (val.startsWith("'") && val.endsWith("'") && val.length >= 2) {
      return val.slice(1, -1).replace(/''/g, "'");
    }

    if (val.startsWith("[") && val.endsWith("]")) {
      const inner = val.slice(1, -1).trim();
      if (!inner) return [];
      const items = [];
      let current = "";
      let quote = null;
      for (let i = 0; i < inner.length; i++) {
        const ch = inner[i];
        if (quote) {
          if (ch === "\\" && quote === '"' && i + 1 < inner.length) {
            current += ch + inner[++i];
          } else if (ch === quote) {
            quote = null;
            current += ch;
          } else {
            current += ch;
          }
        } else {
          if (ch === '"' || ch === "'") {
            quote = ch;
            current += ch;
          } else if (ch === ",") {
            items.push(parseScalar(current));
            current = "";
          } else {
            current += ch;
          }
        }
      }
      if (current.trim()) items.push(parseScalar(current));
      return items;
    }

    if (val === "true") return true;
    if (val === "false") return false;
    if (val === "null" || val === "~") return null;
    if (/^-?\d+(\.\d+)?$/.test(val)) return Number(val);

    return val;
  }

  function splitKeyValue(text) {
    let quote = null;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (quote) {
        if (ch === "\\" && quote === '"') i++;
        else if (ch === quote) quote = null;
      } else {
        if (ch === '"' || ch === "'") quote = ch;
        else if (ch === ":" && (i + 1 === text.length || /\s/.test(text[i + 1]))) {
          return [text.slice(0, i).trim(), text.slice(i + 1).trim()];
        }
      }
    }
    return null;
  }

  function stripInlineComment(line) {
    let quote = null;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (quote) {
        if (ch === "\\" && quote === '"') i++;
        else if (ch === quote) quote = null;
      } else {
        if (ch === '"' || ch === "'") quote = ch;
        else if (ch === "#" && (i === 0 || /\s/.test(line[i - 1]))) {
          return line.slice(0, i).trimEnd();
        }
      }
    }
    return line;
  }

  function parseList(yamlText) {
    const rawLines = yamlText.replace(/\r\n/g, "\n").split("\n");

    // Detect if the file is a Sveltia CMS wrapper object (e.g. "items:\n  - id: ...")
    // and determine the base indent of the list items.
    let listItemIndent = 0;
    for (let i = 0; i < rawLines.length; i++) {
      const cleaned = stripInlineComment(rawLines[i]);
      const trimmed = cleaned.trim();
      if (!trimmed) continue;
      const ind = cleaned.length - cleaned.trimStart().length;
      if (trimmed.startsWith("- ") || trimmed === "-") {
        listItemIndent = ind;
        break;
      }
      // Top-level wrapper key like "items:" or "noticies:" -> look for first list item below it
      const kv = splitKeyValue(trimmed);
      if (kv && kv[1] === "") {
        for (let j = i + 1; j < rawLines.length; j++) {
          const c2 = stripInlineComment(rawLines[j]);
          const t2 = c2.trim();
          if (!t2) continue;
          const ind2 = c2.length - c2.trimStart().length;
          if (t2.startsWith("- ") || t2 === "-") {
            listItemIndent = ind2;
          }
          break;
        }
        break;
      }
      break;
    }

    const result = [];
    let currentObj = null;
    let activeListKey = null;
    let activeScalarKey = null;
    let activePropIndent = 0;
    let blockKey = null;
    let blockMode = null; // '|' or '>'
    let blockIndent = 0;
    let blockLines = [];

    function flushBlock() {
      if (blockKey && currentObj) {
        currentObj[blockKey] =
          blockMode === ">"
            ? blockLines.join(" ").replace(/\s+/g, " ").trim()
            : blockLines.join("\n").trim();
      }
      blockKey = null;
      blockMode = null;
      blockIndent = 0;
      blockLines = [];
    }

    function isBlockMarker(v) {
      return v === "|" || v === "|-" || v === "|+" || v === ">" || v === ">-" || v === ">+";
    }

    for (let i = 0; i < rawLines.length; i++) {
      const rawLine = rawLines[i];

      if (blockKey) {
        const trimmed = rawLine.trim();
        const indent = rawLine.length - rawLine.trimStart().length;
        if (trimmed === "") {
          blockLines.push("");
          continue;
        }
        if (blockIndent === -1) {
          if (indent > activePropIndent) {
            blockIndent = indent;
          } else {
            flushBlock();
          }
        }
        if (blockKey && indent >= blockIndent) {
          blockLines.push(rawLine.slice(blockIndent));
          continue;
        }
        flushBlock();
      }

      const cleaned = stripInlineComment(rawLine);
      const trimmed = cleaned.trim();
      if (!trimmed) continue;

      const indent = cleaned.length - cleaned.trimStart().length;

      // Skip top-level wrapper key (e.g. "items:") when listItemIndent > 0
      if (listItemIndent > 0 && indent < listItemIndent) {
        continue;
      }

      // New list item at listItemIndent: "- key: value" or "-"
      if (indent === listItemIndent && (trimmed.startsWith("- ") || trimmed === "-")) {
        activeListKey = null;
        activeScalarKey = null;
        currentObj = {};
        result.push(currentObj);
        const rest = trimmed.slice(1).trim();
        if (rest) {
          const kv = splitKeyValue(rest);
          if (kv) {
            const [k, v] = kv;
            activePropIndent = indent + 2;
            if (isBlockMarker(v)) {
              blockKey = k;
              blockMode = v[0];
              blockIndent = -1;
              blockLines = [];
            } else if (v === "") {
              currentObj[k] = [];
              activeListKey = k;
            } else {
              currentObj[k] = parseScalar(v);
              activeScalarKey = typeof currentObj[k] === "string" ? k : null;
            }
          }
        }
        continue;
      }

      if (!currentObj) continue;

      // Indented child list item under activeListKey
      if (activeListKey && indent > listItemIndent && trimmed.startsWith("- ")) {
        const itemText = trimmed.slice(2);
        const itemVal = parseScalar(itemText);
        if (!Array.isArray(currentObj[activeListKey])) {
          currentObj[activeListKey] = [];
        }
        currentObj[activeListKey].push(itemVal);
        activeScalarKey = null;
        continue;
      }

      // Wrapped continuation line for a plain scalar or list item (emitted by Sveltia / js-yaml)
      if (activeListKey && indent > activePropIndent + 1 && Array.isArray(currentObj[activeListKey]) && currentObj[activeListKey].length) {
        const lastIdx = currentObj[activeListKey].length - 1;
        if (typeof currentObj[activeListKey][lastIdx] === "string") {
          currentObj[activeListKey][lastIdx] = (currentObj[activeListKey][lastIdx] + " " + trimmed).trim();
          continue;
        }
      }

      const kv = splitKeyValue(trimmed);
      if (kv && indent <= listItemIndent + 2) {
        const [k, v] = kv;
        activeListKey = null;
        activeScalarKey = null;
        activePropIndent = indent;
        if (isBlockMarker(v)) {
          blockKey = k;
          blockMode = v[0];
          blockIndent = -1;
          blockLines = [];
        } else if (v === "") {
          currentObj[k] = [];
          activeListKey = k;
        } else {
          currentObj[k] = parseScalar(v);
          activeScalarKey = typeof currentObj[k] === "string" ? k : null;
        }
        continue;
      }

      if (activeScalarKey && indent > activePropIndent) {
        currentObj[activeScalarKey] = (String(currentObj[activeScalarKey]) + " " + trimmed).trim();
      }
    }

    flushBlock();
    return result;
  }

  async function fetchYamlList(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} loading ${url}`);
    const text = await res.text();
    return parseList(text);
  }

  return {
    parseList,
    fetchYamlList
  };
})();
