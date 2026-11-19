const GENERATED = [
  {
    id: 'brick_mould',
    source: 'productivemetalworks:item/ingot_cast',
    stops: [[52, 34, 16], [136, 100, 56], [200, 162, 100]]
  },
  {
    id: 'unfired_brick',
    source: 'minecraft:item/brick',
    stops: [[104, 84, 76], [160, 126, 110], [204, 172, 150]]
  },
  {
    id: 'unfired_nether_brick',
    source: 'minecraft:item/nether_brick',
    stops: [[66, 40, 46], [112, 70, 74], [150, 100, 100]]
  },
  {
    id: 'unfired_fire_clay_brick',
    source: 'modern_industrialization:item/fire_clay_brick',
    stops: [[116, 108, 94], [166, 156, 136], [204, 195, 175]]
  },
  {
    id: 'unfired_fire_brick',
    source: 'productivemetalworks:item/fire_brick',
    stops: [[124, 114, 88], [174, 162, 118], [212, 200, 150]]
  }
];

function luminance(pixel) {
  return 0.299 * ((pixel >> 16) & 255) + 0.587 * ((pixel >> 8) & 255) + 0.114 * (pixel & 255);
}

function mix(from, to, t) {
  return [0, 1, 2].map(i => from[i] + (to[i] - from[i]) * t);
}

function shade(stops, t) {
  return t < 0.5 ? mix(stops[0], stops[1], t * 2) : mix(stops[1], stops[2], (t - 0.5) * 2);
}

ClientEvents.generateAssets('after_mods', event => {
  GENERATED.forEach(entry => {
    const result = event.loadTexture(entry.source).copy();
    const pixels = result.pixels;

    let low = Infinity;
    let high = -Infinity;
    for (let i = 0; i < pixels.length; i++) {
      if (((pixels[i] >>> 24) & 255) === 0) continue;
      const value = luminance(pixels[i]);
      low = Math.min(low, value);
      high = Math.max(high, value);
    }
    const span = (high - low) || 1;

    for (let i = 0; i < pixels.length; i++) {
      const alpha = (pixels[i] >>> 24) & 255;
      if (alpha === 0) continue;
      const rgb = shade(entry.stops, (luminance(pixels[i]) - low) / span).map(Math.round);
      pixels[i] = (alpha << 24) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
    }

    event.texture(`kubejs:item/generated/${entry.id}`, result);
  });
});
