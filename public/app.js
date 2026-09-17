// ===== Marginalia · lógica del frontend ==================================
// Pide el catálogo al backend (/api/books), pinta las tarjetas y gestiona
// búsqueda, filtros por género y orden. Bartleby, el libro de la casa,
// lee una cita cada vez que alguien le hace clic.

// --- Citas: pocas y muy buenas. Las de atribución dudosa van marcadas. ---
const CITAS = [
  { f: "Lo esencial es invisible a los ojos.", o: "Antoine de Saint-Exupéry · El Principito" },
  { f: "Me pregunto si las estrellas se iluminan con el fin de que algún día, cada uno pueda encontrar la suya.", o: "Antoine de Saint-Exupéry · El Principito" },
  { f: "En tiempos de engaño universal, decir la verdad es un acto revolucionario.", o: "atribuida a George Orwell" },
  { f: "Si la libertad significa algo, será, sobre todo, el derecho a decirle a la gente aquello que no quiere oír.", o: "George Orwell · prólogo de Rebelión en la granja" },
  { f: "La libertad es poder decir libremente que dos y dos son cuatro.", o: "George Orwell · 1984" },
  { f: "Quien controla el pasado controla el futuro; quien controla el presente controla el pasado.", o: "George Orwell · 1984" },
  { f: "Es mejor errar del lado de la audacia que del lado de la cautela.", o: "Alvin Toffler" },
  { f: "Un libro debe ser el hacha que rompa el mar helado que llevamos dentro.", o: "Franz Kafka · carta a Oskar Pollak" },
  { f: "En medio del invierno, aprendí por fin que había en mí un verano invencible.", o: "Albert Camus · El verano" },
  { f: "Hay que imaginarse a Sísifo feliz.", o: "Albert Camus · El mito de Sísifo" },
  { f: "Quien tiene un porqué para vivir puede soportar casi cualquier cómo.", o: "Friedrich Nietzsche · El crepúsculo de los ídolos" },
  { f: "Cuando miras largo tiempo al abismo, el abismo también mira dentro de ti.", o: "Friedrich Nietzsche · Más allá del bien y del mal" },
  { f: "Cuando ya no podemos cambiar una situación, tenemos el desafío de cambiarnos a nosotros mismos.", o: "Viktor Frankl · El hombre en busca de sentido" },
  { f: "No nos atrevemos a muchas cosas porque son difíciles, pero son difíciles porque no nos atrevemos.", o: "Séneca · Cartas a Lucilio" },
  { f: "La felicidad de tu vida depende de la calidad de tus pensamientos.", o: "Marco Aurelio · Meditaciones" },
  { f: "No hay barrera, cerradura ni cerrojo que puedas imponer a la libertad de mi mente.", o: "Virginia Woolf · Una habitación propia" },
  { f: "Siempre imaginé que el Paraíso sería algún tipo de biblioteca.", o: "Jorge Luis Borges" },
  { f: "Caminante, no hay camino: se hace camino al andar.", o: "Antonio Machado · Proverbios y cantares" },
  { f: "Nada está perdido si se tiene el valor de proclamar que todo está perdido y hay que empezar de nuevo.", o: "Julio Cortázar · Rayuela" },
  { f: "La literatura es la prueba de que la vida no basta.", o: "Fernando Pessoa" },
  { f: "La triste verdad es que la mayor parte del mal lo hacen personas que nunca se deciden a ser buenas o malas.", o: "Hannah Arendt" },
  { f: "Sucedió, por lo tanto puede volver a suceder.", o: "Primo Levi · Los hundidos y los salvados" },
  { f: "Somos el medio para que el cosmos se conozca a sí mismo.", o: "Carl Sagan · Cosmos" },
  { f: "No puedes comprar la revolución. No puedes hacer la revolución. Solo puedes ser la revolución.", o: "Ursula K. Le Guin · Los desposeídos" },
  { f: "No todos los que vagan están perdidos.", o: "J. R. R. Tolkien · El Señor de los Anillos" },
  { f: "El miedo es el asesino de la mente.", o: "Frank Herbert · Dune" },
  { f: "Dentro de nosotros hay algo que no tiene nombre; esa cosa es lo que somos.", o: "José Saramago · Ensayo sobre la ceguera" },
  { f: "La libertad, Sancho, es uno de los más preciosos dones que a los hombres dieron los cielos.", o: "Miguel de Cervantes · Don Quijote de la Mancha" },
  { f: "Una vida no vale nada, pero nada vale una vida.", o: "André Malraux · La condición humana" },
  { f: "Hay que llevar todavía caos dentro de sí para poder dar a luz una estrella danzarina.", o: "Friedrich Nietzsche · Así habló Zaratustra" },
  { f: "El secreto de la existencia humana no está solo en vivir, sino en saber para qué se vive.", o: "Fiódor Dostoievski · Los hermanos Karamázov" },
  { f: "La belleza salvará al mundo.", o: "Fiódor Dostoievski · El idiota" },
  { f: "Ten paciencia con todo lo que está sin resolver en tu corazón, e intenta amar las preguntas mismas.", o: "Rainer Maria Rilke · Cartas a un joven poeta" },
  { f: "No son las cosas las que atormentan a los hombres, sino la opinión que tienen de ellas.", o: "Epicteto · Enquiridión" },
  { f: "Todo lo que oímos es una opinión, no un hecho. Todo lo que vemos es una perspectiva, no la verdad.", o: "atribuida a Marco Aurelio" },
  { f: "Sabemos lo que somos, pero no lo que podemos llegar a ser.", o: "William Shakespeare · Hamlet" },
  { f: "Estamos hechos de la misma materia que los sueños.", o: "William Shakespeare · La tempestad" },
  { f: "Fui a los bosques porque quería vivir deliberadamente… y no descubrir, en el momento de morir, que no había vivido.", o: "Henry David Thoreau · Walden" },
  { f: "Habito la posibilidad.", o: "Emily Dickinson" },
  { f: "Quienes no recuerdan el pasado están condenados a repetirlo.", o: "George Santayana · La vida de la razón" },
  { f: "Mientras somos, la muerte no es; cuando la muerte es, nosotros no somos.", o: "Epicuro · Carta a Meneceo" },
  { f: "Vivir es lo más raro del mundo: la mayoría de la gente solo existe.", o: "atribuida a Oscar Wilde" },
  { f: "Preferiría no hacerlo.", o: "Herman Melville · «Bartleby, el escribiente»" }
];

