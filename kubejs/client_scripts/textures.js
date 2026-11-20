const GENERATED = [
  {
    id: 'brick_mould',
    source: 'productivemetalworks:item/ingot_cast',
    stops: [
      [52, 34, 16],
      [136, 100, 56],
      [200, 162, 100]
    ]
  },
  {
    id: 'unfired_brick',
    source: 'minecraft:item/brick',
    stops: [
      [104, 84, 76],
      [160, 126, 110],
      [204, 172, 150]
    ]
  },
  {
    id: 'unfired_nether_brick',
    source: 'minecraft:item/nether_brick',
    stops: [
      [66, 40, 46],
      [112, 70, 74],
      [150, 100, 100]
    ]
  },
  {
    id: 'unfired_fire_clay_brick',
    source: 'modern_industrialization:item/fire_clay_brick',
    stops: [
      [116, 108, 94],
      [166, 156, 136],
      [204, 195, 175]
    ]
  },
  {
    id: 'unfired_fire_brick',
    source: 'productivemetalworks:item/fire_brick',
    stops: [
      [124, 114, 88],
      [174, 162, 118],
      [212, 200, 150]
    ]
  }
];

function shade(stops, t) {
  return t < 0.5 ? mixColors(stops[0], stops[1], t * 2) : mixColors(stops[1], stops[2], (t - 0.5) * 2);
}

ClientEvents.generateAssets('after_mods', event => {
  GENERATED.forEach(entry => {
    event.texture(
      `kubejs:item/generated/${entry.id}`,
      recolorTexture(event, entry.source, t => shade(entry.stops, t))
    );
  });
});
