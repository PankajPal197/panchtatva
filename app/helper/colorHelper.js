const convert = require("color-convert");
const colorNames = require("color-name"); // { red: [255,0,0], ... }

function generateColorData(color) {
  if (color.name && !color.hex && !color.rgb) {
    // agar sirf name diya hai -> uske basis par hex,rgb nikalo
    const predefined = {
      red: { hex: "#FF0000", rgb: "255,0,0" },
      green: { hex: "#00FF00", rgb: "0,255,0" },
      blue: { hex: "#0000FF", rgb: "0,0,255" },
    };
    if (predefined[color.name.toLowerCase()]) {
      return {
        name: color.name,
        hex: predefined[color.name.toLowerCase()].hex,
        rgb: predefined[color.name.toLowerCase()].rgb,
      };
    }
  }

  if (color.hex && !color.name && !color.rgb) {
    // agar sirf hex mila hai -> rgb banado
    const hex = color.hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return {
      name: `custom-${hex}`,
      hex: color.hex,
      rgb: `${r},${g},${b}`,
    };
  }

  if (color.rgb && !color.hex && !color.name) {
    // agar sirf rgb mila hai -> hex banado
    const [r, g, b] = color.rgb.split(",").map(Number);
    const hex =
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase();
    return {
      name: `custom-${hex}`,
      hex,
      rgb: color.rgb,
    };
  }

  return color; // agar pehle se sab hai
}

// module.exports = { generateColorData };


module.exports = generateColorData;
