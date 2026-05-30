/**
 * JEPA-Lab Explorer - Dynamic Sidebar & Menu Generator
 * Centralized navigation configuration and layout manager for GitHub Pages.
 */

// Sync and apply theme from localStorage immediately to prevent FOUC
(function () {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme');
    document.documentElement.className = theme;
    if (document.body) {
        document.body.className = theme;
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            document.body.className = theme;
        });
    }
})();

const MENU_CONFIG = [
    {
        title: "Portail",
        items: [
            {
                text: "Accueil Portail",
                link: "index.html",
                icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`
            }
        ]
    },
    {
        title: "Série I-JEPA",
        items: [
            { text: "1.1 La Malédiction des Pixels", link: "articles/article_1_partie_1.html" },
            { text: "1.2 Le Triptyque du SSL", link: "articles/article_1_partie_2.html" },
            { text: "1.3 L'Architecture I-JEPA", link: "articles/article_1_partie_3.html" },
            { text: "2.1 Découper l'image en Patches", link: "articles/article_2_partie_1.html" },
            { text: "2.2 Les Trois Composants Clés", link: "articles/article_2_partie_2.html" },
            { text: "2.3 La Boucle d'Entraînement & EMA", link: "articles/article_2_partie_3.html" },
            { text: "3.1 Pourquoi le Multi-Cibles ?", link: "articles/article_3_partie_1.html" },
            { text: "3.2 L'Astuce de Vectorisation Batch", link: "articles/article_3_partie_2.html" },
            { text: "3.3 Entraînement Multi-Cibles Complet", link: "articles/article_3_partie_3.html" },
            { text: "4.1 Protocole de Linear Probing", link: "articles/article_4_partie_1.html" },
            { text: "4.2 La Recette du Fine-Tuning Réussi", link: "articles/article_4_partie_2.html" },
            { text: "4.3 Analyse Comparative des Courbes", link: "articles/article_4_partie_3.html" },
            { text: "5.1 Attention du Predictor", link: "articles/article_5_partie_1.html" },
            { text: "5.2 Clustering Latent & Concepts", link: "articles/article_5_partie_2.html" },
            { text: "5.3 Cartes d'Influence de Classification", link: "articles/article_5_partie_3.html" },
            { text: "6.1 Identifier et Corriger le Collapse", link: "articles/article_6_partie_1.html" },
            { text: "6.2 Ajuster le Ratio de Masquage", link: "articles/article_6_partie_2.html" },
            { text: "6.3 Hyperparamètres & Extensions", link: "articles/article_6_partie_3.html" },
            { text: "🏆 Synthèse : Verdict Empirique & Débat Scientifique", link: "articles/article_conclusion.html" }
        ]
    },
    {
        title: "Série Saccadic-JEPA",
        items: [
            { text: "7.1 Anatomie de la Rétine Humaine", link: "articles/article_7_partie_1.html" },
            { text: "7.2 Économie d'Énergie & Cortex Visuel", link: "articles/article_7_partie_2.html" },
            { text: "7.3 Algorithme de Fovéation en NumPy", link: "articles/article_7_partie_3.html" },
            { text: "8.1 Concept du Saccadic-JEPA", link: "articles/article_8_partie_1.html" },
            { text: "8.2 Fovéation GPU en PyTorch", link: "articles/article_8_partie_2.html" },
            { text: "8.3 Entraînement SSL Haute Résolution", link: "articles/article_8_partie_3.html" },
            { text: "9.1 Data Efficiency avec 1% de labels", link: "articles/article_9_partie_1.html" },
            { text: "9.2 Impact du Nombre de Jetons & Résolution", link: "articles/article_9_partie_2.html" },
            { text: "9.3 Linear Probing vs Fine-Tuning", link: "articles/article_9_partie_3.html" },
            { text: "🏁 Résumé : Le Grand Match de Benchmarks", link: "articles/article_9.html" }
        ]
    },

    {
        title: "Crédits",
        items: [
            { text: "🤝 Crédits & Partenaires", link: "credits.html" }
        ]
    }
];

document.addEventListener("DOMContentLoaded", function () {
    renderSidebar();
    initMobileToggle();
});

function renderSidebar() {
    const sidebarContainer = document.getElementById("app-sidebar");
    if (!sidebarContainer) {
        console.error("Element #app-sidebar not found in DOM");
        return;
    }

    // Determine path depth (whether we are in articles/ or root docs/)
    const currentPath = window.location.pathname;
    const isArticlePage = currentPath.includes('/articles/');
    const basePath = isArticlePage ? '../' : '';

    // Generate brand/logo header HTML
    let sidebarHtml = `
        <div class="sidebar-brand">
            <a href="${basePath}index.html" class="sidebar-brand-link">
                <div class="sidebar-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <defs>
                            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="var(--accent-teal)" />
                                <stop offset="100%" stop-color="var(--accent-purple)" />
                            </linearGradient>
                        </defs>
                        <circle cx="12" cy="12" r="10" stroke="url(#logo-grad)" stroke-width="1.5" stroke-dasharray="3 2" />
                        <path d="M12 5v14M5 12h14M8.5 8.5l7 7M8.5 15.5l7-7" stroke="currentColor" stroke-width="0.75" opacity="0.3" />
                        <polygon points="12,4 15,12 12,10 9,12" fill="url(#logo-grad)" stroke="none" />
                        <polygon points="12,20 15,12 12,14 9,12" fill="currentColor" opacity="0.25" stroke="none" />
                        <circle cx="12" cy="4" r="1.5" fill="var(--accent-teal)" stroke="none" />
                        <circle cx="12" cy="20" r="1.5" fill="var(--accent-purple)" stroke="none" />
                        <circle cx="5" cy="12" r="1.5" fill="var(--accent-blue)" stroke="none" />
                        <circle cx="19" cy="12" r="1.5" fill="var(--accent-teal)" stroke="none" />
                        <circle cx="12" cy="12" r="2" fill="url(#logo-grad)" stroke="none" />
                    </svg>
                </div>
                <div class="sidebar-title">Tinkerer's Lab</div>
            </a>
            <button class="menu-toggle" id="menu-close-btn" style="display:none; margin-left:auto;">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div class="sidebar-nav">
    `;

    // Extract current file name for highlighting active menu item
    const currentFile = currentPath.split('/').pop() || 'index.html';

    // Loop through menu categories
    MENU_CONFIG.forEach(section => {
        sidebarHtml += `
            <div class="nav-section">
                <div class="nav-section-title">${section.title}</div>
                <ul class="nav-list">
        `;

        section.items.forEach(item => {
            // Resolve relative link
            let resolvedLink = '';
            if (item.link.startsWith('articles/')) {
                resolvedLink = isArticlePage ? item.link.replace('articles/', '') : item.link;
            } else {
                // root level files like index.html or credits.html
                resolvedLink = isArticlePage ? '../' + item.link : item.link;
            }

            // Check if link is active
            const linkFile = item.link.split('/').pop();
            const isActive = (currentFile === linkFile);
            const activeClass = isActive ? 'active' : '';

            // Optional icon
            const iconHtml = item.icon ? item.icon : '';

            sidebarHtml += `
                <li>
                    <a href="${resolvedLink}" class="nav-item-link ${activeClass}">
                        ${iconHtml}${item.text}
                    </a>
                </li>
            `;
        });

        sidebarHtml += `
                </ul>
            </div>
        `;
    });

    sidebarHtml += `
        </div>
    `;

    // Inject generated HTML
    sidebarContainer.innerHTML = sidebarHtml;
}

function initMobileToggle() {
    const sidebar = document.getElementById("app-sidebar");
    const openBtn = document.getElementById("menu-open-btn");

    // Delegate mobile toggle bindings
    if (openBtn && sidebar) {
        openBtn.addEventListener('click', function () {
            sidebar.classList.add('open');
        });
    }

    // Since the close button is dynamic inside the sidebar, we use event delegation on #app-sidebar
    if (sidebar) {
        sidebar.addEventListener('click', function (e) {
            const closeBtn = e.target.closest('#menu-close-btn');
            if (closeBtn) {
                sidebar.classList.remove('open');
            }
        });
    }
}