// --- Estado ---
let libros = [];
let filtroGenero = "Todos";
let textoBusqueda = "";
let orden = "balda";

// --- Utilidades ---
const $ = (sel) => document.querySelector(sel);

// Compara ignorando mayúsculas y tildes ("heroe" encuentra "héroe").
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// --- Render del catálogo ---
function tarjetaHTML(libro, i) {
  const etiqueta = libro.nota
    ? `<span class="etiqueta-mano">${libro.nota}</span>`
    : "";
  // La portada real va encima del texto; si la imagen falla, onerror la quita
  // y queda visible la cubierta generada (título + autor sobre fondo neutro).
  const portada = libro.cover
    ? `<img class="cara-img" src="${libro.cover}" alt="" loading="lazy" onerror="this.remove()">`
    : "";
  // Entrada escalonada: cada tarjeta aparece un pelín después que la anterior.
  const retardo = Math.min(i, 12) * 45;
  return `
    <article class="tarjeta${libro.nota ? " con-etiqueta" : ""}" style="animation-delay:${retardo}ms">
      <div class="cubierta">
        <p class="t">${libro.title}</p>
        <p class="a">${libro.author}</p>
        ${portada}
        ${etiqueta}
      </div>
      <div class="t-datos">
        <h3>${libro.title}</h3>
        <p class="autor">${libro.author} · ${libro.year}</p>
        <p class="t-meta">
          <span class="estrellas">★ ${libro.rating.toFixed(1)}</span>
          <span class="genero">${libro.genre}</span>
        </p>
        <p class="desc">${libro.description}</p>
      </div>
    </article>`;
}

