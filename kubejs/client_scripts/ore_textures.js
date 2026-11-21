const CUSTOM_ORES = JSON.parse(JsonIO.toString(JsonIO.read('kubejs/config/custom_ores.json'))).ores;

const ORE_SHADOW_FACTOR = 0.55;

const ORE_HOST_TEXTURES = {
  stone: { host: 'minecraft:block/stone', source: shape => `minecraft:block/${shape}_ore` },
  deepslate: { host: 'minecraft:block/deepslate', source: shape => `minecraft:block/deepslate_${shape}_ore` },
  netherrack: { host: 'minecraft:block/netherrack', source: shape => `minecraft:block/${shape}_ore` }
};

function oreBlockId(ore) {
  return `${ore.host === 'deepslate' ? 'deepslate_' : ''}${ore.id}_ore`;
}

function hexToRgb(hex) {
  const value = parseInt(hex.replace('#', ''), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function oreRamp(ore) {
  const main = hexToRgb(ore.main);
  const stops = [main.map(c => c * ORE_SHADOW_FACTOR), main, hexToRgb(ore.accent)];
  stops.sort((a, b) => rgbLuminance(a) - rgbLuminance(b));
  return stops;
}

function oreShade(stops, t) {
  return t < 0.5 ? mixColors(stops[0], stops[1], t * 2) : mixColors(stops[1], stops[2], (t - 0.5) * 2);
}

ClientEvents.generateAssets('after_mods', event => {
  CUSTOM_ORES.forEach(ore => {
    const stops = oreRamp(ore);
    const textures = ORE_HOST_TEXTURES[ore.host];
    const blockId = oreBlockId(ore);

    event.texture(
      `kubejs:block/generated/${blockId}`,
      recolorOreTexture(event, textures.source(ore.shape), textures.host, t => oreShade(stops, t))
    );
    event.texture(
      `kubejs:item/generated/raw_${ore.id}`,
      recolorTexture(event, 'minecraft:item/raw_iron', t => oreShade(stops, t))
    );
  });
});
