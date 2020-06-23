import React from 'react';
import './styles/reset.css';
import './styles/animate.css';
import './styles/beauTyping.css';
import Canvas from './components/canvas';
import HUD from './components/hud';


function App() {
  return (
    <div className="App">
      <Canvas />
      <HUD />
      <div className="currentText"></div>
    </div>
  );
}

export default App;
