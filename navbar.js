

// Function to adjust zoom level
function adjustZoom() {
    const body = document.body;
    const html = document.documentElement;

    // Calculate the height and width of the content
    const contentHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                                    html.clientHeight, html.scrollHeight, html.offsetHeight);
    const contentWidth = Math.max(body.scrollWidth, body.offsetWidth, 
                                   html.clientWidth, html.scrollWidth, html.offsetWidth);

    // Set the zoom level based on the content height and width
    const zoomLevel = Math.min(window.innerHeight / contentHeight, window.innerWidth / contentWidth);
    document.body.style.transform = `scale(${zoomLevel})`;
    document.body.style.transformOrigin = 'top left';
}

// Call adjustZoom on window load
window.onload = adjustZoom;
