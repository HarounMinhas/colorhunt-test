// Color Widget Toggle
const widgetToggle = document.getElementById('widgetToggle');
const widgetContent = document.getElementById('widgetContent');
const paletteItems = document.querySelectorAll('.palette-item');
const paletteUrlInput = document.getElementById('paletteUrl');
const applyUrlBtn = document.getElementById('applyUrlBtn');

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

// Extract colors from ColorHunt URL or direct input
function extractColorsFromInput(input) {
    const trimmedInput = input.trim();
    
    // Check if it's a ColorHunt URL
    const urlMatch = trimmedInput.match(/colorhunt\.co\/palette\/([a-fA-F0-9]+)/);
    if (urlMatch) {
        const colorString = urlMatch[1];
        // Split into groups of 6 characters (hex colors without #)
        const colors = [];
        for (let i = 0; i < colorString.length; i += 6) {
            if (i + 6 <= colorString.length) {
                colors.push('#' + colorString.substring(i, i + 6).toUpperCase());
            }
        }
        if (colors.length >= 4) {
            return colors.slice(0, 4);
        }
    }
    
    // Check if it's direct hex codes separated by dashes or spaces
    const hexPattern = /#?([a-fA-F0-9]{6})/g;
    const matches = [...trimmedInput.matchAll(hexPattern)];
    if (matches.length >= 4) {
        return matches.slice(0, 4).map(m => '#' + m[1].toUpperCase());
    }
    
    return null;
}

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

// Apply URL button click handler
applyUrlBtn.addEventListener('click', () => {
    const input = paletteUrlInput.value;
    const colors = extractColorsFromInput(input);
    
    if (colors) {
        applyColorPalette(colors);
        
        // Remove active class from all preset items
        paletteItems.forEach(i => i.classList.remove('active'));
        
        // Visual feedback
        paletteUrlInput.classList.add('is-valid');
        paletteUrlInput.classList.remove('is-invalid');
        setTimeout(() => {
            paletteUrlInput.classList.remove('is-valid');
        }, 2000);
    } else {
        // Error feedback
        paletteUrlInput.classList.add('is-invalid');
        paletteUrlInput.classList.remove('is-valid');
        setTimeout(() => {
            paletteUrlInput.classList.remove('is-invalid');
        }, 2000);
    }
});

// Allow pressing Enter in the input field
paletteUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        applyUrlBtn.click();
    }
});

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
        
        // Clear the input field
        paletteUrlInput.value = '';
        paletteUrlInput.classList.remove('is-valid', 'is-invalid');
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