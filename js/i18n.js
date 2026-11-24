/* ==========================================================================
   ASSOCIACIÓ EL DAVALLAMENT DE FELANITX — Traduccions completes (CA/ES/EN/DE)
   ========================================================================== */

window.I18N = {
  ca: {
    langName: "Català",
    toastLang: "Idioma canviat a Català",
    skipLink: "Anar al contingut principal",
    nav: {
      inici: "Inici",
      historia: "Història",
      representacio: "Representació",
      noticies: "Notícies",
      entitat: "L'entitat",
      galeria: "Galeria",
      contacte: "Contacte"
    },
    footer: {
      title: "Associació El Davallament de Felanitx",
      copy: "© Associació El Davallament de Felanitx 2026"
    },
    pageTitles: {
      inici: "El Davallament de Felanitx — Associació El Davallament",
      historia: "Història | El Davallament de Felanitx",
      representacio: "La Representació | El Davallament de Felanitx",
      noticies: "Notícies | El Davallament de Felanitx",
      entitat: "L'entitat | El Davallament de Felanitx",
      galeria: "Galeria d'Imatges | El Davallament de Felanitx",
      contacte: "Contacte | El Davallament de Felanitx"
    },
    ui: {
      breadcrumbHome: "Inici",
      readMore: "Llegir més →",
      discoverScenes: "Descobrir les escenes →",
      viewGallery: "Veure galeria →",
      allNews: "Totes les notícies →",
      consultEntity: "Coneix l'entitat i la junta →",
      meetingUpcoming: "Pròxima convocatòria",
      meetingPast: "Realitzada",
      meetingDateLabel: "Data i hora",
      meetingPlaceLabel: "Lloc",
      meetingAudienceLabel: "Adreçat a",
      meetingAgendaLabel: "Ordre del dia",
      viewAgenda: "Veure l'ordre del dia complet →",
      noMeetings: "Actualment no hi ha convocatòries publicades.",
      readArticle: "Llegir notícia →",
      readShort: "Llegir →",
      readFullArticle: "Llegir l'article complet →",
      featuredPrefix: "Destacat · ",
      latestBadge: "Notícia destacada",
      allYears: "Tots els anys",
      readTimeSuffix: " de lectura",
      copyLink: "Copiar enllaç",
      linkCopied: "Enllaç copiat al porta-retalls",
      closeReading: "Tancar lectura",
      sourceLabel: "Font:",
      viewClipping: "Veure retall",
      readClipping: "Llegir retall →",
      openClipping: "Obrir retall →",
      backToArchive: "Tornar a l'arxiu",
      archiveNoteLabel: "Nota d'arxiu:",
      archiveNoteDefault: "Catalogat a l'hemeroteca digital de l'Associació El Davallament de Felanitx.",
      closeLightbox: "Tancar ✕",
      zoomPill: "Ampliar ↗",
      allCategory: "Totes",
      allOutlets: "Tots els mitjans",
      noNewsFound: "No s'han trobat notícies amb els filtres actuals.",
      showAll: "Mostrar totes",
      noPressFound: "Cap retall coincideix amb aquesta cerca.",
      showAllArchive: "Mostrar tota l'hemeroteca",
      newsCount: (shown, total) => `Mostrant ${shown} de ${total} notícies`,
      pressCount: (shown, total) => `${shown} retalls catalogats (${total} en total a l'hemeroteca)`,
      galleryCount: (n) => `${n} fotografies originals del Davallament · Fes clic per ampliar`,
      sceneEyebrow: (num, loc) => `Escena ${num} · ${loc}`,
      atmosphereLabel: "Atmosfera:",
      listView: "Llista",
      gridView: "Fitxes",
      contactSending: "Enviant missatge...",
      contactToast: (name) => `Gràcies, ${name || "amic/amiga"}! Hem enviat el teu missatge a davallamentfelanitx@gmail.com.`,
      contactFallback: "S'ha obert el teu client de correu per enviar el missatge directament a"
    },
    home: {
      welcomeEyebrow: "Associació El Davallament de Felanitx",
      welcomeTitle: "Benvinguts",
      welcomeText: "Espai dedicat a la preservació i difusió del patrimoni cultural associat al Davallament de Felanitx que es representa cada Divendres Sant des de 1975.",
      m1Val: "Des de 1975",
      m1Lbl: "Primera edició a l'escalinata de Sant Miquel",
      m2Val: "Més de 50 anys",
      m2Lbl: "D'història i patrimoni immaterial viu",
      m3Val: "Més de 160",
      m3Lbl: "Actors i actrius de totes les edats",
      f1Eyebrow: "Des de 1975",
      f1Title: "Història",
      f1Text: "Descobriu l'origen i l'evolució del Davallament de Felanitx al llarg del temps: des de les arrels medievals dins el temple i el salt a l'escalinata el 28 de març de 1975 fins a l'històric 50è aniversari.",
      f2Eyebrow: "Vuit escenes · Divendres Sant",
      f2Title: "La representació",
      f2Text: "Coneix els personatges, els textos tradicionals de la representació, la música de Joan Martorell i els elements escènics que transformen la pedra de marès en un teatre a cel obert.",
      f3Eyebrow: "Fotografies Originals",
      f3Title: "Galeria d'imatges",
      f3Text: "Un recorregut visual per les escenes més emotives de la representació: el judici de Pilat, els armats, la Verònica i el silenci colpidor del descendiment davant la portalada de Sant Miquel.",
      newsEyebrow: "Actualitat",
      newsTitle: "Darreres notícies",
      entitatEyebrow: "L'entitat",
      entitatTitle: "Convocatòries i vida associativa",
      guideEyebrow: "Guia per al Visitant",
      guideTitle: "Com viure el Davallament",
      g1Title: "Ubicació",
      g1Html: "<strong>Escalinata de la Parròquia de Sant Miquel</strong> i <strong>Plaça de sa Font de Santa Margalida</strong>, Felanitx (Mallorca).",
      g2Title: "Horari i accés",
      g2Html: "Cada <strong>Divendres Sant a les 21:00 h</strong>. Accés lliure i gratuït. Es recomana arribar 30–40 minuts abans.",
      g3Title: "Participa-hi",
      g3Html: "Vols formar part del grup d'actors, figurants, vestuari o voluntariat? <a href=\"contacte.html\" style=\"color:var(--primary);font-weight:600;text-decoration:underline\">Contacta amb l'Associació</a>."
    },
    historia: {
      bannerTitle: "Història del Davallament",
      bannerSub: "Més de mig segle de teatre sacre a l'escalinata de Sant Miquel i segles de tradició viva al cor de Felanitx.",
      memEyebrow: "Memòria Col·lectiva",
      memTitle: "De l'interior del temple a la monumental escalinata",
      memP1Html: "Les representacions dels davallaments formen part de la tradició medieval mallorquina de Setmana Santa. A Felanitx, durant generacions la cerimònia va tenir lloc dins la <strong>Parròquia de Sant Miquel</strong>, fins que el <strong>28 de març de 1975</strong> la Creuada de l'Amor Diví i diversos veïns del municipi impulsaren el trasllat definitiu a l'aire lliure.",
      memP2: "A partir dels textos tradicionals escrits expressament per a l'ocasió, la representació es va convertir en una cita ineludible del calendari cultural i devocional de Mallorca, capaç de mobilitzar generacions senceres de felanitxers de manera totalment altruista.",
      quoteText: "«Allò que va néixer el 1975 amb il·lusió i esforç veïnal s'ha convertit en una senya d'identitat que uneix tot el poble de Felanitx.»",
      quoteCite: "— Associació El Davallament de Felanitx",
      tlEyebrow: "Línia Temporal",
      tlTitle: "Fites principals (1975–2026)",
      prEyebrow: "Persones i Col·lectius",
      prTitle: "Protagonistes d'aquesta història"
    },
    representacio: {
      bannerTitle: "La representació",
      bannerSub: "Recorregut pels vuit quadres dramàtics, els personatges, l'escenografia de pedra de marès i el silenci de la nit de Divendres Sant.",
      expEyebrow: "Dramatúrgia de Divendres Sant",
      expTitle: "Explorador escena per escena",
      expLead: "Clica cada quadre dramàtic per conèixer-ne el desenvolupament, la ubicació exacta dins l'escalinata de Sant Miquel i els personatges participants.",
      elEyebrow: "Elements Clau",
      elTitle: "Llenguatge escènic i recomanacions",
      e1Title: "L'Escalinata de Sant Miquel",
      e1Text: "Els esglaons de pedra de marès, la balconada lateral, el rosetó i la portalada barroca formen un retaule arquitectònic natural que permet seguir l'acció en diversos nivells.",
      e2Title: "Música i Paraula",
      e2Text: "Els textos dramàtics de la representació s'entrellacen amb la banda sonora simfònica de Joan Martorell i la participació de la Banda de Música de Felanitx a la processó posterior.",
      e3Title: "Silenci i Respecte",
      e3Text: "El silenci sepulcral del públic és part essencial de l'obra. Recomanam arribar abans de les 20:30 h, dur roba d'abric i silenciar els telèfons mòbils."
    },
    noticies: {
      bannerTitle: "Notícies i actualitat",
      bannerSub: "Cròniques de les darreres edicions, convocatòries de participació, projectes culturals i novetats de l'Associació.",
      searchPh: "Cercar notícia, tema o any...",
      meetingsHint: "Cerques reunions o assemblees? Ves a L'entitat →"
    },
    entitat: {
      bannerTitle: "L'entitat",
      bannerSub: "Coneix l'Associació El Davallament de Felanitx, la junta directiva que coordina la representació i les convocatòries a reunions i assemblees.",
      aboutEyebrow: "Qui som",
      aboutTitle: "Associació El Davallament de Felanitx",
      aboutP1: "L'Associació El Davallament de Felanitx és una entitat cultural sense ànim de lucre constituïda per preservar, organitzar i difondre la representació de la Passió i el Davallament que el poble de Felanitx duu a terme cada Divendres Sant a l'escalinata de Sant Miquel.",
      aboutP2: "La seva tasca es basa en la participació oberta i altruista de més de 160 actors i actrius de totes les edats, equips de vestuari, escenografia, llum i so, en col·laboració estreta amb l'Ajuntament de Felanitx, el Centre Cultural, la Fundació Barceló i la Parròquia de Sant Miquel.",
      joinBtn: "Contactar o fer-se voluntari →",
      boardEyebrow: "Òrgan de govern",
      boardTitle: "Junta Directiva",
      boardLead: "L'equip encarregat de la gestió, coordinació i continuïtat de l'Associació El Davallament de Felanitx.",
      meetingsEyebrow: "Vida associativa",
      meetingsTitle: "Convocatòries a reunions i assemblees",
      meetingsLead: "Consulta les pròximes cites, assemblees generals i reunions organitzatives de l'Associació, així com el seu ordre del dia."
    },
    galeria: {
      bannerTitle: "Galeria d'imatges",
      bannerSub: "Fotografies reals de la representació del Davallament a l'escalinata i la portalada de la Parròquia de Sant Miquel de Felanitx.",
      kbdHint: "Al visor pots navegar amb les fletxes ← →"
    },
    contacte: {
      bannerTitle: "Contacte i participació",
      bannerSub: "Escriu a l'Associació El Davallament de Felanitx si vols participar en la representació, col·laborar-hi o compartir fotografies i documents antics.",
      leftEyebrow: "Associació El Davallament",
      leftTitle: "Fes poble amb nosaltres",
      leftText: "El Davallament és possible gràcies a l'esforç altruista de més de 160 veïns i veïnes. Sempre hi ha lloc per a noves incorporacions, tant a l'escenari com en vestuari, muntatge, il·luminació o arxiu documental.",
      emailTitle: "Correu electrònic",
      locTitle: "Indret de la representació",
      locHtml: "Parròquia de Sant Miquel · Plaça de sa Font de Santa Margalida<br>07200 Felanitx, Mallorca (Illes Balears)",
      whenTitle: "Quan ens pots trobar?",
      whenHtml: "Durant la Quaresma els assajos es realitzen a l'entorn de la Parròquia de Sant Miquel. La representació té lloc cada <strong>Divendres Sant a les 21:00 h</strong>.",
      formTitle: "Envia'ns un missatge",
      formSub: "Omple el formulari i ens posarem en contacte amb tu al més aviat possible.",
      lblName: "Nom i llinatges *",
      phName: "El teu nom",
      lblEmail: "Correu electrònic *",
      phEmail: "nom@exemple.cat",
      lblTopic: "Motiu del missatge *",
      optVol: "Vull participar com a actor / figurant / voluntari",
      optArch: "Vull cedir fotografies o retalls de premsa antics",
      optPress: "Premsa i mitjans de comunicació",
      optGen: "Consulta general / Informació per a visitants",
      lblMsg: "Missatge *",
      phMsg: "Explica'ns en què et podem ajudar o com t'agradaria participar-hi...",
      btnSend: "Enviar missatge →"
    }
  },

  /* ========================================================================
     ESPAÑOL (ES)
     ======================================================================== */
  es: {
    langName: "Castellano",
    toastLang: "Idioma cambiado a Castellano",
    skipLink: "Ir al contenido principal",
    nav: {
      inici: "Inicio",
      historia: "Historia",
      representacio: "Representación",
      noticies: "Noticias",
      entitat: "La entidad",
      galeria: "Galería",
      contacte: "Contacto"
    },
    footer: {
      title: "Associació El Davallament de Felanitx",
      copy: "© Associació El Davallament de Felanitx 2026"
    },
    pageTitles: {
      inici: "El Davallament de Felanitx — Associació El Davallament",
      historia: "Historia | El Davallament de Felanitx",
      representacio: "La Representación | El Davallament de Felanitx",
      noticies: "Noticias | El Davallament de Felanitx",
      entitat: "La entidad | El Davallament de Felanitx",
      galeria: "Galería de Imágenes | El Davallament de Felanitx",
      contacte: "Contacto | El Davallament de Felanitx"
    },
    ui: {
      breadcrumbHome: "Inicio",
      readMore: "Leer más →",
      discoverScenes: "Descubrir las escenas →",
      viewGallery: "Ver galería →",
      allNews: "Todas las noticias →",
      consultEntity: "Conoce la entidad y la junta →",
      meetingUpcoming: "Próxima convocatoria",
      meetingPast: "Realizada",
      meetingDateLabel: "Fecha y hora",
      meetingPlaceLabel: "Lugar",
      meetingAudienceLabel: "Dirigido a",
      meetingAgendaLabel: "Orden del día",
      viewAgenda: "Ver el orden del día completo →",
      noMeetings: "Actualmente no hay convocatorias publicadas.",
      readArticle: "Leer noticia →",
      readShort: "Leer →",
      readFullArticle: "Leer el artículo completo →",
      featuredPrefix: "Destacado · ",
      latestBadge: "Noticia destacada",
      allYears: "Todos los años",
      readTimeSuffix: " de lectura",
      copyLink: "Copiar enlace",
      linkCopied: "Enlace copiado al portapapeles",
      closeReading: "Cerrar lectura",
      sourceLabel: "Fuente:",
      viewClipping: "Ver recorte",
      readClipping: "Leer recorte →",
      openClipping: "Abrir recorte →",
      backToArchive: "Volver al archivo",
      archiveNoteLabel: "Nota de archivo:",
      archiveNoteDefault: "Catalogado en la hemeroteca digital de la Associació El Davallament de Felanitx.",
      closeLightbox: "Cerrar ✕",
      zoomPill: "Ampliar ↗",
      allCategory: "Todas",
      allOutlets: "Todos los medios",
      noNewsFound: "No se han encontrado noticias con los filtros actuales.",
      showAll: "Mostrar todas",
      noPressFound: "Ningún recorte coincide con esta búsqueda.",
      showAllArchive: "Mostrar toda la hemeroteca",
      newsCount: (shown, total) => `Mostrando ${shown} de ${total} noticias`,
      pressCount: (shown, total) => `${shown} recortes catalogados (${total} en total en la hemeroteca)`,
      galleryCount: (n) => `${n} fotografías originales del Davallament · Haz clic para ampliar`,
      sceneEyebrow: (num, loc) => `Escena ${num} · ${loc}`,
      atmosphereLabel: "Atmósfera:",
      listView: "Lista",
      gridView: "Fichas",
      contactSending: "Enviando mensaje...",
      contactToast: (name) => `¡Gracias, ${name || "amigo/a"}! Hemos enviado tu mensaje a davallamentfelanitx@gmail.com.`,
      contactFallback: "Se ha abierto tu correo para enviar el mensaje directamente a"
    },
    home: {
      welcomeEyebrow: "Associació El Davallament de Felanitx",
      welcomeTitle: "Bienvenidos",
      welcomeText: "Espacio dedicado a la preservación y difusión del patrimonio cultural asociado al Davallament de Felanitx que se representa cada Viernes Santo desde 1975.",
      m1Val: "Desde 1975",
      m1Lbl: "Primera edición en la escalinata de Sant Miquel",
      m2Val: "Más de 50 años",
      m2Lbl: "De historia y patrimonio inmaterial vivo",
      m3Val: "Más de 160",
      m3Lbl: "Actores y actrices de todas las edades",
      f1Eyebrow: "Desde 1975",
      f1Title: "Historia",
      f1Text: "Descubrid el origen y la evolución del Davallament de Felanitx a lo largo del tiempo: desde las raíces medievales dentro del templo y el salto a la escalinata el 28 de marzo de 1975 hasta el histórico 50.º aniversario.",
      f2Eyebrow: "Ocho escenas · Viernes Santo",
      f2Title: "La representación",
      f2Text: "Conoce a los personajes, los textos tradicionales de la representación, la música de Joan Martorell y los elementos escénicos que transforman la piedra de marés en un teatro al aire libre.",
      f3Eyebrow: "Fotografías Originales",
      f3Title: "Galería de imágenes",
      f3Text: "Un recorrido visual por las escenas más emotivas de la representación: el juicio de Pilato, los armats, la Verónica y el silencio sobrecogedor del descendimiento ante la portada de Sant Miquel.",
      newsEyebrow: "Actualidad",
      newsTitle: "Últimas noticias",
      entitatEyebrow: "La entidad",
      entitatTitle: "Convocatorias y vida asociativa",
      guideEyebrow: "Guía para el Visitante",
      guideTitle: "Cómo vivir el Davallament",
      g1Title: "Ubicación",
      g1Html: "<strong>Escalinata de la Parroquia de Sant Miquel</strong> y <strong>Plaça de sa Font de Santa Margalida</strong>, Felanitx (Mallorca).",
      g2Title: "Horario y acceso",
      g2Html: "Cada <strong>Viernes Santo a las 21:00 h</strong>. Acceso libre y gratuito. Se recomienda llegar 30–40 minutos antes.",
      g3Title: "Participa",
      g3Html: "¿Quieres formar parte del grupo de actores, figurantes, vestuario o voluntariado? <a href=\"contacte.html\" style=\"color:var(--primary);font-weight:600;text-decoration:underline\">Contacta con la Asociación</a>."
    },
    historia: {
      bannerTitle: "Historia del Davallament",
      bannerSub: "Más de medio siglo de teatro sacro en la escalinata de Sant Miquel y siglos de tradición viva en el corazón de Felanitx.",
      memEyebrow: "Memoria Colectiva",
      memTitle: "Del interior del templo a la monumental escalinata",
      memP1Html: "Las representaciones de los descendimientos forman parte de la tradición medieval mallorquina de Semana Santa. En Felanitx, durante generaciones la ceremonia tuvo lugar dentro de la <strong>Parroquia de Sant Miquel</strong>, hasta que el <strong>28 de marzo de 1975</strong> la Creuada de l'Amor Diví y diversos vecinos del municipio impulsaron el traslado definitivo al aire libre.",
      memP2: "A partir de los textos tradicionales escritos expresamente para la ocasión, la representación se convirtió en una cita ineludible del calendario cultural y devocional de Mallorca, capaz de movilizar a generaciones enteras de felanitxers de manera totalmente altruista.",
      quoteText: "«Aquello que nació en 1975 con ilusión y esfuerzo vecinal se ha convertido en una seña de identidad que une a todo el pueblo de Felanitx.»",
      quoteCite: "— Associació El Davallament de Felanitx",
      tlEyebrow: "Línea Temporal",
      tlTitle: "Hitos principales (1975–2026)",
      prEyebrow: "Personas y Colectivos",
      prTitle: "Protagonistas de esta historia"
    },
    representacio: {
      bannerTitle: "La representación",
      bannerSub: "Recorrido por los ocho cuadros dramáticos, los personajes, la escenografía de piedra de marés y el silencio de la noche de Viernes Santo.",
      expEyebrow: "Dramaturgia de Viernes Santo",
      expTitle: "Explorador escena por escena",
      expLead: "Haz clic en cada cuadro dramático para conocer su desarrollo, la ubicación exacta en la escalinata de Sant Miquel y los personajes participantes.",
      elEyebrow: "Elementos Clave",
      elTitle: "Lenguaje escénico y recomendaciones",
      e1Title: "La Escalinata de Sant Miquel",
      e1Text: "Los peldaños de piedra de marés, el balcón lateral, el rosetón y la portada barroca forman un retablo arquitectónico natural que permite seguir la acción en varios niveles.",
      e2Title: "Música y Palabra",
      e2Text: "Los textos dramáticos de la representación se entrelazan con la banda sonora sinfónica de Joan Martorell y la participación de la Banda de Música de Felanitx en la procesión posterior.",
      e3Title: "Silencio y Respeto",
      e3Text: "El silencio sepulcral del público es parte esencial de la obra. Recomendamos llegar antes de las 20:30 h, llevar ropa de abrigo y silenciar los teléfonos móviles."
    },
    noticies: {
      bannerTitle: "Noticias y actualidad",
      bannerSub: "Crónicas de las últimas ediciones, convocatorias de participación, proyectos culturales y novedades de la Asociación.",
      searchPh: "Buscar noticia, tema o año...",
      meetingsHint: "¿Buscas reuniones o asambleas? Ve a La entidad →"
    },
    entitat: {
      bannerTitle: "La entidad",
      bannerSub: "Conoce la Associació El Davallament de Felanitx, la junta directiva que coordina la representación y las convocatorias a reuniones y asambleas.",
      aboutEyebrow: "Quiénes somos",
      aboutTitle: "Associació El Davallament de Felanitx",
      aboutP1: "La Associació El Davallament de Felanitx es una entidad cultural sin ánimo de lucro constituida para preservar, organizar y difundir la representación de la Pasión y el Descendimiento que el pueblo de Felanitx lleva a cabo cada Viernes Santo en la escalinata de Sant Miquel.",
      aboutP2: "Su labor se basa en la participación abierta y altruista de más de 160 actores y actrices de todas las edades, equipos de vestuario, escenografía, luz y sonido, en estrecha colaboración con el Ayuntamiento de Felanitx, el Centre Cultural, la Fundació Barceló y la Parroquia de Sant Miquel.",
      joinBtn: "Contactar o hacerse voluntario →",
      boardEyebrow: "Órgano de gobierno",
      boardTitle: "Junta Directiva",
      boardLead: "El equipo encargado de la gestión, coordinación y continuidad de la Associació El Davallament de Felanitx.",
      meetingsEyebrow: "Vida asociativa",
      meetingsTitle: "Convocatorias a reuniones y asambleas",
      meetingsLead: "Consulta las próximas citas, asambleas generales y reuniones organizativas de la Asociación, así como su orden del día."
    },
    galeria: {
      bannerTitle: "Galería de imágenes",
      bannerSub: "Fotografías reales de la representación del Davallament en la escalinata y la portada de la Parroquia de Sant Miquel de Felanitx.",
      kbdHint: "En el visor puedes navegar con las flechas ← →"
    },
    contacte: {
      bannerTitle: "Contacto y participación",
      bannerSub: "Escribe a la Associació El Davallament de Felanitx si deseas participar en la representación, colaborar o compartir fotografías y documentos antiguos.",
      leftEyebrow: "Associació El Davallament",
      leftTitle: "Haz pueblo con nosotros",
      leftText: "El Davallament es posible gracias al esfuerzo altruista de más de 160 vecinos y vecinas. Siempre hay sitio para nuevas incorporaciones, tanto en escena como en vestuario, montaje, iluminación o archivo documental.",
      emailTitle: "Correo electrónico",
      locTitle: "Lugar de la representación",
      locHtml: "Parroquia de Sant Miquel · Plaça de sa Font de Santa Margalida<br>07200 Felanitx, Mallorca (Islas Baleares)",
      whenTitle: "¿Cuándo puedes encontrarnos?",
      whenHtml: "Durante la Cuaresma los ensayos se realizan en el entorno de la Parroquia de Sant Miquel. La representación tiene lugar cada <strong>Viernes Santo a las 21:00 h</strong>.",
      formTitle: "Envíanos un mensaje",
      formSub: "Rellena el formulario y nos pondremos en contacto contigo lo antes posible.",
      lblName: "Nombre y apellidos *",
      phName: "Tu nombre",
      lblEmail: "Correo electrónico *",
      phEmail: "nombre@ejemplo.es",
      lblTopic: "Motivo del mensaje *",
      optVol: "Quiero participar como actor / figurante / voluntario",
      optArch: "Quiero ceder fotografías o recortes de prensa antiguos",
      optPress: "Prensa y medios de comunicación",
      optGen: "Consulta general / Información para visitantes",
      lblMsg: "Mensaje *",
      phMsg: "Cuéntanos en qué podemos ayudarte o cómo te gustaría participar...",
      btnSend: "Enviar mensaje →"
    },
    data: {
      heroSlides: [
        { kicker: "Viernes Santo · Escalinata de Sant Miquel", title: "El Davallament de Felanitx", subtitle: "El momento culminante del descendimiento de la cruz ante la portada barroca de la Parroquia de Sant Miquel." },
        { kicker: "Patrimonio Vivo desde 1975", title: "El Camino del Calvario", subtitle: "Cerca de doscientos vecinos transforman cada año la escalinata de piedra de marés en un teatro sacro al aire libre." },
        { kicker: "Escenografía y Luz", title: "Ante los Armats y el Pueblo", subtitle: "Teatro popular, iluminación dramática y una puesta en escena llena de solemnidad." },
        { kicker: "Tradición y Emoción", title: "El Juicio de Poncio Pilato", subtitle: "La arquitectura histórica de la plaza y la fachada parroquial se convierten en el escenario natural de la Pasión." }
      ],
      scenes: {
        "entrada-jerusalem": { title: "Entrada en Jerusalén", location: "Pie de la escalinata de Sant Miquel", characters: ["Jesús", "Apóstoles", "Pueblo de Jerusalén", "Niños con palmas"], atmosphere: "Clima coral que abre el relato evangélico entre los peldaños de marés", fullDesc: "La representación arranca con la participación coral de familias y niños del pueblo que dan vida a Jerusalén con ramas de olivo y palmas, estableciendo desde el primer instante el carácter comunitario del Davallament." },
        "sant-sopar": { title: "La Última Cena y Getsemaní", location: "Rellano intermedio y espacio escénico del olivar", characters: ["Jesús", "Los doce Apóstoles", "Judas Iscariote"], atmosphere: "Luz íntima, recogimiento e intensidad musical", fullDesc: "Bajo una iluminación contenida y solemne, la Última Cena da paso a la noche de Getsemaní. La banda sonora original de Joan Martorell acompaña el silencio sobrecogedor de la plaza antes de la llegada de los soldados." },
        "caifas-pilat": { title: "Ante Caifás y Poncio Pilato", location: "Balcón lateral y escalinata superior", characters: ["Jesús", "Caifás", "Poncio Pilato", "Sacerdotes", "Armats"], atmosphere: "Tensión dramática, luz carmesí y arquitecturas de piedra", fullDesc: "Aprovechando el arco apuntado y el balcón lateral de la parroquia, la escena ante Poncio Pilato combina la fuerza de los textos dramáticos con la presencia imponente de los armats romanos y la multitud." },
        "ecce-homo": { title: "Flagelación y Ecce Homo", location: "Escalinata central", characters: ["Jesús", "Soldados romanos", "Poncio Pilato", "Multitud"], atmosphere: "Contrastes cromáticos intensos y silencio sepulcral", fullDesc: "Una secuencia de gran potencia visual donde los peldaños iluminados en rojo enmarcan el sufrimiento de Jesús mientras cientos de espectadores mantienen un respeto absoluto desde la Plaça de sa Font de Santa Margalida." },
        "via-crucis": { title: "El Camino del Calvario y la Verónica", location: "Ascenso por la escalinata de Sant Miquel", characters: ["Jesús", "La Virgen María", "La Verónica", "Simón de Cirene", "Armats"], atmosphere: "Ritmo procesional pausado y emoción contenida", fullDesc: "Toda la escalinata se convierte en la Vía Dolorosa. El encuentro con María y el gesto de la Verónica desplegando el lienzo blanco bajo el rosetón de Sant Miquel configuran algunas de las estampas más icónicas de la noche." },
        "crucifixio": { title: "La Crucifixión", location: "Parte alta del rellano parroquial", characters: ["Jesús", "La Virgen María", "San Juan", "María Magdalena", "Centurión"], atmosphere: "Luces cenitales y oscuridad absoluta en la plaza", fullDesc: "En el punto más alto del rellano se alza la cruz. Con las farolas públicas del casco antiguo apagadas, toda la atención de la plaza converge en las últimas palabras y la muerte de Jesús." },
        "el-davallament": { title: "El Descendimiento de la Cruz", location: "Portada principal de Sant Miquel", characters: ["José de Arimatea", "Nicodemo", "La Virgen María", "San Juan", "Santas Mujeres"], atmosphere: "Luz azulada, neblina suave, escaleras y lienzo blanco", fullDesc: "Es el instante central que inspira nuestro logotipo. Con dos escaleras apoyadas en la cruz y un largo lienzo blanco, los santos varones descienden el cuerpo sin vida de Jesús para depositarlo en el regazo de su Madre en una Piedad viviente." },
        "processo-enterrament": { title: "Procesión del Entierro", location: "Calles del casco antiguo de Felanitx", characters: ["Cofradías locales", "Banda de Música de Felanitx", "Fieles"], atmosphere: "Cirios, faroles y marchas fúnebres", fullDesc: "Cuando la ovación colectiva rompe finalmente el silencio de la plaza, las cofradías y la Banda de Música de Felanitx inician la Procesión del Entierro por las calles oscuras de la villa." }
      },
      timeline: [
        { year: "Siglos XV–XIX", title: "Raíces medievales y representaciones en el templo", text: "Los descendimientos hunden sus raíces en el teatro litúrgico medieval mallorquín. Durante siglos, la ceremonia del desclavamiento se vivió en el interior de la Parroquia de Sant Miquel como una de las expresiones más sentidas de la Semana Santa felanitxera." },
        { year: "28 de marzo de 1975", title: "El primer Davallament en la escalinata de Sant Miquel", text: "Impulsado por la Creuada de l'Amor Diví y el entusiasmo de los vecinos del pueblo, el Davallament sale por primera vez al aire libre en el rellano y la escalinata de Sant Miquel." },
        { year: "Años 1980–1990", title: "Arraigo popular y «hacer pueblo»", text: "La cita de Viernes Santo crece rápidamente en implicación ciudadana y afluencia de público. Familias enteras de Felanitx participan en vestuario, escenografía e interpretación, consolidando el acto como referente del Migjorn y de toda Mallorca." },
        { year: "Años 2000–2024", title: "Evolución escénica y patrimonio compartido", text: "Se incorporan mejoras progresivas de iluminación teatral, sonorización y dirección escénica, preservando la sobriedad tradicional. Tras el parón de la pandemia, el regreso de 2022 refuerza aún más la implicación de jóvenes y veteranos." },
        { year: "Abril de 2025", title: "50.º Aniversario: un hito histórico", text: "Felanitx celebra medio siglo del Davallament al aire libre con un cartel conmemorativo creado por el artista felanitxer Miquel Barceló. Bajo la dirección de Joan Toni Sunyer y Marta Obrador, el espectáculo se expande por seis escenarios en la Plaça de sa Font de Santa Margalida, estrena banda sonora original de Joan Martorell y se retransmite por primera vez en directo en IB3 Televisió." },
        { year: "3 de abril de 2026", title: "Consolidación del legado en la escalinata tradicional", text: "La edición de 2026 devuelve todo el protagonismo a la fachada y la escalinata de Sant Miquel manteniendo la fuerza musical de la banda sonora de Joan Martorell y la participación de cerca de 180 vecinos, seguida de la Procesión del Entierro con la Banda de Música de Felanitx." }
      ],
      protagonists: [
        { role: "Impulsores de 1975", name: "Creuada de l'Amor Diví y pioneros de 1975", desc: "Pioneros que hicieron posible el paso histórico del interior del templo a la escalinata monumental de Sant Miquel el 28 de marzo de 1975." },
        { role: "Dirección del 50.º Aniversario", name: "Joan Toni Sunyer y Marta Obrador", desc: "Responsables de la renovación dramatúrgica y visual del cincuentenario, combinando respeto por la tradición y lenguaje escénico contemporáneo." },
        { role: "Cartel del 50.º Aniversario", name: "Miquel Barceló", desc: "El artista internacional felanitxer firmó la imagen conmemorativa de los 50 años (2025), proyectando la tradición más allá de la isla." },
        { role: "Banda sonora original", name: "Joan Martorell", desc: "Compositor de la partitura sinfónica creada expresamente para Felanitx, consolidada como patrimonio sonoro del Davallament." },
        { role: "El corazón de la asociación", name: "Más de 160 vecinos, cofradías y Banda de Música", desc: "Actores aficionados de todas las edades, vestuario, técnicos, cofradías y músicos que año tras año hacen posible una celebración 100 % altruista." }
      ],
      news: {
        "presentacio-cartell-2026": {
          category: "Edición 2026", date: "19 de febrero de 2026", readTime: "3 min",
          title: "Presentación del cartel oficial del Davallament de Felanitx 2026",
          excerpt: "Se presenta el cartel que anuncia el Davallament de Felanitx 2026, con fotografía de Sofia Binimelis Arias y diseño gráfico de Miquel Àngel Roig Maimó.",
          tags: ["Cartel 2026", "Sofia Binimelis Arias", "Joan Toni Sunyer"],
          body: [
            "La noche del 18 de febrero de 2026 se presentó oficialmente el cartel que anuncia el Davallament de Felanitx 2026, obra fotográfica de la artista Sofia Binimelis Arias, quien ha sabido captar con sensibilidad y fuerza expresiva la esencia de esta representación tan arraigada en nuestro pueblo.",
            "El diseño gráfico del cartel ha estado a cargo de Miquel Àngel Roig Maimó.",
            "Tras la celebración del cincuentenario, el Davallament de 2026 busca dar continuidad a aquel hito, poniendo un énfasis especial en la banda sonora creada expresamente para la ocasión y en la consolidación de los nuevos elementos incorporados en los últimos años.",
            "El Davallament de Felanitx se celebra el Viernes Santo, día 3 de abril de 2026, a las 21:00 h, en el rellano de la iglesia parroquial de Sant Miquel, bajo la dirección artística de Joan Toni Sunyer.",
            "Desde la organización se ha querido expresar un agradecimiento especial al Ayuntamiento de Felanitx, al Centre Cultural, a la Fundació Barceló y a la Parroquia de Sant Miquel por su colaboración y apoyo constante."
          ]
        },
        "edicio-2026-escalinata": {
          category: "Crónicas", date: "3 de abril de 2026", readTime: "4 min",
          title: "El Davallament de Felanitx vuelve a emocionar a los fieles en su 51.ª edición",
          excerpt: "Este año se ha celebrado la 51.ª edición de la representación en el majestuoso escenario frente a la iglesia parroquial de Sant Miquel, con récord de 160 actores de entre 3 y casi 80 años.",
          tags: ["51.ª Edición", "Sant Miquel", "Viernes Santo"],
          body: [
            "Tras el especial Davallament del año pasado para conmemorar el 50.º aniversario con varios escenarios diferentes, este año la representación ha vuelto a su marco habitual, el escenario incomparable que forman la escalinata y el rellano de la iglesia parroquial de Sant Miquel de Felanitx. La pasión y emotividad de la escenificación, que nos trasladan a las últimas horas de vida y la crucifixión de Jesús, volvieron a sorprender a los cientos de espectadores que siguieron el acto.",
            "La representación relata algunos de los pasajes más representativos de la pasión de Jesús: la Entrada Triunfal en Jerusalén, la Última Cena, Jesús ante Caifás, el «Ecce Homo», la flagelación y su presentación ante Pilato, y culmina con la crucifixión y el acto propio del Davallament sobre el rellano parroquial. El papel de Jesús este año fue encarnado por Bernat Monserrat y el de la Virgen María por Marta Obrador.",
            "Cabe señalar que este año se ha vuelto a batir un récord de participación con 160 actores, todos aficionados y vecinos de Felanitx de entre 3 y casi 80 años, que se metieron de lleno en su papel bajo la dirección del actor manacorí Joan Toni Sunyer. La escenografía, junto con los efectos de luz y sonido preparados para la ocasión, le dan un aura especial.",
            "La música también juega un papel importante. La banda sonora compuesta y orquestada por el músico porrerenc Joan Martorell el año pasado da una nueva dimensión sonora a cada escena. Este Viernes Santo la música y la escenografía estuvieron acompañadas por la narración de Maria Mascaró y del actor Miquel Gelabert, que realizaron una sentida lectura de los textos tradicionales escritos expresamente para el Davallament.",
            "Aunque la representación en este emplazamiento se viene realizando desde hace 51 años, anteriormente se hacía en el interior de la iglesia y su historia se remonta a la Edad Media. Una vez finalizado el Davallament, se celebró la Procesión del Entierro, que finalizó en el convento de Sant Agustí."
          ]
        },
        "cinquantenari-2025-historic": {
          category: "50.º Aniversario", date: "19 de abril de 2025", readTime: "5 min",
          title: "Un 50.º aniversario histórico: seis escenarios, música original y directo en IB3",
          excerpt: "Felanitx conmemoró medio siglo del Davallament al aire libre con un despliegue sin precedentes en la Plaça de sa Font de Santa Margalida.",
          tags: ["50.º Aniversario", "IB3 Televisió", "Cincuentenario"],
          body: [
            "Cincuenta años después de aquel 28 de marzo de 1975 en el que la representación salió al exterior, Felanitx vivió una edición conmemorativa inolvidable.",
            "Bajo la dirección de Joan Toni Sunyer y Marta Obrador, la escenificación se desplegó por seis escenarios alrededor de la Plaça de sa Font de Santa Margalida, estrenando la música original de Joan Martorell.",
            "Por primera vez, IB3 Televisió retransmitió el acto en directo para todas las Islas Baleares, acercando la tradición a miles de espectadores."
          ]
        },
        "cartell-miquel-barcelo": {
          category: "50.º Aniversario", date: "14 de marzo de 2025", readTime: "3 min",
          title: "Miquel Barceló firma el cartel conmemorativo de los 50 años del Davallament",
          excerpt: "El artista felanitxer colaboró en la efeméride regalando a su pueblo una imagen cargada de fuerza expresiva y simbolismo.",
          tags: ["Miquel Barceló", "Arte", "Cartel"],
          body: [
            "La presentación oficial del 50.º aniversario incluyó el descubrimiento del cartel conmemorativo diseñado por el artista internacional nacido en Felanitx, Miquel Barceló.",
            "La Associació El Davallament de Felanitx agradeció públicamente este gesto generoso que vincula la creación contemporánea con medio siglo de memoria popular y patrimonio compartido."
          ]
        }
      },
      board: {
        "presidencia": { role: "Presidencia", name: "Pendiente de actualizar", area: "Representación institucional y coordinación general de la Asociación." },
        "vicepresidencia": { role: "Vicepresidencia", name: "Pendiente de actualizar", area: "Apoyo a la presidencia y coordinación de equipos de trabajo." },
        "secretaria": { role: "Secretaría", name: "Pendiente de actualizar", area: "Actas de reuniones, convocatorias, registro de socios y comunicaciones." },
        "tresoreria": { role: "Tesorería", name: "Pendiente de actualizar", area: "Gestión económica, presupuestos y tramitación de colaboraciones." },
        "vocalia-escenografia": { role: "Vocalía de Escenografía y Vestuario", name: "Pendiente de actualizar", area: "Mantenimiento de atrezo, vestuario histórico y montaje en Sant Miquel." },
        "vocalia-comunicacio": { role: "Vocalía de Comunicación y Archivo", name: "Pendiente de actualizar", area: "Difusión cultural, redes, portal web y preservación documental." }
      },
      meetings: {
        "assemblea-general-2026": {
          title: "Asamblea General Ordinaria de la Asociación",
          date: "Fecha pendiente de confirmar",
          time: "20:00 h (1.ª convocatoria) · 20:30 h (2.ª convocatoria)",
          location: "Centre Cultural de Felanitx",
          audience: "Todos los socios, socias y colaboradores",
          summary: "Balance anual de la 51.ª edición del Davallament y planificación de las actividades y preparativos para la próxima Semana Santa.",
          agenda: [
            "Lectura y aprobación del acta de la sesión anterior.",
            "Valoración de la edición del Davallament 2026.",
            "Estado de cuentas y balance económico anual.",
            "Calendario previsto de ensayos, vestuario y preparativos para la próxima edición.",
            "Ruegos y preguntas."
          ]
        },
        "reunio-participants-2026": {
          title: "Reunión informativa y organización de ensayos 2026",
          date: "Febrero de 2026",
          time: "20:00 h",
          location: "Entorno de la Parroquia de Sant Miquel",
          audience: "Actores, actrices, equipo de vestuario y voluntariado",
          summary: "Encuentro inicial con todos los participantes para repartir calendarios de ensayo, vestuario y coordinación de escenas en la escalinata.",
          agenda: [
            "Bienvenida a los nuevos participantes y distribución de papeles.",
            "Calendario de ensayos semanales y ensayo general.",
            "Prueba y entrega de vestuario.",
            "Coordinación de iluminación, sonido y montaje."
          ]
        }
      },
      gallery: {
        "davallament-creu": { title: "El Descendimiento de la Cruz", album: "El Davallament", year: "Edición reciente", location: "Portada principal de la Parroquia de Sant Miquel", caption: "El momento culminante de la noche: con las dos escaleras y el lienzo blanco, los santos varones descienden el cuerpo de Jesús bajo la luz azulada y la portada barroca de Sant Miquel." },
        "cami-calvari-veronica": { title: "La Caída con la Cruz y la Verónica", album: "Camino del Calvario", year: "Edición reciente", location: "Rellano superior de Sant Miquel", caption: "Bajo el rosetón de la iglesia parroquial, la Verónica muestra el paño mientras Jesús cae con la cruz rodeado por los soldados romanos y el pueblo de Felanitx." },
        "armats-escalinata": { title: "Escolta de los Armats por la escalinata", album: "Camino del Calvario", year: "Edición reciente", location: "Escalinata de piedra de marés de Sant Miquel", caption: "La tensión dramática del ascenso hacia el Calvario con los armats romanos, las lanzas y la luz rojiza reflejada sobre cada peldaño de marés." },
        "judici-pilat-flagellacio": { title: "El Juicio de Poncio Pilato y la Flagelación", album: "Pasión y Juicio", year: "Edición reciente", location: "Balcón lateral y escalinata de Sant Miquel", caption: "Poncio Pilato preside el pretorio desde el arco de piedra lateral mientras tiene lugar la escena de la flagelación ante la mirada del pueblo." }
      }
    }
  },

  /* ========================================================================
     ENGLISH (EN)
     ======================================================================== */
  en: {
    langName: "English",
    toastLang: "Language switched to English",
    skipLink: "Skip to main content",
    nav: {
      inici: "Home",
      historia: "History",
      representacio: "The Play",
      noticies: "News",
      entitat: "The Association",
      galeria: "Gallery",
      contacte: "Contact"
    },
    footer: {
      title: "Associació El Davallament de Felanitx",
      copy: "© Associació El Davallament de Felanitx 2026"
    },
    pageTitles: {
      inici: "El Davallament de Felanitx — Official Heritage Portal",
      historia: "History | El Davallament de Felanitx",
      representacio: "The Play | El Davallament de Felanitx",
      noticies: "News | El Davallament de Felanitx",
      entitat: "The Association | El Davallament de Felanitx",
      galeria: "Photo Gallery | El Davallament de Felanitx",
      contacte: "Contact | El Davallament de Felanitx"
    },
    ui: {
      breadcrumbHome: "Home",
      readMore: "Read more →",
      discoverScenes: "Explore the scenes →",
      viewGallery: "View gallery →",
      allNews: "All news →",
      consultEntity: "Meet the association & board →",
      meetingUpcoming: "Upcoming meeting",
      meetingPast: "Completed",
      meetingDateLabel: "Date & time",
      meetingPlaceLabel: "Location",
      meetingAudienceLabel: "Open to",
      meetingAgendaLabel: "Agenda",
      viewAgenda: "View full agenda →",
      noMeetings: "There are currently no published meetings.",
      readArticle: "Read article →",
      readShort: "Read →",
      readFullArticle: "Read full article →",
      featuredPrefix: "Featured · ",
      latestBadge: "Featured news",
      allYears: "All years",
      readTimeSuffix: " read",
      copyLink: "Copy link",
      linkCopied: "Link copied to clipboard",
      closeReading: "Close",
      sourceLabel: "Source:",
      viewClipping: "View clipping",
      readClipping: "Read clipping →",
      openClipping: "Open clipping →",
      backToArchive: "Back to archive",
      archiveNoteLabel: "Archive note:",
      archiveNoteDefault: "Catalogued in the digital press archive of Associació El Davallament de Felanitx.",
      closeLightbox: "Close ✕",
      zoomPill: "Zoom ↗",
      allCategory: "All",
      allOutlets: "All media outlets",
      noNewsFound: "No news articles match the current filters.",
      showAll: "Show all",
      noPressFound: "No press clippings match this search.",
      showAllArchive: "Show full archive",
      newsCount: (shown, total) => `Showing ${shown} of ${total} articles`,
      pressCount: (shown, total) => `${shown} catalogued clippings (${total} total in archive)`,
      galleryCount: (n) => `${n} authentic photographs of El Davallament · Click to enlarge`,
      sceneEyebrow: (num, loc) => `Scene ${num} · ${loc}`,
      atmosphereLabel: "Atmosphere:",
      listView: "List",
      gridView: "Cards",
      contactSending: "Sending message...",
      contactToast: (name) => `Thank you, ${name || "friend"}! Your message has been sent to davallamentfelanitx@gmail.com.`,
      contactFallback: "Your email client was opened to send the message directly to"
    },
    home: {
      welcomeEyebrow: "Associació El Davallament de Felanitx",
      welcomeTitle: "Welcome",
      welcomeText: "A space dedicated to preserving and sharing the cultural heritage associated with El Davallament de Felanitx, performed every Good Friday since 1975.",
      m1Val: "Since 1975",
      m1Lbl: "First outdoor performance on Sant Miquel steps",
      m2Val: "Over 50 years",
      m2Lbl: "Of living intangible cultural heritage",
      m3Val: "Over 160",
      m3Lbl: "Actors and actresses of all ages",
      f1Eyebrow: "Since 1975",
      f1Title: "History",
      f1Text: "Discover the origins and evolution of El Davallament de Felanitx over time: from medieval liturgical roots inside the church and the move outdoors on March 28, 1975, to the historic 50th anniversary.",
      f2Eyebrow: "Eight scenes · Good Friday",
      f2Title: "The Play",
      f2Text: "Meet the characters, the traditional script, Joan Martorell's original symphonic score, and the staging that turns honey-colored marès sandstone into an open-air sacred theatre.",
      f3Eyebrow: "Authentic Photography",
      f3Title: "Photo Gallery",
      f3Text: "A visual journey through the most moving scenes of the night: Pilate's judgement, the Roman soldiers, Veronica, and the hushed Descent before the baroque portal of Sant Miquel.",
      newsEyebrow: "Latest Updates",
      newsTitle: "Recent News",
      entitatEyebrow: "The Association",
      entitatTitle: "Meetings & Association Life",
      guideEyebrow: "Visitor Guide",
      guideTitle: "How to Experience El Davallament",
      g1Title: "Location",
      g1Html: "<strong>Grand Staircase of Sant Miquel Parish Church</strong> & <strong>Plaça de sa Font de Santa Margalida</strong>, Felanitx (Mallorca).",
      g2Title: "Time & Admission",
      g2Html: "Every <strong>Good Friday at 21:00</strong>. Free open-air access. Arriving 30–40 minutes early is recommended.",
      g3Title: "Get Involved",
      g3Html: "Would you like to join as an actor, extra, costume helper, or volunteer? <a href=\"contacte.html\" style=\"color:var(--primary);font-weight:600;text-decoration:underline\">Contact the Association</a>."
    },
    historia: {
      bannerTitle: "History of El Davallament",
      bannerSub: "More than half a century of open-air sacred theatre on the staircase of Sant Miquel and centuries of living tradition in the heart of Felanitx.",
      memEyebrow: "Collective Memory",
      memTitle: "From inside the church to the monumental staircase",
      memP1Html: "Representations of the Descent from the Cross belong to Mallorca's medieval Holy Week theatre tradition. In Felanitx, the ceremony took place for generations inside the <strong>Parish Church of Sant Miquel</strong>, until on <strong>March 28, 1975</strong>, the Creuada de l'Amor Diví and local residents brought the performance outdoors permanently.",
      memP2: "Built upon traditional texts written specifically for the occasion, the play became an unmissable cultural and devotional milestone in Mallorca, uniting entire generations of Felanitx residents on a purely voluntary basis.",
      quoteText: "“What began in 1975 through community passion and dedication has become a defining hallmark uniting the entire town of Felanitx.”",
      quoteCite: "— Associació El Davallament de Felanitx",
      tlEyebrow: "Timeline",
      tlTitle: "Key Milestones (1975–2026)",
      prEyebrow: "People & Community",
      prTitle: "Key Figures Behind This Story"
    },
    representacio: {
      bannerTitle: "The Play",
      bannerSub: "A guide through the eight dramatic tableaux, the characters, the sandstone staging, and the hushed silence of Good Friday night.",
      expEyebrow: "Good Friday Dramaturgy",
      expTitle: "Scene-by-Scene Explorer",
      expLead: "Select any of the eight dramatic scenes to learn about its story, exact staging on Sant Miquel's staircase, and featured characters.",
      elEyebrow: "Key Elements",
      elTitle: "Stagecraft & Visitor Tips",
      e1Title: "Sant Miquel Staircase",
      e1Text: "The marès sandstone steps, side balcony, rose window, and baroque portal form a natural architectural altarpiece allowing multi-level staging.",
      e2Title: "Music & Spoken Word",
      e2Text: "The dramatic script interweaves with Joan Martorell's original symphonic soundtrack and the Municipal Band of Felanitx during the procession that follows.",
      e3Title: "Silence & Reverence",
      e3Text: "The audience's complete silence is an essential part of the performance. We recommend arriving before 20:30, bringing warm layers, and silencing mobile phones."
    },
    noticies: {
      bannerTitle: "News & Updates",
      bannerSub: "Reports from recent editions, volunteer calls, cultural projects, and announcements from the Association.",
      searchPh: "Search news, topic, or year...",
      meetingsHint: "Looking for meetings or assemblies? Visit The Association →"
    },
    entitat: {
      bannerTitle: "The Association",
      bannerSub: "Meet Associació El Davallament de Felanitx, the board coordinating the play, and upcoming meetings and general assemblies.",
      aboutEyebrow: "Who we are",
      aboutTitle: "Associació El Davallament de Felanitx",
      aboutP1: "Associació El Davallament de Felanitx is a non-profit cultural association dedicated to preserving, organizing, and promoting the Passion Play and Descent from the Cross performed every Good Friday on Sant Miquel's staircase.",
      aboutP2: "Its work relies on the open, voluntary participation of over 160 actors and actresses of all ages alongside costume, stage, lighting, and sound teams, working closely with Felanitx Town Council, the Cultural Centre, Fundació Barceló, and Sant Miquel Parish.",
      joinBtn: "Contact us or volunteer →",
      boardEyebrow: "Governing body",
      boardTitle: "Board of Directors",
      boardLead: "The team responsible for the management, coordination, and continuity of Associació El Davallament de Felanitx.",
      meetingsEyebrow: "Association life",
      meetingsTitle: "Meetings & Assemblies",
      meetingsLead: "Check upcoming dates, general assemblies, and organizational meetings along with their agendas."
    },
    galeria: {
      bannerTitle: "Photo Gallery",
      bannerSub: "Authentic photographs of El Davallament performed on the staircase and portal of Sant Miquel Parish Church in Felanitx.",
      kbdHint: "Use ← → arrow keys in the viewer to browse"
    },
    contacte: {
      bannerTitle: "Contact & Participation",
      bannerSub: "Write to Associació El Davallament de Felanitx if you wish to take part in the play, volunteer, or share historic photos and press clippings.",
      leftEyebrow: "Associació El Davallament",
      leftTitle: "Be part of our community",
      leftText: "El Davallament exists thanks to the altruistic dedication of over 160 local residents. New volunteers are always welcome onstage or behind the scenes in costumes, staging, lighting, or archive work.",
      emailTitle: "Email",
      locTitle: "Performance Venue",
      locHtml: "Sant Miquel Parish Church · Plaça de sa Font de Santa Margalida<br>07200 Felanitx, Mallorca (Balearic Islands)",
      whenTitle: "When to find us",
      whenHtml: "During Lent, rehearsals take place around Sant Miquel Parish Church. The play is held every <strong>Good Friday at 21:00</strong>.",
      formTitle: "Send us a message",
      formSub: "Fill out the form below and we will get back to you as soon as possible.",
      lblName: "Full name *",
      phName: "Your name",
      lblEmail: "Email address *",
      phEmail: "name@example.com",
      lblTopic: "Subject *",
      optVol: "I want to participate as an actor / extra / volunteer",
      optArch: "I want to share old photos or press clippings",
      optPress: "Press & media inquiries",
      optGen: "General inquiry / Visitor information",
      lblMsg: "Message *",
      phMsg: "Tell us how we can help or how you would like to participate...",
      btnSend: "Send message →"
    },
    data: {
      heroSlides: [
        { kicker: "Good Friday · Sant Miquel Staircase", title: "El Davallament de Felanitx", subtitle: "The climactic Descent from the Cross before the baroque portal of Sant Miquel Parish Church." },
        { kicker: "Living Heritage Since 1975", title: "The Way to Calvary", subtitle: "Nearly two hundred local residents transform the sandstone steps into an open-air sacred theatre each year." },
        { kicker: "Lighting & Stagecraft", title: "Before the Roman Guards and the Town", subtitle: "Community theatre, dramatic lighting, and a staging steeped in solemnity." },
        { kicker: "Tradition & Emotion", title: "The Trial of Pontius Pilate", subtitle: "The historic architecture of the square and church facade become the natural stage of the Passion." }
      ],
      scenes: {
        "entrada-jerusalem": { title: "Entry into Jerusalem", location: "Foot of Sant Miquel staircase", characters: ["Jesus", "Apostles", "People of Jerusalem", "Children with palms"], atmosphere: "Choral opening along the marès stone steps", fullDesc: "The performance opens with local families and children bringing Jerusalem to life with olive branches and palms, establishing the deep community spirit of El Davallament from the very first moment." },
        "sant-sopar": { title: "The Last Supper & Gethsemane", location: "Middle landing and olive grove staging", characters: ["Jesus", "The Twelve Apostles", "Judas Iscariot"], atmosphere: "Intimate light, reflection, and musical tension", fullDesc: "Bathed in restrained, solemn light, the Last Supper gives way to the night in Gethsemane. Joan Martorell's original score accompanies the hushed silence of the square before the soldiers arrive." },
        "caifas-pilat": { title: "Before Caiaphas & Pontius Pilate", location: "Side balcony and upper steps", characters: ["Jesus", "Caiaphas", "Pontius Pilate", "Priests", "Roman Guards"], atmosphere: "Dramatic tension, crimson light, and stone arches", fullDesc: "Using the church's pointed stone arch and side balcony, the trial before Pontius Pilate pairs powerful dramatic lines with the imposing presence of the Roman guards and the crowd." },
        "ecce-homo": { title: "Scourging & Ecce Homo", location: "Central staircase", characters: ["Jesus", "Roman soldiers", "Pontius Pilate", "Crowd"], atmosphere: "Bold red contrasts and absolute silence", fullDesc: "A visually striking sequence where crimson-lit steps frame Christ's suffering as hundreds of spectators watch in total stillness from Plaça de sa Font de Santa Margalida." },
        "via-crucis": { title: "Way of the Cross & Veronica", location: "Ascent up Sant Miquel staircase", characters: ["Jesus", "Virgin Mary", "Veronica", "Simon of Cyrene", "Roman Guards"], atmosphere: "Slow processional rhythm and restrained emotion", fullDesc: "The entire staircase becomes the Via Dolorosa. The meeting with Mary and Veronica holding out the white cloth beneath Sant Miquel's rose window create some of the night's most iconic images." },
        "crucifixio": { title: "The Crucifixion", location: "Top parish landing", characters: ["Jesus", "Virgin Mary", "Saint John", "Mary Magdalene", "Centurion"], atmosphere: "Overhead beams and total darkness across the square", fullDesc: "The cross rises at the highest point of the landing. With all streetlamps switched off in the old town, every eye focuses on Christ's final words." },
        "el-davallament": { title: "The Descent from the Cross", location: "Main portal of Sant Miquel", characters: ["Joseph of Arimathea", "Nicodemus", "Virgin Mary", "Saint John", "Holy Women"], atmosphere: "Blue light, soft mist, ladders, and white shroud", fullDesc: "The culminating moment that gives the tradition its name and inspires our logo. Using two ladders and a long white linen shroud, the body of Jesus is gently lowered into Mary's arms in a living Pietà." },
        "processo-enterrament": { title: "Burial Procession", location: "Old town streets of Felanitx", characters: ["Local brotherhoods", "Felanitx Municipal Band", "Faithful"], atmosphere: "Candles, brass lanterns, and funeral marches", fullDesc: "Once collective applause finally breaks the square's silence, the local brotherhoods and Felanitx Municipal Band lead the solemn Burial Procession through the darkened streets." }
      },
      timeline: [
        { year: "15th–19th Centuries", title: "Medieval roots and indoor liturgy", text: "Descent reenactments trace their roots to Mallorca's medieval liturgical theatre. For centuries, the ceremony took place inside Sant Miquel Parish Church as a deeply felt Holy Week devotion." },
        { year: "March 28, 1975", title: "First outdoor performance on Sant Miquel steps", text: "Driven by the Creuada de l'Amor Diví and local townspeople, El Davallament stepped outdoors for the first time onto the landing and grand staircase of Sant Miquel." },
        { year: "1980s–1990s", title: "Community roots and regional landmark", text: "Good Friday attendance and local involvement grew rapidly. Whole families joined in sewing costumes, building sets, and rehearsing, turning the play into one of Mallorca's premier Holy Week events." },
        { year: "2000–2024", title: "Scenic evolution and shared heritage", text: "Theatrical lighting, sound, and stage direction were steadily upgraded while preserving traditional sobriety. Following the pandemic pause, the 2022 return strengthened multi-generational participation." },
        { year: "April 2025", title: "50th Anniversary: a historic milestone", text: "Felanitx celebrated half a century outdoors with a commemorative poster by world-renowned local artist Miquel Barceló. Directed by Joan Toni Sunyer and Marta Obrador across six stages in Plaça de sa Font de Santa Margalida, it premiered Joan Martorell's original score and was broadcast live on IB3 TV for the first time." },
        { year: "April 3, 2026", title: "Consolidating the legacy on the traditional steps", text: "The 2026 edition returned full focus to the classic facade and steps of Sant Miquel while keeping Joan Martorell's soundtrack and nearly 180 local participants, followed by the Burial Procession." }
      ],
      protagonists: [
        { role: "1975 Founders", name: "Creuada de l'Amor Diví & 1975 pioneers", desc: "The pioneers who made the historic move from inside the church out onto the monumental steps of Sant Miquel on March 28, 1975." },
        { role: "50th Anniversary Direction", name: "Joan Toni Sunyer & Marta Obrador", desc: "Creative leaders behind the 50th anniversary renewal, blending deep respect for tradition with contemporary theatrical craft." },
        { role: "50th Anniversary Poster", name: "Miquel Barceló", desc: "The internationally acclaimed Felanitx-born artist created the commemorative 50th-anniversary artwork (2025)." },
        { role: "Original Soundtrack", name: "Joan Martorell", desc: "Composer of the symphonic score written specially for Felanitx, now a lasting sonic hallmark of El Davallament." },
        { role: "The Heart of the Association", name: "160+ locals, brotherhoods & Municipal Band", desc: "Amateur actors of all ages, costumers, technicians, brotherhoods, and musicians keeping a 100% volunteer tradition alive." }
      ],
      news: {
        "presentacio-cartell-2026": {
          category: "2026 Edition", date: "February 19, 2026", readTime: "3 min",
          title: "Unveiling of the official poster for El Davallament de Felanitx 2026",
          excerpt: "The official poster announcing El Davallament de Felanitx 2026 has been unveiled, featuring photography by Sofia Binimelis Arias and graphic design by Miquel Àngel Roig Maimó.",
          tags: ["2026 Poster", "Sofia Binimelis Arias", "Joan Toni Sunyer"],
          body: [
            "On the evening of February 18, 2026, the official poster announcing El Davallament de Felanitx 2026 was unveiled—a photographic artwork by Sofia Binimelis Arias that captures with sensitivity and expressive power the essence of this deeply rooted local tradition.",
            "Graphic design for the poster was created by Miquel Àngel Roig Maimó.",
            "Following the 50th anniversary celebration, the 2026 edition continues that momentum, placing special emphasis on the original soundtrack composed for the occasion and consolidating the new scenic elements introduced in recent years.",
            "El Davallament de Felanitx takes place on Good Friday, April 3, 2026, at 21:00 on the landing of Sant Miquel Parish Church, under the artistic direction of Joan Toni Sunyer.",
            "Organizers expressed their heartfelt gratitude to Felanitx Town Council, the Cultural Centre, Fundació Barceló, and Sant Miquel Parish for their ongoing support."
          ]
        },
        "edicio-2026-escalinata": {
          category: "Reports", date: "April 3, 2026", readTime: "4 min",
          title: "El Davallament de Felanitx moves the faithful once again in its 51st edition",
          excerpt: "This year marked the 51st edition on the majestic staircase of Sant Miquel Parish Church, setting a participation record with 160 local actors aged 3 to nearly 80.",
          tags: ["51st Edition", "Sant Miquel", "Good Friday"],
          body: [
            "Following last year's special 50th-anniversary staging across multiple venues, this year's performance returned to its classic setting: the incomparable grand staircase and landing of Sant Miquel Parish Church in Felanitx. The passion and emotion of the play once again moved hundreds of spectators.",
            "The production depicts key moments of the Passion—from the Entry into Jerusalem, the Last Supper, Jesus before Caiaphas, Ecce Homo, the Scourging, and Pontius Pilate—culminating in the Crucifixion and the Descent on the parish landing. This year Jesus was portrayed by Bernat Monserrat and the Virgin Mary by Marta Obrador.",
            "Participation reached a record 160 amateur actors—Felanitx residents aged from 3 to nearly 80—directed by Manacor actor Joan Toni Sunyer, enhanced by evocative staging, lighting, and sound effects.",
            "Music also played a central role: the symphonic soundtrack composed by Porreres musician Joan Martorell brought rich depth to every scene, accompanied on Good Friday by heartfelt narration from Maria Mascaró and actor Miquel Gelabert reading the traditional texts written specially for El Davallament.",
            "Though staged outdoors here for 51 years, its origins inside the church reach back to the Middle Ages. Once El Davallament concluded, the solemn Burial Procession proceeded to the Convent of Sant Agustí."
          ]
        },
        "cinquantenari-2025-historic": {
          category: "50th Anniversary", date: "April 19, 2025", readTime: "5 min",
          title: "A historic 50th anniversary: six stages, original score, and live IB3 broadcast",
          excerpt: "Felanitx commemorated half a century of the outdoor play with an unprecedented staging across Plaça de sa Font de Santa Margalida.",
          tags: ["50th Anniversary", "IB3 TV", "Jubilee"],
          body: [
            "Fifty years after March 28, 1975, when the performance first moved outdoors, Felanitx experienced an unforgettable anniversary edition.",
            "Directed by Joan Toni Sunyer and Marta Obrador, the production expanded across six stages around Plaça de sa Font de Santa Margalida, premiering Joan Martorell's original score.",
            "For the first time ever, Balearic public broadcaster IB3 aired the performance live across all islands."
          ]
        },
        "cartell-miquel-barcelo": {
          category: "50th Anniversary", date: "March 14, 2025", readTime: "3 min",
          title: "Miquel Barceló designs the commemorative 50th-anniversary poster",
          excerpt: "The Felanitx-born artist joined the milestone by gifting his hometown a powerfully expressive artwork.",
          tags: ["Miquel Barceló", "Art", "Poster"],
          body: [
            "The official presentation of the 50th anniversary featured the unveiling of the commemorative poster created by internationally renowned Felanitx artist Miquel Barceló.",
            "Associació El Davallament de Felanitx expressed deep gratitude for a generous work linking contemporary art with half a century of shared local heritage."
          ]
        }
      },
      board: {
        "presidencia": { role: "Presidency", name: "To be updated", area: "Institutional representation and overall coordination of the Association." },
        "vicepresidencia": { role: "Vice-Presidency", name: "To be updated", area: "Support to the presidency and working-group coordination." },
        "secretaria": { role: "Secretary", name: "To be updated", area: "Meeting minutes, notices, membership registry, and communications." },
        "tresoreria": { role: "Treasury", name: "To be updated", area: "Financial management, budgets, and partnership administration." },
        "vocalia-escenografia": { role: "Stage & Costumes", name: "To be updated", area: "Maintenance of props, historic costumes, and staging at Sant Miquel." },
        "vocalia-comunicacio": { role: "Communications & Archive", name: "To be updated", area: "Cultural outreach, social channels, website, and archival preservation." }
      },
      meetings: {
        "assemblea-general-2026": {
          title: "Ordinary General Assembly of the Association",
          date: "Date to be confirmed",
          time: "20:00 (1st call) · 20:30 (2nd call)",
          location: "Centre Cultural de Felanitx",
          audience: "All members and collaborators",
          summary: "Annual review of the 51st edition of El Davallament and planning of activities and preparations for the next Holy Week.",
          agenda: [
            "Reading and approval of the previous session's minutes.",
            "Review of the 2026 edition of El Davallament.",
            "Annual financial report and accounts.",
            "Planned rehearsal, costume, and preparation calendar for the next edition.",
            "Questions and open floor."
          ]
        },
        "reunio-participants-2026": {
          title: "Information & Rehearsal Planning Meeting 2026",
          date: "February 2026",
          time: "20:00",
          location: "Sant Miquel Parish premises",
          audience: "Actors, actresses, costume team, and volunteers",
          summary: "Kick-off gathering with all participants to share rehearsal schedules, costumes, and scene coordination on the staircase.",
          agenda: [
            "Welcome to new participants and role assignments.",
            "Weekly rehearsal schedule and dress rehearsal.",
            "Costume fitting and distribution.",
            "Lighting, sound, and stage setup coordination."
          ]
        }
      },
      gallery: {
        "davallament-creu": { title: "The Descent from the Cross", album: "El Davallament", year: "Recent edition", location: "Main portal of Sant Miquel Parish Church", caption: "The climax of the night: using two ladders and a white shroud, the body of Jesus is gently lowered beneath blue stage light and Sant Miquel's baroque portal." },
        "cami-calvari-veronica": { title: "The Fall with the Cross & Veronica", album: "Way to Calvary", year: "Recent edition", location: "Upper landing of Sant Miquel", caption: "Beneath the church's rose window, Veronica displays the veil as Jesus falls beneath the cross surrounded by Roman soldiers and the people of Felanitx." },
        "armats-escalinata": { title: "Roman Guards Along the Staircase", album: "Way to Calvary", year: "Recent edition", location: "Marès sandstone steps of Sant Miquel", caption: "The dramatic ascent toward Calvary with Roman guards, spears, and warm crimson light cast across every sandstone step." },
        "judici-pilat-flagellacio": { title: "Trial of Pontius Pilate & Scourging", album: "Passion & Trial", year: "Recent edition", location: "Side balcony & Sant Miquel steps", caption: "Pontius Pilate presides from the pointed stone arch above as the scourging unfolds before the gathered town." }
      }
    }
  },

  /* ========================================================================
     DEUTSCH (DE)
     ======================================================================== */
  de: {
    langName: "Deutsch",
    toastLang: "Sprache auf Deutsch umgestellt",
    skipLink: "Zum Hauptinhalt springen",
    nav: {
      inici: "Startseite",
      historia: "Geschichte",
      representacio: "Aufführung",
      noticies: "Nachrichten",
      entitat: "Der Verein",
      galeria: "Galerie",
      contacte: "Kontakt"
    },
    footer: {
      title: "Associació El Davallament de Felanitx",
      copy: "© Associació El Davallament de Felanitx 2026"
    },
    pageTitles: {
      inici: "El Davallament de Felanitx — Offizielles Kulturportal",
      historia: "Geschichte | El Davallament de Felanitx",
      representacio: "Die Aufführung | El Davallament de Felanitx",
      noticies: "Nachrichten | El Davallament de Felanitx",
      entitat: "Der Verein | El Davallament de Felanitx",
      galeria: "Fotogalerie | El Davallament de Felanitx",
      contacte: "Kontakt | El Davallament de Felanitx"
    },
    ui: {
      breadcrumbHome: "Startseite",
      readMore: "Mehr lesen →",
      discoverScenes: "Szenen entdecken →",
      viewGallery: "Galerie ansehen →",
      allNews: "Alle Nachrichten →",
      consultEntity: "Verein & Vorstand kennenlernen →",
      meetingUpcoming: "Nächster Termin",
      meetingPast: "Abgeschlossen",
      meetingDateLabel: "Datum & Uhrzeit",
      meetingPlaceLabel: "Ort",
      meetingAudienceLabel: "Eingeladen",
      meetingAgendaLabel: "Tagesordnung",
      viewAgenda: "Vollständige Tagesordnung ansehen →",
      noMeetings: "Derzeit sind keine Termine veröffentlicht.",
      readArticle: "Artikel lesen →",
      readShort: "Lesen →",
      readFullArticle: "Vollständigen Artikel lesen →",
      featuredPrefix: "Empfohlen · ",
      latestBadge: "Hervorgehobene Nachricht",
      allYears: "Alle Jahre",
      readTimeSuffix: " Lesezeit",
      copyLink: "Link kopieren",
      linkCopied: "Link in die Zwischenablage kopiert",
      closeReading: "Schließen",
      sourceLabel: "Quelle:",
      viewClipping: "Ausschnitt ansehen",
      readClipping: "Ausschnitt lesen →",
      openClipping: "Ausschnitt öffnen →",
      backToArchive: "Zurück zum Archiv",
      archiveNoteLabel: "Archivhinweis:",
      archiveNoteDefault: "Katalogisiert im digitalen Pressearchiv der Associació El Davallament de Felanitx.",
      closeLightbox: "Schließen ✕",
      zoomPill: "Vergrößern ↗",
      allCategory: "Alle",
      allOutlets: "Alle Medien",
      noNewsFound: "Keine Nachrichten entsprechen den aktuellen Filtern.",
      showAll: "Alle anzeigen",
      noPressFound: "Kein Presseausschnitt entspricht dieser Suche.",
      showAllArchive: "Gesamtes Archiv anzeigen",
      newsCount: (shown, total) => `${shown} von ${total} Nachrichten angezeigt`,
      pressCount: (shown, total) => `${shown} katalogisierte Ausschnitte (${total} insgesamt im Archiv)`,
      galleryCount: (n) => `${n} Originalfotografien des Davallament · Zum Vergrößern klicken`,
      sceneEyebrow: (num, loc) => `Szene ${num} · ${loc}`,
      atmosphereLabel: "Atmosphäre:",
      listView: "Liste",
      gridView: "Karten",
      contactSending: "Nachricht wird gesendet...",
      contactToast: (name) => `Vielen Dank, ${name || "Freund/in"}! Ihre Nachricht wurde an davallamentfelanitx@gmail.com gesendet.`,
      contactFallback: "Ihr E-Mail-Programm wurde geöffnet, um die Nachricht direkt zu senden an"
    },
    home: {
      welcomeEyebrow: "Associació El Davallament de Felanitx",
      welcomeTitle: "Willkommen",
      welcomeText: "Ein Raum zur Bewahrung und Vermittlung des kulturellen Erbes des Davallament de Felanitx, der seit 1975 jeden Karfreitag aufgeführt wird.",
      m1Val: "Seit 1975",
      m1Lbl: "Erste Aufführung auf der Treppe von Sant Miquel",
      m2Val: "Über 50 Jahre",
      m2Lbl: "Lebendiges immaterielles Kulturerbe",
      m3Val: "Über 160",
      m3Lbl: "Darstellerinnen und Darsteller jeden Alters",
      f1Eyebrow: "Seit 1975",
      f1Title: "Geschichte",
      f1Text: "Entdecken Sie Ursprung und Entwicklung des Davallament de Felanitx im Wandel der Zeit: von den mittelalterlichen Wurzeln in der Kirche über den Schritt ins Freie am 28. März 1975 bis zum historischen 50. Jubiläum.",
      f2Eyebrow: "Acht Szenen · Karfreitag",
      f2Title: "Die Aufführung",
      f2Text: "Lernen Sie die Figuren, die traditionellen Texte, die Originalmusik von Joan Martorell und die Inszenierung kennen, die den Marés-Sandstein in ein Freilichttheater verwandeln.",
      f3Eyebrow: "Originalfotografien",
      f3Title: "Fotogalerie",
      f3Text: "Eine visuelle Reise durch die bewegendsten Momente des Abends: das Urteil des Pilatus, die römischen Soldaten, Veronika und die ergreifende Stille der Kreuzabnahme vor dem Portal von Sant Miquel.",
      newsEyebrow: "Aktuelles",
      newsTitle: "Neueste Nachrichten",
      entitatEyebrow: "Der Verein",
      entitatTitle: "Termine & Vereinsleben",
      guideEyebrow: "Besucherinformationen",
      guideTitle: "Den Davallament erleben",
      g1Title: "Veranstaltungsort",
      g1Html: "<strong>Treppe der Pfarrkirche Sant Miquel</strong> & <strong>Plaça de sa Font de Santa Margalida</strong>, Felanitx (Mallorca).",
      g2Title: "Uhrzeit & Eintritt",
      g2Html: "Jeden <strong>Karfreitag um 21:00 Uhr</strong>. Freier Eintritt auf dem Platz. Eine Ankunft 30–40 Minuten vorher wird empfohlen.",
      g3Title: "Mitwirken",
      g3Html: "Möchten Sie als Darsteller, Statist, im Kostümteam oder als Helfer mitwirken? <a href=\"contacte.html\" style=\"color:var(--primary);font-weight:600;text-decoration:underline\">Kontaktieren Sie den Verein</a>."
    },
    historia: {
      bannerTitle: "Geschichte des Davallament",
      bannerSub: "Über ein halbes Jahrhundert geistliches Freilichttheater auf der Treppe von Sant Miquel und jahrhundertealte Tradition im Herzen von Felanitx.",
      memEyebrow: "Kollektives Gedächtnis",
      memTitle: "Vom Kircheninneren auf die monumentale Treppe",
      memP1Html: "Die Darstellungen der Kreuzabnahme gehören zur mittelalterlichen Karwochentradition Mallorcas. In Felanitx fand die Zeremonie über Generationen hinweg im Inneren der <strong>Pfarrkirche Sant Miquel</strong> statt, bis am <strong>28. März 1975</strong> die Creuada de l'Amor Diví gemeinsam mit Einwohnern der Gemeinde den endgültigen Schritt ins Freie wagte.",
      memP2: "Auf Grundlage traditioneller, eigens für diesen Anlass verfasster Texte entwickelte sich die Aufführung zu einem unverzichtbaren kulturellen Höhepunkt Mallorcas, getragen vom rein ehrenamtlichen Engagement ganzer Generationen.",
      quoteText: "„Was 1975 mit Begeisterung und nachbarschaftlichem Einsatz begann, ist zu einem Identitätsmerkmal geworden, das ganz Felanitx vereint.“",
      quoteCite: "— Associació El Davallament de Felanitx",
      tlEyebrow: "Zeitleiste",
      tlTitle: "Meilensteine (1975–2026)",
      prEyebrow: "Menschen & Gemeinschaft",
      prTitle: "Prägende Persönlichkeiten dieser Geschichte"
    },
    representacio: {
      bannerTitle: "Die Aufführung",
      bannerSub: "Ein Überblick über die acht dramatischen Bilder, die Figuren, die Kulisse aus Marés-Sandstein und die Stille der Karfreitagsnacht.",
      expEyebrow: "Dramaturgie am Karfreitag",
      expTitle: "Szenen-Entdecker",
      expLead: "Wählen Sie eines der acht Bilder aus, um Handlung, genauen Schauplatz auf der Treppe von Sant Miquel und beteiligte Figuren kennenzulernen.",
      elEyebrow: "Schlüsselelemente",
      elTitle: "Bühnensprache & Empfehlungen",
      e1Title: "Die Treppe von Sant Miquel",
      e1Text: "Die Stufen aus Marés-Sandstein, der seitliche Balkon, die Rosette und das Barockportal bilden eine natürliche Architekturkulisse auf mehreren Ebenen.",
      e2Title: "Musik & Wort",
      e2Text: "Die dramatischen Texte verbinden sich mit der sinfonischen Originalmusik von Joan Martorell sowie der Musikkapelle von Felanitx bei der anschließenden Prozession.",
      e3Title: "Stille & Respekt",
      e3Text: "Die vollkommene Stille des Publikums ist wesentlicher Teil des Werks. Wir empfehlen, vor 20:30 Uhr einzutreffen, warme Kleidung mitzubringen und Mobiltelefone lautlos zu stellen."
    },
    noticies: {
      bannerTitle: "Nachrichten & Aktuelles",
      bannerSub: "Berichte der jüngsten Ausgaben, Mitmachaufrufe, Kulturprojekte und Neuigkeiten des Vereins.",
      searchPh: "Nachricht, Thema oder Jahr suchen...",
      meetingsHint: "Suchen Sie Sitzungen oder Versammlungen? Zu Der Verein →"
    },
    entitat: {
      bannerTitle: "Der Verein",
      bannerSub: "Lernen Sie die Associació El Davallament de Felanitx, den Vorstand sowie kommende Sitzungen und Mitgliederversammlungen kennen.",
      aboutEyebrow: "Über uns",
      aboutTitle: "Associació El Davallament de Felanitx",
      aboutP1: "Die Associació El Davallament de Felanitx ist ein gemeinnütziger Kulturverein zur Bewahrung, Organisation und Vermittlung des Passionsspiels und der Kreuzabnahme, die jeden Karfreitag auf der Treppe von Sant Miquel stattfinden.",
      aboutP2: "Ihre Arbeit stützt sich auf das offene und ehrenamtliche Mitwirken von über 160 Darstellerinnen und Darstellern jeden Alters sowie Kostüm-, Bühnen-, Licht- und Tonteams in enger Zusammenarbeit mit der Gemeinde Felanitx, dem Kulturzentrum, der Fundació Barceló und der Pfarrei Sant Miquel.",
      joinBtn: "Kontakt aufnehmen oder mithelfen →",
      boardEyebrow: "Leitungsgremium",
      boardTitle: "Vorstand",
      boardLead: "Das Team, das für Verwaltung, Koordination und Fortbestand der Associació El Davallament de Felanitx verantwortlich ist.",
      meetingsEyebrow: "Vereinsleben",
      meetingsTitle: "Termine & Versammlungen",
      meetingsLead: "Informieren Sie sich über bevorstehende Mitgliederversammlungen und Organisationstreffen samt Tagesordnung."
    },
    galeria: {
      bannerTitle: "Fotogalerie",
      bannerSub: "Originalfotografien der Aufführung des Davallament auf der Treppe und vor dem Portal der Pfarrkirche Sant Miquel in Felanitx.",
      kbdHint: "Im Bildbetrachter können Sie mit den Pfeiltasten ← → blättern"
    },
    contacte: {
      bannerTitle: "Kontakt & Mitwirkung",
      bannerSub: "Schreiben Sie der Associació El Davallament de Felanitx, wenn Sie mitwirken, helfen oder historische Fotos und Dokumente teilen möchten.",
      leftEyebrow: "Associació El Davallament",
      leftTitle: "Werden Sie Teil der Gemeinschaft",
      leftText: "Der Davallament ist nur dank des ehrenamtlichen Einsatzes von über 160 Einwohnerinnen und Einwohnern möglich. Neue Mitwirkende sind auf der Bühne wie bei Kostümen, Technik, Beleuchtung oder Archivarbeit jederzeit willkommen.",
      emailTitle: "E-Mail",
      locTitle: "Aufführungsort",
      locHtml: "Pfarrkirche Sant Miquel · Plaça de sa Font de Santa Margalida<br>07200 Felanitx, Mallorca (Balearen)",
      whenTitle: "Wann finden Sie uns?",
      whenHtml: "Während der Fastenzeit finden die Proben rund um die Pfarrkirche Sant Miquel statt. Die Aufführung erfolgt jeden <strong>Karfreitag um 21:00 Uhr</strong>.",
      formTitle: "Schreiben Sie uns",
      formSub: "Füllen Sie das Formular aus; wir melden uns schnellstmöglich bei Ihnen.",
      lblName: "Vor- und Nachname *",
      phName: "Ihr Name",
      lblEmail: "E-Mail-Adresse *",
      phEmail: "name@beispiel.de",
      lblTopic: "Betreff *",
      optVol: "Ich möchte als Darsteller / Statist / Helfer mitwirken",
      optArch: "Ich möchte historische Fotos oder Presseausschnitte teilen",
      optPress: "Presse- und Medienanfragen",
      optGen: "Allgemeine Anfrage / Besucherinformation",
      lblMsg: "Nachricht *",
      phMsg: "Teilen Sie uns mit, wie wir helfen können oder wie Sie mitwirken möchten...",
      btnSend: "Nachricht senden →"
    },
    data: {
      heroSlides: [
        { kicker: "Karfreitag · Treppe von Sant Miquel", title: "El Davallament de Felanitx", subtitle: "Der Höhepunkt der Kreuzabnahme vor dem barocken Portal der Pfarrkirche Sant Miquel." },
        { kicker: "Lebendiges Kulturerbe seit 1975", title: "Der Kreuzweg", subtitle: "Fast zweihundert Einwohner verwandeln jedes Jahr die Sandsteintreppe in ein geistliches Freilichttheater." },
        { kicker: "Inszenierung & Licht", title: "Vor den römischen Soldaten und dem Volk", subtitle: "Volkstheater, dramatische Lichtgestaltung und eine Inszenierung voller Feierlichkeit." },
        { kicker: "Tradition & Emotion", title: "Das Urteil des Pontius Pilatus", subtitle: "Die historische Architektur des Platzes und der Kirchenfassade bildet die natürliche Bühne der Passion." }
      ],
      scenes: {
        "entrada-jerusalem": { title: "Einzug in Jerusalem", location: "Fuß der Treppe von Sant Miquel", characters: ["Jesus", "Apostel", "Volk von Jerusalem", "Kinder mit Palmzweigen"], atmosphere: "Chorische Eröffnung auf den Stufen aus Marés-Stein", fullDesc: "Die Aufführung beginnt mit einheimischen Familien und Kindern, die mit Oliven- und Palmzweigen Jerusalem zum Leben erwecken und von Beginn an den Gemeinschaftsgeist des Davallament spürbar machen." },
        "sant-sopar": { title: "Das Letzte Abendmahl & Gethsemane", location: "Mittlerer Treppenabsatz und Ölberg-Szenerie", characters: ["Jesus", "Die zwölf Apostel", "Judas Iskariot"], atmosphere: "Intimes Licht, Einkehr und musikalische Spannung", fullDesc: "In gedämpftem, feierlichem Licht geht das Letzte Abendmahl in die Nacht von Gethsemane über. Joan Martorells Originalmusik begleitet die ergriffene Stille des Platzes vor der Ankunft der Soldaten." },
        "caifas-pilat": { title: "Vor Kaiphas & Pontius Pilatus", location: "Seitenbalkon und obere Treppe", characters: ["Jesus", "Kaiphas", "Pontius Pilatus", "Priester", "Römische Soldaten"], atmosphere: "Dramatische Spannung, karminrotes Licht und Steinbögen", fullDesc: "Unter Nutzung des Spitzbogens und des seitlichen Balkons der Pfarrkirche verbindet die Verhandlung vor Pilatus kraftvolle dramatische Texte mit der eindrucksvollen Präsenz der römischen Wachen." },
        "ecce-homo": { title: "Geißelung & Ecce Homo", location: "Zentrale Treppe", characters: ["Jesus", "Römische Soldaten", "Pontius Pilatus", "Menschenmenge"], atmosphere: "Intensive Rotkontraste und vollkommene Stille", fullDesc: "Eine bildgewaltige Sequenz, in der rot beleuchtete Stufen das Leiden Jesu umrahmen, während Hunderte Zuschauer auf der Plaça de sa Font de Santa Margalida in tiefem Schweigen verharren." },
        "via-crucis": { title: "Kreuzweg & Veronika", location: "Aufstieg über die Treppe von Sant Miquel", characters: ["Jesus", "Jungfrau Maria", "Veronika", "Simon von Zyrene", "Römische Soldaten"], atmosphere: "Ruhiger Prozessionsrhythmus und stille Bewegung", fullDesc: "Die gesamte Treppe wird zur Via Dolorosa. Die Begegnung mit Maria und die Geste Veronikas mit dem weißen Tuch unter der Rosette von Sant Miquel zählen zu den eindrucksvollsten Bildern der Nacht." },
        "crucifixio": { title: "Die Kreuzigung", location: "Oberer Vorplatz der Pfarrkirche", characters: ["Jesus", "Jungfrau Maria", "Johannes", "Maria Magdalena", "Hauptmann"], atmosphere: "Zenitales Licht und völlige Dunkelheit auf dem Platz", fullDesc: "Am höchsten Punkt des Vorplatzes erhebt sich das Kreuz. Bei ausgeschalteter Straßenbeleuchtung der Altstadt richtet sich alle Aufmerksamkeit auf die letzten Worte Jesu." },
        "el-davallament": { title: "Die Kreuzabnahme (El Davallament)", location: "Hauptportal von Sant Miquel", characters: ["Josef von Arimathäa", "Nikodemus", "Jungfrau Maria", "Johannes", "Heilige Frauen"], atmosphere: "Blaues Licht, sanfter Nebel, Leitern und weißes Leinentuch", fullDesc: "Der zentrale Höhepunkt, der der Tradition ihren Namen gibt und unser Logo inspiriert. Mit zwei Leitern und einem langen weißen Tuch wird der Leichnam Jesu behutsam in die Arme Marias herabgelassen." },
        "processo-enterrament": { title: "Grablegungsprozession", location: "Gassen der Altstadt von Felanitx", characters: ["Örtliche Bruderschaften", "Musikkapelle Felanitx", "Gläubige"], atmosphere: "Kerzen, Laternen und Trauermärsche", fullDesc: "Sobald der gemeinsame Applaus schließlich die Stille bricht, führen die Bruderschaften und die Musikkapelle von Felanitx die feierliche Prozession durch die dunklen Gassen der Stadt." }
      },
      timeline: [
        { year: "15.–19. Jahrhundert", title: "Mittelalterliche Wurzeln in der Kirche", text: "Die Kreuzabnahme-Spiele gehen auf das mittelalterliche geistliche Theater Mallorcas zurück. Über Jahrhunderte fand die Zeremonie im Inneren der Pfarrkirche Sant Miquel statt." },
        { year: "28. März 1975", title: "Erste Aufführung auf der Treppe von Sant Miquel", text: "Auf Initiative der Creuada de l'Amor Diví und engagierter Einwohner zog der Davallament erstmals ins Freie auf den Vorplatz und die große Treppe von Sant Miquel." },
        { year: "1980er–1990er Jahre", title: "Verwurzelung in der Gemeinde", text: "Die Beteiligung der Bevölkerung und das Publikumsinteresse wuchsen rasch. Ganze Familien wirkten bei Kostümen, Kulissen und Proben mit und machten den Abend zu einem Höhepunkt der Karwoche auf Mallorca." },
        { year: "2000–2024", title: "Szenische Weiterentwicklung", text: "Lichttechnik, Akustik und Regie wurden schrittweise modernisiert, ohne die traditionelle Schlichtheit zu verlieren. Nach der Pandemiepause stärkte die Rückkehr 2022 das Miteinander aller Generationen." },
        { year: "April 2025", title: "50. Jubiläum: ein historischer Meilenstein", text: "Felanitx feierte ein halbes Jahrhundert im Freien mit einem Jubiläumsplakat des weltberühmten aus Felanitx stammenden Künstlers Miquel Barceló. Unter der Regie von Joan Toni Sunyer und Marta Obrador auf sechs Bühnen, mit neuer Musik von Joan Martorell und erstmals live im Fernsehen auf IB3." },
        { year: "3. April 2026", title: "Festigung des Erbes auf der traditionellen Treppe", text: "Die Ausgabe 2026 rückte erneut die klassische Fassade und Treppe von Sant Miquel in den Mittelpunkt, begleitet von Joan Martorells Musik und rund 180 Mitwirkenden." }
      ],
      protagonists: [
        { role: "Initiatoren von 1975", name: "Creuada de l'Amor Diví & Pioniere von 1975", desc: "Die Pioniere, die am 28. März 1975 den historischen Schritt vom Kircheninneren auf die monumentale Treppe von Sant Miquel ermöglichten." },
        { role: "Regie zum 50. Jubiläum", name: "Joan Toni Sunyer & Marta Obrador", desc: "Verantwortlich für die dramaturgische und visuelle Erneuerung zum Jubiläum in Einklang mit der Tradition." },
        { role: "Plakat zum 50. Jubiläum", name: "Miquel Barceló", desc: "Der international renommierte Künstler aus Felanitx gestaltete das offizielle Motiv zum 50-jährigen Bestehen (2025)." },
        { role: "Originalmusik", name: "Joan Martorell", desc: "Komponist der eigens für Felanitx geschriebenen sinfonischen Filmmusik, heute fester Bestandteil der Aufführung." },
        { role: "Das Herz des Vereins", name: "Über 160 Einwohner, Bruderschaften & Musikkapelle", desc: "Laiendarsteller jeden Alters, Kostümbildner, Techniker, Bruderschaften und Musiker, die eine zu 100 % ehrenamtliche Tradition tragen." }
      ],
      news: {
        "presentacio-cartell-2026": {
          category: "Ausgabe 2026", date: "19. Februar 2026", readTime: "3 Min.",
          title: "Vorstellung des offiziellen Plakats zum Davallament de Felanitx 2026",
          excerpt: "Das Plakat zur Ankündigung des Davallament de Felanitx 2026 wurde vorgestellt – mit Fotografie von Sofia Binimelis Arias und Grafikdesign von Miquel Àngel Roig Maimó.",
          tags: ["Plakat 2026", "Sofia Binimelis Arias", "Joan Toni Sunyer"],
          body: [
            "Am Abend des 18. Februar 2026 wurde das offizielle Plakat für den Davallament de Felanitx 2026 vorgestellt – ein fotografisches Werk der Künstlerin Sofia Binimelis Arias, das mit Sensibilität und Ausdruckskraft das Wesen dieser tief verwurzelten Tradition einfängt.",
            "Das Grafikdesign des Plakats stammt von Miquel Àngel Roig Maimó.",
            "Nach dem 50. Jubiläum knüpft die Ausgabe 2026 an diesen Meilenstein an, mit besonderem Schwerpunkt auf der eigens komponierten Filmmusik sowie der Festigung der in den letzten Jahren eingeführten Neuerungen.",
            "Der Davallament de Felanitx findet am Karfreitag, dem 3. April 2026, um 21:00 Uhr auf dem Vorplatz der Pfarrkirche Sant Miquel unter der künstlerischen Leitung von Joan Toni Sunyer statt.",
            "Die Organisatoren dankten der Gemeinde Felanitx, dem Kulturzentrum, der Fundació Barceló und der Pfarrei Sant Miquel für ihre beständige Unterstützung."
          ]
        },
        "edicio-2026-escalinata": {
          category: "Berichte", date: "3. April 2026", readTime: "4 Min.",
          title: "Der Davallament de Felanitx bewegt in seiner 51. Ausgabe erneut die Gläubigen",
          excerpt: "In diesem Jahr fand die 51. Ausgabe auf der majestätischen Treppe vor der Pfarrkirche Sant Miquel statt – mit einem Rekord von 160 Darstellern zwischen 3 und fast 80 Jahren.",
          tags: ["51. Ausgabe", "Sant Miquel", "Karfreitag"],
          body: [
            "Nach der Sonderausgabe zum 50. Jubiläum im vergangenen Jahr kehrte die Aufführung an ihren angestammten Platz zurück: die unvergleichliche Treppe und der Vorplatz der Pfarrkirche Sant Miquel in Felanitx. Hunderte Zuschauer ließen sich erneut von der Leidenschaft und Tiefe des Spiels bewegen.",
            "Die Inszenierung schildert zentrale Stationen der Passion – vom Einzug in Jerusalem über das Letzte Abendmahl, Kaiphas, Ecce Homo, die Geißelung und Pilatus bis zur Kreuzigung und Kreuzabnahme auf dem Kirchenvorplatz. Jesus wurde in diesem Jahr von Bernat Monserrat und die Jungfrau Maria von Marta Obrador dargestellt.",
            "Mit 160 Laiendarstellern aus Felanitx im Alter von 3 bis fast 80 Jahren unter der Regie des Schauspielers Joan Toni Sunyer aus Manacor wurde erneut ein Beteiligungsrekord erreicht.",
            "Auch die Musik spielte eine prägende Rolle: Die sinfonische Originalmusik von Joan Martorell aus Porreres verlieh jeder Szene große Klangtiefe, begleitet von den einfühlsamen Lesungen von Maria Mascaró und Schauspieler Miquel Gelabert.",
            "Obwohl die Freilichtaufführung hier seit 51 Jahren stattfindet, reichen ihre Wurzeln im Kircheninneren bis ins Mittelalter zurück. Im Anschluss zog die feierliche Grablegungsprozession bis zum Kloster Sant Agustí."
          ]
        },
        "cinquantenari-2025-historic": {
          category: "50. Jubiläum", date: "19. April 2025", readTime: "5 Min.",
          title: "Ein historisches 50. Jubiläum: sechs Bühnen, Originalmusik und Live-Übertragung auf IB3",
          excerpt: "Felanitx feierte ein halbes Jahrhundert Freilichtaufführung mit einer beispiellosen Inszenierung auf der Plaça de sa Font de Santa Margalida.",
          tags: ["50. Jubiläum", "IB3 TV", "Jubiläum"],
          body: [
            "Fünfzig Jahre nach dem 28. März 1975 erlebte Felanitx eine unvergessliche Jubiläumsausgabe.",
            "Unter der Leitung von Joan Toni Sunyer und Marta Obrador erstreckte sich die Aufführung über sechs Bühnen rund um den Platz und brachte die neue Musik von Joan Martorell zur Uraufführung.",
            "Erstmals übertrug der balearische Fernsehsender IB3 die Aufführung live auf alle Inseln."
          ]
        },
        "cartell-miquel-barcelo": {
          category: "50. Jubiläum", date: "14. März 2025", readTime: "3 Min.",
          title: "Miquel Barceló gestaltet das Jubiläumsplakat für 50 Jahre Davallament",
          excerpt: "Der aus Felanitx stammende Künstler schenkte seiner Heimatstadt ein ausdrucksstarkes Werk zum Jubiläum.",
          tags: ["Miquel Barceló", "Kunst", "Plakat"],
          body: [
            "Bei der offiziellen Vorstellung des 50. Jubiläums wurde das vom international bekannten Künstler Miquel Barceló entworfene Plakat enthüllt.",
            "Die Associació El Davallament de Felanitx dankte öffentlich für diese großzügige Geste, die zeitgenössische Kunst mit einem halben Jahrhundert gelebter Tradition verbindet."
          ]
        }
      },
      board: {
        "presidencia": { role: "Vorsitz", name: "Wird aktualisiert", area: "Institutionelle Vertretung und Gesamtkoordination des Vereins." },
        "vicepresidencia": { role: "Stellvertretender Vorsitz", name: "Wird aktualisiert", area: "Unterstützung des Vorsitzes und Koordination der Arbeitsgruppen." },
        "secretaria": { role: "Schriftführung", name: "Wird aktualisiert", area: "Sitzungsprotokolle, Einladungen, Mitgliederregister und Kommunikation." },
        "tresoreria": { role: "Kassenführung", name: "Wird aktualisiert", area: "Finanzverwaltung, Haushalt und Förderkoordination." },
        "vocalia-escenografia": { role: "Bühnenbild & Kostüme", name: "Wird aktualisiert", area: "Pflege von Requisiten, historischen Kostümen und Aufbau in Sant Miquel." },
        "vocalia-comunicacio": { role: "Kommunikation & Archiv", name: "Wird aktualisiert", area: "Öffentlichkeitsarbeit, Webportal und Dokumentation." }
      },
      meetings: {
        "assemblea-general-2026": {
          title: "Ordentliche Mitgliederversammlung des Vereins",
          date: "Termin wird noch bekannt gegeben",
          time: "20:00 Uhr (1. Einberufung) · 20:30 Uhr (2. Einberufung)",
          location: "Centre Cultural de Felanitx",
          audience: "Alle Mitglieder und Unterstützer",
          summary: "Jahresrückblick auf die 51. Ausgabe des Davallament sowie Planung der Aktivitäten und Vorbereitungen für die nächste Karwoche.",
          agenda: [
            "Verlesung und Genehmigung des Protokolls der letzten Sitzung.",
            "Rückblick auf die Ausgabe des Davallament 2026.",
            "Kassenbericht und Jahresabschluss.",
            "Geplanter Proben-, Kostüm- und Vorbereitungsplan für die nächste Ausgabe.",
            "Verschiedenes und Fragen."
          ]
        },
        "reunio-participants-2026": {
          title: "Informationstreffen & Probenorganisation 2026",
          date: "Februar 2026",
          time: "20:00 Uhr",
          location: "Pfarrkirche Sant Miquel",
          audience: "Darstellerinnen, Darsteller, Kostümteam und Helfer",
          summary: "Auftakttreffen mit allen Mitwirkenden zur Abstimmung von Probenplänen, Kostümen und Szenenabläufen auf der Treppe.",
          agenda: [
            "Begrüßung neuer Mitwirkender und Rollenverteilung.",
            "Wöchentlicher Probenplan und Generalprobe.",
            "Anprobe und Ausgabe der Kostüme.",
            "Abstimmung von Licht, Ton und Aufbau."
          ]
        }
      },
      gallery: {
        "davallament-creu": { title: "Die Kreuzabnahme (El Davallament)", album: "El Davallament", year: "Aktuelle Ausgabe", location: "Hauptportal der Pfarrkirche Sant Miquel", caption: "Der Höhepunkt des Abends: Mit zwei Leitern und weißem Leinentuch wird der Leichnam Jesu unter blauem Licht vor dem Barockportal von Sant Miquel herabgelassen." },
        "cami-calvari-veronica": { title: "Der Fall unter dem Kreuz & Veronika", album: "Kreuzweg", year: "Aktuelle Ausgabe", location: "Oberer Vorplatz von Sant Miquel", caption: "Unter der Rosette der Pfarrkirche zeigt Veronika das Schweißtuch, während Jesus umgeben von römischen Soldaten und dem Volk von Felanitx unter dem Kreuz stürzt." },
        "armats-escalinata": { title: "Geleit der römischen Soldaten auf der Treppe", album: "Kreuzweg", year: "Aktuelle Ausgabe", location: "Marés-Sandsteintreppe von Sant Miquel", caption: "Die dramatische Spannung des Aufstiegs mit den römischen Soldaten, Lanzen und dem rötlichen Licht auf jeder Sandsteinstufe." },
        "judici-pilat-flagellacio": { title: "Das Urteil des Pontius Pilatus & die Geißelung", album: "Passion & Urteil", year: "Aktuelle Ausgabe", location: "Seitenbalkon & Treppe von Sant Miquel", caption: "Pontius Pilatus thront unter dem seitlichen Spitzbogen, während die Geißelung vor den Augen des Volkes stattfindet." }
      }
    }
  }
};