function render() {
  const q = normalizar(textoBusqueda.trim());

  let visibles = libros.filter((libro) => {
    const coincideGenero = filtroGenero === "Todos" || libro.genre === filtroGenero;
    const coincideTexto =
      q === "" ||
      normalizar(libro.title).includes(q) ||
      normalizar(libro.author).includes(q);
    return coincideGenero && coincideTexto;
  });

  if (orden === "valoracion") visibles.sort((a, b) => b.rating - a.rating);
  if (orden === "anio") visibles.sort((a, b) => a.year - b.year);
  if (orden === "titulo") visibles.sort((a, b) => a.title.localeCompare(b.title, "es"));

  $("#grid").innerHTML = visibles.map(tarjetaHTML).join("");
  $("#vacio").hidden = visibles.length > 0;
  $("#contador").textContent =
    visibles.length === libros.length
      ? `${libros.length} títulos en la colección`
      : `${visibles.length} de ${libros.length} títulos`;
}

// --- Chips de género (generados a partir de los datos) ---
function pintarChips() {
  const generos = ["Todos", ...new Set(libros.map((l) => l.genre))];
  $("#chips").innerHTML = generos
    .map(
      (g) =>
        `<button type="button" class="chip${g === filtroGenero ? " activo" : ""}" data-genero="${g}">${g}</button>`
    )
    .join("");
}

$("#chips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  filtroGenero = chip.dataset.genero;
  pintarChips();
  render();
});

$("#busca").addEventListener("input", (e) => {
  textoBusqueda = e.target.value;
  render();
});

$("#form-busca").addEventListener("submit", (e) => e.preventDefault());

$("#orden").addEventListener("change", (e) => {
  orden = e.target.value;
  render();
});

// --- Bartleby y las citas ---
// Baraja: no se repite ninguna cita hasta que hayan salido todas.
let mazo = [];
let ultimaFrase = "";

function siguienteCita() {
  if (mazo.length === 0) {
    mazo = [...CITAS];
    for (let i = mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    // Evita que la primera del mazo nuevo repita la última mostrada.
    if (mazo[mazo.length - 1].f === ultimaFrase && mazo.length > 1) {
      [mazo[0], mazo[mazo.length - 1]] = [mazo[mazo.length - 1], mazo[0]];
    }
  }
  const cita = mazo.pop();
  ultimaFrase = cita.f;
  return cita;
}

const bartleby = $("#bartleby");
let cerrador = null;

bartleby.addEventListener("click", () => {
  if (bartleby.classList.contains("abierto")) {
    bartleby.classList.remove("abierto");
    clearTimeout(cerrador);
    return;
  }
  const cita = siguienteCita();
  $("#cita-frase").textContent = `«${cita.f}»`;
  $("#cita-fuente").textContent = `— ${cita.o}`;
  bartleby.classList.add("abierto");
  clearTimeout(cerrador);
  cerrador = setTimeout(() => bartleby.classList.remove("abierto"), 7000);
});

// --- Tema día / noche (se recuerda entre visitas) ---
const btnTema = $("#tema");

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  btnTema.textContent = tema === "noche" ? "☀ Día" : "☾ Noche";
  try { localStorage.setItem("tema", tema); } catch {}
}

let temaInicial = "dia";
try {
  temaInicial =
    localStorage.getItem("tema") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "noche" : "dia");
} catch {}
aplicarTema(temaInicial);

btnTema.addEventListener("click", () => {
  aplicarTema(document.documentElement.dataset.tema === "noche" ? "dia" : "noche");
});

// --- Arranque: pedir el catálogo al backend ---
fetch("/api/books")
  .then((res) => res.json())
  .then((datos) => {
    libros = datos;
    pintarChips();
    render();
  })
  .catch(() => {
    $("#contador").textContent = "No se pudo cargar el catálogo. ¿Está el servidor en marcha?";
  });
