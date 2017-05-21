import * as React from 'react';
import './App.css';

import ColorPicker, { Color } from './ColorPicker';

interface AppState {
  selectedColor: Color;
}

class App extends React.Component<{}, AppState> {

  private favColors: Color[] = [
    [39, 184, 241],
    [255, 179, 222],
    [255, 176, 35],
    [255, 84, 150],
    [180, 192, 52],
    [0, 139, 139],
    [171, 86, 186],
    [224, 185, 0],
    [155, 10, 35],
    [176, 199, 215]
  ];

  constructor() {
    super();

    const index = Math.floor(Math.random() * this.favColors.length);
    this.state = {
      selectedColor: this.favColors[index]
    };
  }

  render() {
    const strValue = JSON.stringify(this.state.selectedColor);
    return (
      <div className="App">
        <div className="App__color">
          {`<ColorPicker color={${strValue}} />`}
        </div>
        <div className="App__picker">
          <ColorPicker color={this.state.selectedColor} onChange={this.onColorChange} />
        </div>
      </div>
    );
  }

  private onColorChange = (color: Color) => {
    this.setState({
      selectedColor: color
    });
  }
  
}

export default App;
