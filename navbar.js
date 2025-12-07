// Function to load the navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const template = document.createElement('div');
            template.innerHTML = data;
            const navbarContent = template.querySelector('#navbar-template').content.cloneNode(true);
            document.getElementById('navbar-container').appendChild(navbarContent);
            // Add small archive/version switch dropdown in top-left corner
            if (!document.getElementById('archive-switch')) {
                const container = document.createElement('div');
                container.id = 'archive-switch-container';

                const select = document.createElement('select');
                select.id = 'archive-switch';
                select.setAttribute('aria-label', 'Choisir la version du site');

                const opt2026 = document.createElement('option');
                opt2026.value = 'index.html';
                opt2026.textContent = '2026';

                const opt2025 = document.createElement('option');
                opt2025.value = '2025/index.html';
                opt2025.textContent = '2025';

                select.appendChild(opt2026);
                select.appendChild(opt2025);

                // Select current version based on path
                if (location.pathname.includes('/2025/')) {
                    select.value = '2025/index.html';
                } else {
                    select.value = 'index.html';
                }

                select.addEventListener('change', (e) => {
                    const val = e.target.value;
                    if (val) window.location.href = val;
                });

                container.appendChild(select);
                document.body.appendChild(container);
            }
        })
        .catch(error => {
            console.warn('Error loading the navbar via fetch; inserting fallback navbar. Error:', error);
            // Fallback navbar HTML (used when fetch() is blocked, e.g. file:// previews)
            const fallback = `
<template id="navbar-template">
    <div>
        <img src="Header.png" alt="Placeholder title image" class="header-image"></img>
    </div>
    <br>
    <nav id="navbar">
        <li> <a href="index.html">Accueil</a></li>
        <li><a href="Inscription.html">Inscription</a></li>
        <li id="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Information</a>
            <div id="dropdown-content">
                <a href="Règlements.html">Règlements</a>
                <a href="Notation.html">Notation</a>
                <a href="Hébergement.html">Hébergement</a>
                <a href="Horaire.html">Horaire</a>
                <a href="Transport.html">Transport</a>
                <a href="Repas.html">Repas</a>
            </div>
        </li>
        <li><a href="Diffusion.html">Diffusion</a></li>
    </nav>
</template>
`;

            const container = document.createElement('div');
            container.innerHTML = fallback;
            const navbarContent = container.querySelector('#navbar-template').content.cloneNode(true);
            document.getElementById('navbar-container').appendChild(navbarContent);
            // Add small archive/version switch dropdown in top-left corner (fallback path)
            if (!document.getElementById('archive-switch')) {
                const container = document.createElement('div');
                container.id = 'archive-switch-container';

                const select = document.createElement('select');
                select.id = 'archive-switch';
                select.setAttribute('aria-label', 'Choisir la version du site');

                const opt2026 = document.createElement('option');
                opt2026.value = 'index.html';
                opt2026.textContent = '2026';

                const opt2025 = document.createElement('option');
                opt2025.value = '2025/index.html';
                opt2025.textContent = '2025';

                select.appendChild(opt2026);
                select.appendChild(opt2025);

                if (location.pathname.includes('/2025/')) {
                    select.value = '2025/index.html';
                } else {
                    select.value = 'index.html';
                }

                select.addEventListener('change', (e) => {
                    const val = e.target.value;
                    if (val) window.location.href = val;
                });

                container.appendChild(select);
                document.body.appendChild(container);
            }
        });
}

// Call the function to load the navbar when the page loads
document.addEventListener('DOMContentLoaded', loadNavbar);

            // Create the small archive/version switch (robust — run regardless of fetch outcome)
            function createArchiveSwitch() {
                if (document.getElementById('archive-switch')) return;
                const container = document.createElement('div');
                container.id = 'archive-switch-container';

                const select = document.createElement('select');
                select.id = 'archive-switch';
                select.setAttribute('aria-label', 'Choisir la version du site');

                const opt2026 = document.createElement('option');
                opt2026.value = 'index.html';
                opt2026.textContent = '2026';

                const opt2025 = document.createElement('option');
                opt2025.value = '2025/index.html';
                opt2025.textContent = '2025';

                select.appendChild(opt2026);
                select.appendChild(opt2025);

                if (location.pathname.includes('/2025/')) {
                    select.value = '2025/index.html';
                } else {
                    select.value = 'index.html';
                }

                select.addEventListener('change', (e) => {
                    const val = e.target.value;
                    if (val) window.location.href = val;
                });

                container.appendChild(select);
                document.body.appendChild(container);
            }
