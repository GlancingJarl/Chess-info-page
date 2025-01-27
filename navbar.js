document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetUrl = this.getAttribute('href');
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 100); // Delay to allow scroll position to stabilize
    });
});
