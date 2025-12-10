// Color Widget Toggle
const widgetToggle = document.getElementById('widgetToggle');
const widgetContent = document.getElementById('widgetContent');
const paletteItems = document.querySelectorAll('.palette-item');

// Toggle widget
widgetToggle.addEventListener('click', () => {
    widgetContent.classList.toggle('active');
});

// Close widget when clicking outside
document.addEventListener('click', (e) => {
    const colorWidget = document.getElementById('colorWidget');
    if (!colorWidget.contains(e.target)) {
        widgetContent.classList.remove('active');
    }
});

// Apply color palette
function applyColorPalette(colors) {
    const root = document.documentElement;
    
    // Update CSS variables
    root.style.setProperty('--color-primary', colors[0]);
    root.style.setProperty('--color-secondary', colors[1]);
    root.style.setProperty('--color-accent', colors[2]);
    root.style.setProperty('--color-highlight', colors[3]);
    
    // Convert hex to RGB for rgba usage
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    
    const rgb1 = hexToRgb(colors[0]);
    const rgb2 = hexToRgb(colors[1]);
    const rgb3 = hexToRgb(colors[2]);
    const rgb4 = hexToRgb(colors[3]);
    
    if (rgb1) root.style.setProperty('--color-primary-rgb', `${rgb1.r}, ${rgb1.g}, ${rgb1.b}`);
    if (rgb2) root.style.setProperty('--color-secondary-rgb', `${rgb2.r}, ${rgb2.g}, ${rgb2.b}`);
    if (rgb3) root.style.setProperty('--color-accent-rgb', `${rgb3.r}, ${rgb3.g}, ${rgb3.b}`);
    if (rgb4) root.style.setProperty('--color-highlight-rgb', `${rgb4.r}, ${rgb4.g}, ${rgb4.b}`);
    
    // Update widget toggle button color
    widgetToggle.style.backgroundColor = colors[0];
}

// Add click event to each palette item
paletteItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        paletteItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Get colors from data attribute
        const colors = JSON.parse(item.getAttribute('data-colors'));
        
        // Apply the palette
        applyColorPalette(colors);
    });
});

// Apply default palette on load
window.addEventListener('DOMContentLoaded', () => {
    const defaultPalette = document.querySelector('.palette-item.active');
    if (defaultPalette) {
        const colors = JSON.parse(defaultPalette.getAttribute('data-colors'));
        applyColorPalette(colors);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#exampleModal') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});