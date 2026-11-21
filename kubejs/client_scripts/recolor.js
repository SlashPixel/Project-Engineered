function mixColors(from, to, t) {
  return [0, 1, 2].map(i => from[i] + (to[i] - from[i]) * t);
}

function rgbLuminance(rgb) {
  return 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
}

function pixelLuminance(pixel) {
  return rgbLuminance([(pixel >> 16) & 255, (pixel >> 8) & 255, pixel & 255]);
}

function withRgb(pixel, rgb) {
  return (pixel & 0xff000000) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
}

function recolorTexture(event, source, shade) {
  const result = event.loadTexture(source).copy();
  const pixels = result.pixels;

  let low = Infinity;
  let high = -Infinity;
  for (let i = 0; i < pixels.length; i++) {
    if (((pixels[i] >>> 24) & 255) === 0) continue;
    low = Math.min(low, pixelLuminance(pixels[i]));
    high = Math.max(high, pixelLuminance(pixels[i]));
  }
  const span = high - low || 1;

  for (let i = 0; i < pixels.length; i++) {
    if (((pixels[i] >>> 24) & 255) === 0) continue;
    pixels[i] = withRgb(pixels[i], shade((pixelLuminance(pixels[i]) - low) / span).map(Math.round));
  }
  return result;
}

const ORE_MASK_DISTANCE = 60;

function colorDistance(a, b) {
  return (
    Math.abs(((a >> 16) & 255) - ((b >> 16) & 255)) +
    Math.abs(((a >> 8) & 255) - ((b >> 8) & 255)) +
    Math.abs((a & 255) - (b & 255))
  );
}

function recolorOreTexture(event, oreSource, hostSource, shade) {
  const result = event.loadTexture(oreSource).copy();
  const host = event.loadTexture(hostSource).pixels;
  const pixels = result.pixels;

  const isOre = [];
  let low = Infinity;
  let high = -Infinity;
  for (let i = 0; i < pixels.length; i++) {
    isOre[i] = colorDistance(pixels[i], host[i]) > ORE_MASK_DISTANCE;
    if (!isOre[i]) continue;
    low = Math.min(low, pixelLuminance(pixels[i]));
    high = Math.max(high, pixelLuminance(pixels[i]));
  }
  const span = high - low || 1;

  for (let i = 0; i < pixels.length; i++) {
    pixels[i] = isOre[i]
      ? withRgb(pixels[i], shade((pixelLuminance(pixels[i]) - low) / span).map(Math.round))
      : host[i];
  }
  return result;
}
