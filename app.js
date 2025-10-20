// ========= Vitrino dos Links — JS (versão fácil de editar) =========

// =================== CONFIGURÁVEL ===================
// Edite aqui seus conteúdos (sem backend, só código!):
const DATA = {
    listasML: [
        {
            titulo: "Memória RAM DDR5 6000 MHz",
            desc: "Seleção de módulos DDR5 6000 MHz para upgrade.",
            href: "https://lista.mercadolivre.com.br/sua-lista-ram-6000"
        },
        {
            titulo: "SSDs NVMe Gen4",
            desc: "SSDs rápidos para jogos e edição.",
            href: "https://lista.mercadolivre.com.br/sua-lista-ssd-gen4"
        },
        {
            titulo: "Placas de Vídeo Custo/Benefício",
            desc: "Minha curadoria de GPUs acessíveis.",
            href: "https://lista.mercadolivre.com.br/sua-lista-gpu"
        }
    ],

    // 3 formas de adicionar vídeos:
    // A) Cole o IFRAME completo do YouTube (uso exatamente como veio)
    // B) Cole a URL normal do YouTube (eu converto para <iframe>)
    // C) Cole apenas o ID (ex.: "6p6cZx7RUII")
    //
    // Seu iframe já incluído aqui (forma A):
    


    // Se preferir por URL ou ID, use estes arrays (opcionais):
    videosUrls: [
        // "https://www.youtube.com/watch?v=VIDEO_ID_AQUI"
    ],
    videosIds: [
        // "VIDEO_ID_AQUI"
    ],

    envios: [
        { tag: "ML", text: "Memória DDR5 6000 — kit recomendado", href: "https://lista.mercadolivre.com.br/seu-envio-mais-recente-1" },
        { tag: "YT", text: "Review rápido: upgrade de RAM no Nitro V15", href: "https://www.youtube.com/watch?v=6p6cZx7RUII" },
        { tag: "ML", text: "SSDs NVMe em oferta", href: "https://lista.mercadolivre.com.br/outro-link" }
    ],

    playlists: [
        { text: "AM5 & DDR5", href: "https://www.youtube.com/playlist?list=PLAYLIST_ID_1" },
        { text: "Notebooks Gamer", href: "https://www.youtube.com/playlist?list=PLAYLIST_ID_2" },
        { text: "Custo/Benefício ML", href: "https://www.youtube.com/playlist?list=PLAYLIST_ID_3" }
    ]
};
// ================= FIM CONFIGURÁVEL =================
// 2.1) NOVO formato (recomendado) — adicione no seu DATA:
DATA.videos = [
    {
        source: `<iframe width="560" height="315" src="https://www.youtube.com/embed/6p6cZx7RUII?si=DDmr2HfJUBRpdBqh"
               title="Quanto custa um PC AM5 DDR5? Vale a pena?"
               frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        title: "Quanto custa um PC AM5 DDR5? Vale a pena?",
        // opcional: se não informar, eu gero pelo ID
        url: "https://www.youtube.com/watch?v=6p6cZx7RUII"
    },{
        
    source: `<iframe width="560" height="315" src="https://www.youtube.com/embed/E2kwWj22Cos?si=CouHeZU3zJpXpKZ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    title:"Comprei meu Primeiro Notebook Gamer Custo Beneficio - Acer Nitro V15 RTX 3050 UNBOXING",
    url: "https://youtu.be/E2kwWj22Cos"
    }
    // pode adicionar mais vídeos aqui (source pode ser iframe, URL normal ou só o ID)
];


// ============== Utilidades de vídeo ==============
function ytIdFromUrl(url) {
    if (!url) return null;
    const m1 = url.match(/[?&]v=([^&]+)/);           // ?v=ID
    if (m1) return m1[1];
    const m2 = url.match(/\/embed\/([^?&/]+)/);      // /embed/ID
    if (m2) return m2[1];
    const m3 = url.match(/shorts\/([^?&/]+)/);       // /shorts/ID
    if (m3) return m3[1];
    if (/^[a-zA-Z0-9_-]{8,}$/.test(url)) return url;  // só o ID
    return null;
}

function buildIframeFromId(id) {
    const src = `https://www.youtube.com/embed/${id}`;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    return iframe;
}

function normalizeIframe(htmlOrUrlOrId) {
    // A) Se veio um IFRAME completo, uso ele
    if (/<\s*iframe[^>]*>/.test(htmlOrUrlOrId)) {
        const wrap = document.createElement('div');
        wrap.innerHTML = htmlOrUrlOrId.trim();
        const iframe = wrap.querySelector('iframe');
        if (!iframe) return null;
        // removo width/height para respeitar o container 16:9
        iframe.removeAttribute('width');
        iframe.removeAttribute('height');
        return iframe;
    }
    // B/C) URL ou ID
    const id = ytIdFromUrl(htmlOrUrlOrId);
    if (id) {
        return buildIframeFromId(id);
    }
    return null;
}


