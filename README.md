# El Davallament de Felanitx — Portal Web

Web divulgativa i arxiu documental de l'**Associació El Davallament de Felanitx** (Mallorca), dedicada a donar a conèixer la representació de la Passió, Mort i Descendiment de Jesucrist que se celebra cada Divendres Sant a l'escalinata de la Parròquia de Sant Miquel des de 1975.

- **Web publicada (GitHub Pages):** https://davallamentfelanitx-lab.github.io/davallament-felanitx/
- **Repositori:** https://github.com/DavallamentFelanitx-lab/davallament-felanitx
- **Tecnologia:** HTML5, CSS3 i JavaScript pur (sense dependències ni compilació) + dades editables en format **YAML**.

---

## Estructura del projecte

```text
davallament-felanitx/
├── index.html              # Pàgina principal (carrusel real, benvinguda, avançaments i guia)
├── historia.html           # Història, cronologia (1975–2026) i protagonistes
├── representacio.html      # Explorador interactiu escena per escena (8 quadres)
├── noticies.html           # Notícies amb notícia destacada automàtica, cerca de text complet i lector modal
├── entitat.html            # L'entitat: sobre l'Associació, Junta Directiva i convocatòries a reunions
├── galeria.html            # Galeria de fotografies reals amb filtres per àlbum i visor lightbox
├── contacte.html           # Informació de l'Associació i formulari connectat a davallamentfelanitx@gmail.com
├── .nojekyll               # Indica a GitHub Pages que serveixi els fitxers tal qual (inclòs YAML)
├── css/
│   └── style.css           # Disseny responsive i identitat visual oficial
├── data/
│   ├── noticies.yaml       # Fitxer editable de notícies
│   ├── junta.yaml          # Fitxer editable de la Junta Directiva
│   ├── convocatories.yaml  # Fitxer editable de convocatòries a reunions i assemblees
│   ├── galeria.yaml        # Fitxer editable de la galeria d'imatges
│   └── multimedia.yaml     # Fitxer editable dels vídeos de YouTube (apartat Multimèdia)
├── js/
│   ├── data.js             # Textos base, escenes, cronologia i dades de reserva
│   ├── i18n.js             # Traduccions completes de tota la web (CA, ES, EN)
│   ├── yaml-loader.js      # Lector YAML lleuger sense dependències per al navegador
│   └── main.js             # Capçalera, peu, carrusel, filtres, modals, lightbox i idiomes
└── img/
    ├── logo/
    │   └── logo.png        # Logotip oficial d'El Davallament de Felanitx
    └── hero/
        ├── hero1.jpg       # El Davallament de la Creu
        ├── hero2.jpg       # Escorta dels Armats per l'escalinata
        ├── hero3.jpg       # El Judici de Ponç Pilat i la Flagel·lació
        └── hero4.jpg       # La Caiguda amb la Creu i la Verònica
```

---

## Com editar el contingut fàcilment (Sveltia CMS o YAML)

### Opció A — Gestor visual **Sveltia CMS** (recomanat)

Pots editar notícies, fotografies de galeria, vídeos de YouTube, la Junta Directiva, convocatòries i la línia temporal d'Història des d'un panell visual sense tocar cap codi:

- **En local (sense contrasenyes ni servidor extra):**
  1. Obre **http://127.0.0.1:8096/admin/** amb **Chrome** o **Edge**.
  2. Fes clic a **«Work with Local Repository»** (*Treballa amb el repositori local*) i selecciona la carpeta del projecte (`davallament-felanitx-repo`).
  3. Edita i desa directament els fitxers del projecte!
- **A GitHub Pages (en línia des de qualsevol dispositiu):**
  1. Obre **https://davallamentfelanitx-lab.github.io/davallament-felanitx/admin/**.
  2. Fes clic a **«Sign in with Token»** i introdueix un *Personal Access Token (classic)* de GitHub amb permís `repo` (o *Fine-grained token* amb permís *Contents: Read and write* sobre aquest repositori).
  3. Cada vegada que facis clic a **Desar / Publicar**, Sveltia CMS farà el `commit` automàticament a la branca `develop` i GitHub Pages actualitzarà la web en 1–2 minuts.

### Opció B — Editar directament els fitxers YAML a GitHub

També pots editar els fitxers `.yaml` dins la carpeta `data/` directament des de **GitHub** (fent clic al fitxer → icona del llapis **Edit** → **Commit changes**).

### 1. Afegir o editar una notícia (`data/noticies.yaml`)

Copia aquesta plantilla i enganxa-la a dalt de tot de `data/noticies.yaml` perquè surti la primera:

```yaml
- id: nova-noticia-2027
  titol: "Títol de la notícia"
  categoria: "Cròniques"
  data: "26 de març de 2027"
  lectura: "3 min"
  destacada: false
  imatge: "img/hero/hero1.jpg"
  resum: "Resum breu que apareix a la targeta."
  etiquetes: ["Felanitx", "Davallament"]
  cos:
    - "Primer paràgraf complet de la notícia."
    - "Segon paràgraf complet de la notícia."
```

