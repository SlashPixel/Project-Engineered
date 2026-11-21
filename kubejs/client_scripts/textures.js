const GENERATED = [
  {
    id: 'brick_mould',
    source: 'productivemetalworks:item/ingot_cast',
    shadow: [52, 34, 16],
    mid: [136, 100, 56],
    highlight: [200, 162, 100]
  },
  {
    id: 'unfired_brick',
    source: 'minecraft:item/brick',
    shadow: [104, 84, 76],
    mid: [160, 126, 110],
    highlight: [204, 172, 150]
  },
  {
    id: 'unfired_nether_brick',
    source: 'minecraft:item/nether_brick',
    shadow: [66, 40, 46],
    mid: [112, 70, 74],
    highlight: [150, 100, 100]
  },
  {
    id: 'unfired_fire_clay_brick',
    source: 'modern_industrialization:item/fire_clay_brick',
    shadow: [116, 108, 94],
    mid: [166, 156, 136],
    highlight: [204, 195, 175]
  },
  {
    id: 'unfired_fire_brick',
    source: 'productivemetalworks:item/fire_brick',
    shadow: [124, 114, 88],
    mid: [174, 162, 118],
    highlight: [212, 200, 150]
  },
  {
    id: 'unfired_stone_brick',
    source: 'minecraft:item/brick',
    shadow: [88, 88, 84],
    mid: [136, 136, 130],
    highlight: [176, 176, 168]
  },
  {
    id: 'stone_brick',
    source: 'minecraft:item/brick',
    shadow: [94, 94, 94],
    mid: [134, 134, 134],
    highlight: [172, 172, 172]
  },
  {
    id: 'quicklime',
    source: 'minecraft:item/redstone',
    shadow: [150, 142, 118],
    mid: [205, 198, 172],
    highlight: [238, 233, 212]
  },
  {
    id: 'slaked_lime',
    source: 'minecraft:item/redstone',
    shadow: [196, 192, 178],
    mid: [228, 224, 212],
    highlight: [250, 248, 240]
  },
  {
    id: 'mortar',
    source: 'minecraft:item/clay_ball',
    shadow: [96, 94, 90],
    mid: [140, 138, 132],
    highlight: [182, 180, 172]
  }
];

function shade(entry, t) {
  return t < 0.5 ? mixColors(entry.shadow, entry.mid, t * 2) : mixColors(entry.mid, entry.highlight, (t - 0.5) * 2);
}

ClientEvents.generateAssets('after_mods', event => {
  GENERATED.forEach(entry => {
    event.texture(
      `kubejs:item/generated/${entry.id}`,
      recolorTexture(event, entry.source, t => shade(entry, t))
    );
  });
});