// ============== Renderização das seções ==============
function renderListas() {
    const grid = document.querySelector('#listas-ml .card-grid');
    if (!grid) return;
    grid.innerHTML = DATA.listasML.map(item => `
    <article class="card">
      <h3>${item.titulo}</h3>
      <p>${item.desc}</p>
      <a class="button" target="_blank" rel="noopener" href="${item.href}">Abrir no Mercado Livre</a>
    </article>
  `).join('');
}

// 2.2) SUBSTITUA sua função renderVideos() por esta:
function renderVideos() {
    const vgrid = document.querySelector('#videos .video-grid');
    if (!vgrid) return;

    // junta fontes: PRIORIDADE -> DATA.videos (objetos) | depois os arrays antigos
    const items = [];

    // A) novo formato com título/link
    (DATA.videos || []).forEach(v => items.push(v));

    // B) compat: iframes puros
    (DATA.videosIframes || []).forEach(html => items.push({ source: html, title: "" }));
    // C) compat: URLs
    (DATA.videosUrls || []).forEach(url => items.push({ source: url, title: "" }));
    // D) compat: IDs
    (DATA.videosIds || []).forEach(id => items.push({ source: id, title: "" }));

    vgrid.innerHTML = '';

    items.forEach(item => {
        // cria iframe a partir de iframe/url/id
        const iframe = normalizeIframe(item.source);
        if (!iframe) return;

        // tenta obter ID -> gera URL watch se não veio
        let id = null;
        const src = iframe.getAttribute('src') || '';
        id = ytIdFromUrl(src) || ytIdFromUrl(item.source);
        const watchUrl = item.url || (id ? `https://www.youtube.com/watch?v=${id}` : null);

        // usa o título informado ou o title do iframe como fallback
        const titleText = item.title && item.title.trim()
            ? item.title.trim()
            : (iframe.getAttribute('title') || 'Assistir no YouTube');

        // monta o card
        const card = document.createElement('article');
        card.className = 'video-card';

        const ratio = document.createElement('div');
        ratio.className = 'video-embed ratio-16x9';
        ratio.appendChild(iframe);

        const meta = document.createElement('div');
        meta.className = 'video-meta';

        const h3 = document.createElement('h3');
        h3.className = 'video-title';

        if (watchUrl) {
            const a = document.createElement('a');
            a.href = watchUrl;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = titleText;
            h3.appendChild(a);
        } else {
            h3.textContent = titleText;
        }

        meta.appendChild(h3);
        card.appendChild(ratio);
        card.appendChild(meta);
        vgrid.appendChild(card);
    });
}


function renderEnvios() {
    const elist = document.querySelector('#envios .card-list');
    if (!elist) return;
    elist.innerHTML = DATA.envios.map(e => `
    <a class="list-item" target="_blank" rel="noopener" href="${e.href}">
      <span class="tag">${e.tag}</span>
      <span class="text">${e.text}</span>
    </a>
  `).join('');
}

function renderPlaylists() {
    const pgrid = document.querySelector('#playlists .pill-grid');
    if (!pgrid) return;
    pgrid.innerHTML = DATA.playlists.map(p => `
    <a class="pill" target="_blank" rel="noopener" href="${p.href}">${p.text}</a>
  `).join('');
}

function renderAll() {
    renderListas();
    renderVideos();
    renderEnvios();
    renderPlaylists();
}


// ============== UX básica (navbar, scroll, ano) ==============
(function menuMobile() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
})();

(function smoothScrollCompensado() {
    const header = document.querySelector('.site-header');
    const links = document.querySelectorAll('a[href^="#"]');
    if (!header || !links.length) return;
    const headerH = () => header.getBoundingClientRect().height;

    links.forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            const y = target.getBoundingClientRect().top + window.scrollY - headerH() - 8;
            window.scrollTo({ top: y, behavior: 'smooth' });
            history.pushState(null, '', id);
        });
    });
})();

(function anoRodape() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
})();


// ============== Inicialização ==============
window.addEventListener('DOMContentLoaded', renderAll);


// ============== API rápida para você colar coisas ==============
// Use no console do navegador ou em scripts inline no HTML:

// 1) Para colar um iframe bruto:
window.ADD_VIDEO_IFRAME = function (html) {
    if (!DATA.videosIframes) DATA.videosIframes = [];
    DATA.videosIframes.push(html);
    renderVideos();
};

// 2) Para colar só a URL (watch/shorts) ou só o ID:
window.ADD_VIDEO = function (urlOrId) {
    const node = normalizeIframe(urlOrId);
    if (!node) return;
    if (!DATA.videosIframes) DATA.videosIframes = [];
    const div = document.createElement('div'); div.appendChild(node);
    DATA.videosIframes.push(div.innerHTML); // guardo como html de iframe
    renderVideos();
};