- **Categories suggerides:** `Cròniques`, `50è Aniversari`, `Convocatòries`, `Patrimoni i Cultura` (en pots crear de noves i apareixeran automàticament com a botó de filtre).
- **Ordenació i notícia destacada automàtica:** les notícies s'ordenen automàticament per data (de més recent a més antiga) i la darrera publicada apareix sempre en gran a la capçalera de `noticies.html`.

### 2. Editar la Junta Directiva (`data/junta.yaml`)

```yaml
- id: presidencia
  carrec: "Presidència"
  nom: "Nom i llinatges"
  area: "Representació institucional i coordinació general."
```

### 3. Afegir una convocatòria de reunió o assemblea (`data/convocatories.yaml`)

```yaml
- id: assemblea-2027
  titol: "Assemblea General Ordinària"
  estat: "proxima"
  data: "15 de gener de 2027"
  dataIso: "2027-01-15"
  hora: "20:00 h"
  lloc: "Centre Cultural de Felanitx"
  adrecatA: "Socis, sòcies i col·laboradors"
  resum: "Resum breu de la convocatòria."
  ordreDelDia:
    - "Primer punt de l'ordre del dia."
    - "Segon punt de l'ordre del dia."
```

- **`estat`:** `proxima` (apareix destacada en verd a dalt de tot) o `realitzada`.

### 4. Afegir una fotografia nova (`data/galeria.yaml`)

1. Puja la imatge a la carpeta `img/` (per exemple `img/galeria/foto-nova.jpg`).
2. Afegeix la fitxa a `data/galeria.yaml`:

```yaml
- id: foto-nova-2027
  titol: "Títol de la fotografia"
  album: "El Davallament"
  any: "2027"
  lloc: "Escalinata de Sant Miquel"
  credit: "Associació El Davallament de Felanitx"
  imatge: "img/galeria/foto-nova.jpg"
  descripcio: "Peu de foto descriptiu que apareix a la targeta i al visor a pantalla completa."
```

### 5. Canviar o afegir un vídeo de YouTube (`data/multimedia.yaml`)

Edita `data/multimedia.yaml` i enganxa qualsevol enllaç de YouTube a `youtubeUrl`:

```yaml
- id: davallament-2025-ib3
  titol: "El Davallament de Felanitx 2025 — 50è Aniversari"
  any: "2025"
  font: "IB3 Televisió"
  youtubeUrl: "https://www.youtube.com/watch?v=paEAKhoOjV4"
  descripcio: "Descripció breu que apareix davall el reproductor."
```

---

## Identitat visual i funcionalitats

- **Paleta oficial (`css/style.css`):**
  - Marró fusta (primari): `#6F4024`
  - Arena / llençol (secundari): `#D9C099`
  - Crema suau (fons alternats): `#EDE2C9` / `#F8F5EF`
  - Capçalera blanca neta amb el logotip oficial (`img/logo/logo.png`).
- **Tipografies:** *Cormorant Garamond* (títols) i *Source Sans 3* (text).
- **Navegació:** capçalera fixa (*sticky*) que redueix suaument la mida en fer *scroll*, menú hamburguesa en mòbil i selector d'idioma de la interfície (`CA / ES / EN`).
- **Components interactius:** carrusel de fotos reals a l'inici, explorador de les 8 escenes a `representacio.html`, lector modal de notícies amb botó per copiar enllaç directe (`noticies.html?id=...`), visor de retalls d'hemeroteca i visor *lightbox* amb navegació per teclat (`←`, `→`, `Esc`).

---

## Com provar la web en local

Perquè el navegador pugui llegir els fitxers `.yaml` mitjançant `fetch`, cal obrir la web des d'un servidor local (si obres `index.html` directament amb doble clic `file://`, el navegador bloqueja `fetch` per seguretat i la web mostra les dades de reserva de `js/data.js`).

Amb **Python** instal·lat, executa des de la carpeta del projecte:

```bash
python -m http.server 8096 --bind 127.0.0.1
```

Després obre al navegador: **http://127.0.0.1:8096/index.html**

---

## Publicació a GitHub Pages i visibilitat a Google

### Configuració actual (fase de proves)
- Publicada a través de **GitHub Pages** des de la branca **`develop`** (carpeta `/ (root)`).
- Totes les pàgines HTML inclouen l'etiqueta:
  ```html
  <meta name="robots" content="noindex, nofollow">
  ```
  Això permet compartir l'enllaç directe amb col·laboradors i membres de l'Associació **sense que Google indexi el web** mentre estigui en fase de proves.
- Si algun cop un `git push` no dispara el desplegament automàtic de GitHub Pages, ves a **Settings → Pages**, selecciona temporalment `None` → *Save* i torna a seleccionar `develop` (`/ (root)`) → *Save*.

### Quan la web estigui llesta per sortir a Google (producció)
1. Elimina la línia `<meta name="robots" content="noindex, nofollow">` de les 7 pàgines HTML (`index.html`, `historia.html`, `representacio.html`, `noticies.html`, `arxiu.html`, `galeria.html` i `contacte.html`).
2. Fusiona la branca `develop` dins `main` i configura **Settings → Pages** per publicar des de **`main`**.

---

© Associació El Davallament de Felanitx
