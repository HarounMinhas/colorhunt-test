# ColorHunt Test Application

A live demo application for testing the refactored ColorHunt Importer component with modular architecture.

## Live Demo

View the live application at: https://harounminhas.github.io/colorhunt-test

## Features

- Smart ColorHunt URL parser with automatic palette detection
- Duplicate detection with visual flash feedback
- Widget mode (collapsible floating button) and inline mode
- Modular component architecture for better maintainability
- Full Bootstrap 5.3.3 showcase with dynamic color theming

## Quick Start

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HarounMinhas/colorhunt-test.git
cd colorhunt-test
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Testing the ColorHunt Importer

### Using Widget Mode

1. Look for the paint palette icon 🎨 in the top-right corner
2. Click it to open the importer
3. Paste a ColorHunt URL (e.g., https://colorhunt.co/palette/1c352da6b28bf5c9b0f9f6f3)
4. The palette will be automatically added
5. Try pasting the same URL again to see the duplicate flash effect

### Using Inline Mode

The application displays both modes simultaneously. Scroll down to see the inline importer embedded in the page content.

### Test URLs

Try these ColorHunt palette URLs:

- https://colorhunt.co/palette/1c352da6b28bf5c9b0f9f6f3
- https://colorhunt.co/palette/22283100adb5eeeeee393e46
- https://colorhunt.co/palette/06283d1363df47b5ffdff6ff
- https://colorhunt.co/palette/f7b801f18701f35b04c1121f

## Component Architecture

The ColorHunt Importer is built with a modular architecture:

```
src/
├── ColorHuntImporter.jsx      - Main component (orchestration)
├── components/                 - Presentational components
│   ├── PaletteCard.jsx        - Single palette display
│   ├── PaletteList.jsx        - List of palettes
│   └── ToggleButton.jsx       - Widget mode toggle
├── hooks/
│   └── usePaletteManager.js   - State management logic
├── utils/
│   └── colorParser.js         - Pure parsing functions
└── types/
    └── palette.js             - JSDoc type definitions
```

### Key Benefits

- Separation of concerns: UI, logic, and utilities are separate
- Testability: Each module can be tested independently
- Reusability: Components and hooks can be used in other projects
- Type safety: JSDoc provides IDE autocomplete and type checking

## Building for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

This project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will build the project and push to the `gh-pages` branch.

## Technology Stack

- React 18.3.1
- Vite 6.0.1 (build tool)
- Bootstrap 5.3.3
- Bootstrap Icons 1.11.3

## Project Structure

- `/src` - React application source code
- `/public` - Static assets
- `index.html` - HTML entry point
- `vite.config.js` - Vite configuration

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

### Code Style

The project uses ESLint for code quality. Run linting with:

```bash
npm run lint
```

## Component Usage

### Inline Mode

```jsx
import ColorHuntImporter from './ColorHuntImporter';

function App() {
  const handlePalettesChange = (palettes) => {
    console.log('Updated palettes:', palettes);
  };

  return (
    <ColorHuntImporter onPalettesChange={handlePalettesChange} />
  );
}
```

### Widget Mode

```jsx
<ColorHuntImporter 
  variant="widget" 
  onPalettesChange={handlePalettesChange} 
/>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPalettesChange` | `function` | `null` | Callback fired when palette list updates |
| `variant` | `'inline' \| 'widget'` | `'inline'` | Display mode |

### Palette Data Structure

```javascript
{
  id: 1715694205123,
  url: "https://colorhunt.co/palette/1c352da6b28bf5c9b0f9f6f3",
  colors: ["#1C352D", "#A6B28B", "#F5C9B0", "#F9F6F3"],
  colorKey: "#1C352D-#A6B28B-#F5C9B0-#F9F6F3",
  timestamp: "10:23:25 AM"
}
```

## License

MIT

## Related Projects

- [react-smart-colorhunt-importer](https://github.com/HarounMinhas/react-smart-colorhunt-importer) - The standalone component library
