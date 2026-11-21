const CUSTOM_ORES = JSON.parse(JsonIO.toString(JsonIO.read('kubejs/config/custom_ores.json'))).ores;

const STONE_ORE_HARDNESS = 3;
const DEEPSLATE_ORE_HARDNESS = 4.5;

function oreBlockId(ore) {
  return `${ore.host === 'deepslate' ? 'deepslate_' : ''}${ore.id}_ore`;
}

function oreFaces(texture) {
  const faces = {};
  ['up', 'down', 'north', 'south', 'east', 'west', 'particle'].forEach(face => (faces[face] = texture));
  return faces;
}

StartupEvents.registry('item', event => {
  CUSTOM_ORES.forEach(ore =>
    event.create(`raw_${ore.id}`).displayName(`Raw ${ore.name}`).texture(`kubejs:item/generated/raw_${ore.id}`)
  );
});

StartupEvents.registry('block', event => {
  CUSTOM_ORES.forEach(ore =>
    event
      .create(oreBlockId(ore))
      .displayName(`${ore.host === 'deepslate' ? 'Deepslate ' : ''}${ore.name} Ore`)
      .textures(oreFaces(`kubejs:block/generated/${oreBlockId(ore)}`))
      .hardness(ore.host === 'deepslate' ? DEEPSLATE_ORE_HARDNESS : STONE_ORE_HARDNESS)
      .resistance(STONE_ORE_HARDNESS)
      .requiresTool()
      .stoneSoundType()
      .tagBlock('minecraft:mineable/pickaxe')
      .tagBlock('minecraft:needs_stone_tool')
  );
});
