// Function to load the navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            const template = document.createElement('div');
            template.innerHTML = data;
            const navbarContent = template.querySelector('#navbar-template').content.cloneNode(true);
            document.getElementById('navbar-container').appendChild(navbarContent);
        })
        .catch(error => console.error('Error loading the navbar:', error));
}

// Call the function to load the navbar when the page loads
document.addEventListener('DOMContentLoaded', loadNavbar);
