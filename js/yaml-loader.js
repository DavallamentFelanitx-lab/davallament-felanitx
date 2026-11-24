/* ==========================================================================
   Lightweight Zero-Dependency YAML List Parser for Browser (GitHub Pages Ready)
   Supports:
     - Comments (#)
     - Root lists of objects (- key: value)
     - Quoted strings ("..." / '...') with escaped quotes & colons
     - Booleans (true/false) & numbers
     - Inline arrays: ["A", "B", "C"]
     - Multi-line child lists:
         cos:
           - "Paràgraf 1"
           - "Paràgraf 2"
     - Multi-line block scalars (| or >)
   ========================================================================== */

window.SimpleYAML = (function () {
  "use strict";

  function parseScalar(raw) {
    const val = raw.trim();
    if (!val) return "";

    // Double-quoted string
    if (val.startsWith('"') && val.endsWith('"') && val.length >= 2) {
      return val
        .slice(1, -1)
        .replace(/\\"/g, '"')
        .replace(/\\n/g, "\n")
        .replace(/\\\\/g, "\\");
    }

    // Single-quoted string
    if (val.startsWith("'") && val.endsWith("'") && val.length >= 2) {
      return val.slice(1, -1).replace(/''/g, "'");
    }

    // Inline array [a, b, c]
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
    const lines = yamlText.replace(/\r\n/g, "\n").split("\n");
    const result = [];
    let currentObj = null;
    let activeListKey = null;
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

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];

      // Handle active block scalar (| or >)
      if (blockKey) {
        const trimmed = rawLine.trim();
        const indent = rawLine.length - rawLine.trimStart().length;
        if (trimmed === "") {
          blockLines.push("");
          continue;
        }
        if (indent >= blockIndent) {
          blockLines.push(rawLine.slice(blockIndent));
          continue;
        }
        flushBlock();
      }

      const cleaned = stripInlineComment(rawLine);
      const trimmed = cleaned.trim();
      if (!trimmed) continue;

      const indent = cleaned.length - cleaned.trimStart().length;

      // New top-level item: "- key: value" or "-"
      if (indent === 0 && (trimmed.startsWith("- ") || trimmed === "-")) {
        activeListKey = null;
        currentObj = {};
        result.push(currentObj);
        const rest = trimmed.slice(1).trim();
        if (rest) {
          const kv = splitKeyValue(rest);
          if (kv) {
            const [k, v] = kv;
            if (v === "|" || v === ">") {
              blockKey = k;
              blockMode = v;
              blockIndent = 4;
              blockLines = [];
            } else if (v === "") {
              currentObj[k] = [];
              activeListKey = k;
            } else {
              currentObj[k] = parseScalar(v);
            }
          }
        }
        continue;
      }

      if (!currentObj) continue;

      // Indented child list item under activeListKey (e.g. "    - Paràgraf")
      if (activeListKey && trimmed.startsWith("- ")) {
        const itemVal = parseScalar(trimmed.slice(2));
        if (!Array.isArray(currentObj[activeListKey])) {
          currentObj[activeListKey] = [];
        }
        currentObj[activeListKey].push(itemVal);
        continue;
      }

      // Property on current object
      const kv = splitKeyValue(trimmed);
      if (kv) {
        const [k, v] = kv;
        activeListKey = null;
        if (v === "|" || v === ">") {
          blockKey = k;
          blockMode = v;
          blockIndent = indent + 2;
          blockLines = [];
        } else if (v === "") {
          currentObj[k] = [];
          activeListKey = k;
        } else {
          currentObj[k] = parseScalar(v);
        }
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
