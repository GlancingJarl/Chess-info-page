// Function to load the navbar (2025 copy) with fallback for file:// previews
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const template = document.createElement('div');
            template.innerHTML = data;
            const navbarContent = template.querySelector('#navbar-template').content.cloneNode(true);
            document.getElementById('navbar-container').appendChild(navbarContent);
        })
        .catch(error => {
            console.warn('2025 navbar fetch failed; inserting fallback. Error:', error);
            const fallback = `
<template id="navbar-template">
    <div>
        <img src="img/Header.png" alt="Placeholder title image" class="header-image"></img>
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
        <li><a href="../index.html">Return to 2026</a></li>
    </nav>
</template>
`;
            const container = document.createElement('div');
            container.innerHTML = fallback;
            const navbarContent = container.querySelector('#navbar-template').content.cloneNode(true);
            document.getElementById('navbar-container').appendChild(navbarContent);
        });
}

document.addEventListener('DOMContentLoaded', loadNavbar);
