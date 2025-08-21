// ====================== DATOS DE EJEMPLO ======================
const COMPARATIVAS = [
	{
		id: "cmp-zapatillas-2025",
		title: "Zapatillas de deporte",
		category: "ropa",
		lastUpdated: "21-08-2025",
		summary: "Comparativa de zapatillas de deporte ...",
		heroImage: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnocorrasvuela.com%2Fwp-content%2Fuploads%2F2015%2F06%2Fmusculos-del-corredor.jpg&f=1&nofb=1&ipt=047b12cac53e067549669c8bb99074a7670866b917a55402ba08aa8b5f70cc94",
		link: "zapas.html"
	},

	{
		id: "cmp-pantalones-2025",
		title: "Pantalones de deporte",
		category: "ropa",
		lastUpdated: "21-08-2025",
		summary: "Comparativa de pantalones de deporte ...",
		heroImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzLpgthjSS7OPNN0d67DGXJnuv6aI3l_v8pg&s",
		link: "pantsdep.html"
	},

];

// Categorías
const CATEGORIES = [
	{ key: "ropa", label: "Ropa" },
	{ key: "accesorios", label: "Accesorios" },
	{ key: "electronica", label: "Electrónica" },
	{ key: "hogar", label: "Hogar" }
];

// Estado inicial
const state = {
	query: "",
	selectedCats: new Set(CATEGORIES.map(c => c.key)),
};

// Atajo para querySelector
function $(s, r=document) { return r.querySelector(s); }

// Devuelve etiqueta legible de categoría
function labelFromCategory(key) {
	const c = CATEGORIES.find(x => x.key === key);
	return c ? c.label : key;
}

// Renderiza filtros
function renderFilters() {
	const cont = $('#filters');
	cont.innerHTML = '';
	CATEGORIES.forEach(cat => {
		const btn = document.createElement('button');
		btn.className = 'pill' + (state.selectedCats.has(cat.key) ? ' active' : '');
		btn.textContent = cat.label;
		btn.addEventListener('click', () => {
			if (state.selectedCats.has(cat.key)) state.selectedCats.delete(cat.key);
			else state.selectedCats.add(cat.key);
			renderFilters();
			renderGrid();
		});
		cont.appendChild(btn);
	});
}

// Devuelve comparativas filtradas
function getFiltered() {
	let arr = COMPARATIVAS.filter(c => state.selectedCats.has(c.category));
	if (state.query) {
		arr = arr.filter(c =>
			c.title.toLowerCase().includes(state.query.toLowerCase()) ||
			c.summary.toLowerCase().includes(state.query.toLowerCase())
		);
	}
	return arr;
}

// Pinta las tarjetas en la rejilla
function renderGrid() {
	const data = getFiltered();
	const grid = $('#grid');
	const empty = $('#emptyState');
	grid.innerHTML = '';
	empty.hidden = data.length > 0;

	data.forEach(c => {
	const card = document.createElement('a');
        card.className = 'card padded clickable';
        card.href = c.link;        // URL a la que quieres ir
        card.target = "_blank";    // opcional, abre en nueva pestaña

    card.innerHTML = `
        <img src="${c.heroImage}" alt="${c.title}">
        <div class="title">
            <h3>${c.title}</h3>
            <span class="badge">${labelFromCategory(c.category)}</span>
        </div>
        <p class="summary">${c.summary}</p>
        <div class="meta">Actualizado: ${c.lastUpdated} </div>
    `;


		grid.appendChild(card);
	});
}

// Inicializa la página
function init() {
	renderFilters();
	renderGrid();
	$('#year').textContent = new Date().getFullYear();
	$('#searchInput').addEventListener('input', e => {
		state.query = e.target.value;
		renderGrid();
	});
}

document.addEventListener('DOMContentLoaded', init);
