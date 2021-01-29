export function generateColorVariants (hex: string) {
  const tintIntensities = {
    100: 0.9,
    200: 0.75,
    300: 0.6,
    400: 0.3
  }

  const shadeIntensities = {
    600: 0.9,
    700: 0.6,
    800: 0.45,
    900: 0.3
  }

  const tints = Object.keys(tintIntensities).reduce((prev, current) => {
    const color = getTintVariant(hex, tintIntensities[current as '100' | '200' | '300' | '400'])

    return { ...prev, [current]: color }
  }, {})

  const shades = Object.keys(shadeIntensities).reduce((prev, current) => {
    const color = getShadeVariant(hex, shadeIntensities[current as '600' | '700' | '800' | '900'])

    return { ...prev, [current]: color }
  }, {})

  const variants = { ...tints, 500: hex, ...shades }

  return variants
}

function rgbQuantityToHex (rgbQuantity: number) {
  return `0${rgbQuantity.toString(16)}`.slice(-2)
}

function hexToRgb (hex: string) {
  const components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!components) {
    return null
  }

  return {
    r: parseInt(components[1], 16),
    g: parseInt(components[2], 16),
    b: parseInt(components[3], 16)
  }
}

function rgbToHex (r: number, g: number, b: number) {
  return `#${rgbQuantityToHex(r)}${rgbQuantityToHex(g)}${rgbQuantityToHex(b)}`;
}

function getTintVariant (hex: string, intensity: number) {
  const color = hexToRgb(hex)

  if (!color) {
    return null
  }

  const r = Math.round(color.r + (255 - color.r) * intensity)
  const g = Math.round(color.g + (255 - color.g) * intensity)
  const b = Math.round(color.b + (255 - color.b) * intensity)

  return rgbToHex(r, g, b);
}

function getShadeVariant (hex: string, intensity: number) {
  const color = hexToRgb(hex)

  if (!color) {
    return null
  }

  const r = Math.round(color.r * intensity)
  const g = Math.round(color.g * intensity)
  const b = Math.round(color.b * intensity)

  return rgbToHex(r, g, b);
}


