function mixColors(from, to, t) {
  return [0, 1, 2].map(i => from[i] + (to[i] - from[i]) * t);
}

function withRgb(pixel, rgb) {
  return (pixel & 0xff000000) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
}

function recolorTexture(event, source, shade) {
  const luminance = pixel => 0.299 * ((pixel >> 16) & 255) + 0.587 * ((pixel >> 8) & 255) + 0.114 * (pixel & 255);
  const result = event.loadTexture(source).copy();
  const pixels = result.pixels;

  let low = Infinity;
  let high = -Infinity;
  for (let i = 0; i < pixels.length; i++) {
    if (((pixels[i] >>> 24) & 255) === 0) continue;
    low = Math.min(low, luminance(pixels[i]));
    high = Math.max(high, luminance(pixels[i]));
  }
  const span = high - low || 1;

  for (let i = 0; i < pixels.length; i++) {
    if (((pixels[i] >>> 24) & 255) === 0) continue;
    pixels[i] = withRgb(pixels[i], shade((luminance(pixels[i]) - low) / span).map(Math.round));
  }
  return result;
}
