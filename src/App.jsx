import { useState } from 'react'
import ColorHuntImporter from './ColorHuntImporter'
import './App.css'

function App() {
  const [palettes, setPalettes] = useState([])

  const handlePalettesChange = (updatedPalettes) => {
    console.log("Palettes updated:", updatedPalettes)
    setPalettes(updatedPalettes)
  }

  return (
    <div className="App">
      <h1>🎨 ColorHunt Importer Test</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Inline Mode (Default)</h2>
        <ColorHuntImporter onPalettesChange={handlePalettesChange} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Widget Mode</h2>
        <p style={{ marginBottom: '20px' }}>
          Klik op het 🎨 icoon hieronder →
        </p>
        <div style={{ position: 'relative', height: '100px' }}>
          <ColorHuntImporter 
            variant="widget" 
            onPalettesChange={handlePalettesChange} 
          />
        </div>
      </div>

      <div>
        <h2>Console Output</h2>
        <p>Totaal paletten: {palettes.length}</p>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px',
          textAlign: 'left',
          overflow: 'auto'
        }}>
          {JSON.stringify(palettes, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default App