import * as React from 'react';
import './ColorPicker.css';

export type Color = [number, number, number];

type ColorComponent = 'R' | 'G' | 'B';

type RGBColor = {
  [key in ColorComponent]?: number;
};

interface ColorPickerProps {
  color: Color;
  onChange: (color: Color) => void;
}

interface ColorPickerState {
  colors: RGBColor;
}

class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

  state: ColorPickerState = {
    colors: {
      R: 0,
      G: 0,
      B: 0
    }
  };

  private colorComponents: ColorComponent[] = ['R', 'G', 'B'];

  constructor(props: ColorPickerProps) {
    super(props);
    if (props.color) {
      this.state.colors = this.arrayToRgb(props.color);
    }
  }

  componentWillReceiveProps(newProps: ColorPickerProps) {
    if (newProps.color) {
      this.setState({
        colors: this.arrayToRgb(newProps.color)
      });
    }
  }

  arrayToRgb(color: Color): RGBColor {
    return this.colorComponents.reduce(
      (obj, letter, index) => {
        obj[letter] = color[index] || 0;
        return obj;
      },
      {}
    );
  }

  rgbToArray(rgb: RGBColor): Color {
    return this.colorComponents.map(_ => rgb[_]) as Color;
  }

  rgbToStr(rgb: RGBColor) {
    const { R, G, B } = rgb;
    return `rgb(${R}, ${G}, ${B})`;
  }

  onColorChange(colorComponent: ColorComponent, event: React.ChangeEvent<{ value: string }>) {
    const { value } = event.target;
    const colors = {
      ...this.state.colors,
      [colorComponent]: parseInt(value, 10)
    };
    if (this.props.onChange) {
      this.props.onChange(this.rgbToArray(colors));
    }
    this.setState({
      colors
    });
  }

  render() {
    const { colors } = this.state;
    const previewStyle = {
      background: this.rgbToStr(colors)
    };
    return (
      <div className="ColorPicker">
        <div className="ColorPicker__rows">
          {this.colorComponents.map(letter => (
            <div key={letter} className="ColorPicker__row">
              <span className="ColorPicker__row__letter">{letter}</span>
              <input
                type="range"
                min="0"
                max="255"
                step="1"
                value={colors[letter]}
                onChange={e => this.onColorChange(letter, e)}
                className="ColorPicker__row__input" />
            </div>
          ))}
        </div>
        <div className="ColorPicker__preview" style={previewStyle} />
      </div>
    );
  }
}

export default ColorPicker;
