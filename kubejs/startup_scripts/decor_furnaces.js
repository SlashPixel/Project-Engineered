const DECOR_FURNACES = [
  {
    id: 'furnace',
    name: 'Decorative Furnace',
    textures: { top: 'minecraft:block/furnace_top', side: 'minecraft:block/furnace_side' },
    front: 'minecraft:block/furnace_front',
    frontLit: 'minecraft:block/furnace_front_on'
  },
  {
    id: 'smoker',
    name: 'Decorative Smoker',
    textures: {
      top: 'minecraft:block/smoker_top',
      side: 'minecraft:block/smoker_side',
      bottom: 'minecraft:block/smoker_bottom'
    },
    front: 'minecraft:block/smoker_front',
    frontLit: 'minecraft:block/smoker_front_on'
  },
  {
    id: 'blast_furnace',
    name: 'Decorative Blast Furnace',
    textures: { top: 'minecraft:block/blast_furnace_top', side: 'minecraft:block/blast_furnace_side' },
    front: 'minecraft:block/blast_furnace_front',
    frontLit: 'minecraft:block/blast_furnace_front_on'
  }
];

StartupEvents.registry('block', event => {
  DECOR_FURNACES.forEach(furnace => {
    [false, true].forEach(lit => {
      const block = event
        .create(`decor_${furnace.id}${lit ? '_lit' : ''}`, 'cardinal')
        .displayName(furnace.name)
        .textures(Object.assign({ front: lit ? furnace.frontLit : furnace.front }, furnace.textures))
        .hardness(3.5)
        .resistance(3.5)
        .requiresTool()
        .stoneSoundType()
        .tagBlock('minecraft:mineable/pickaxe');

      if (lit) block.lightLevel(0.87).noItem();
    });
  });
});
