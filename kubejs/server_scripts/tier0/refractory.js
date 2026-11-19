ServerEvents.recipes(event => {
  event.remove({ id: 'immersiveengineering:crafting/cokebrick' });
  event.shaped(Item.of('immersiveengineering:cokebrick', 3), [
    'CBC',
    'BSB',
    'CBC'
  ], {
    C: '#c:clay',
    B: 'modern_industrialization:fire_clay_brick',
    S: '#c:sands'
  }).id('immersiveengineering:crafting/cokebrick');

  event.remove({ output: 'immersiveengineering:blastbrick_reinforced' });
  event.remove({ output: 'immersiveengineering:slab_blastbrick_reinforced' });

  event.remove({ id: 'immersiveengineering:crafting/blastbrick' });
  event.shaped(Item.of('immersiveengineering:blastbrick', 3), [
    'CBC',
    'BMB',
    'CBC'
  ], {
    C: '#c:clay',
    B: 'productivemetalworks:fire_brick',
    M: 'productivemetalworks:black_fire_bricks'
  }).id('immersiveengineering:crafting/blastbrick');

  event.remove({ id: 'modern_industrialization:materials/fire_clay_dust' });
  event.remove({ id: 'modern_industrialization:materials/mixer/fire_clay_dust' });

  event.shapeless(Item.of('modern_industrialization:fire_clay_dust', 6), [
    'minecraft:water_bucket',
    'minecraft:clay_ball',
    'minecraft:clay_ball',
    'minecraft:clay_ball',
    'minecraft:clay_ball',
    'modern_industrialization:brick_dust',
    'modern_industrialization:brick_dust',
    'modern_industrialization:brick_dust',
    'modern_industrialization:brick_dust'
  ]).replaceIngredient('minecraft:water_bucket', 'minecraft:bucket')
    .id('modern_industrialization:materials/fire_clay_dust');

  event.custom({
    type: 'modern_industrialization:mixer',
    duration: 100,
    eu: 2,
    fluid_inputs: [{ amount: 500, fluid: 'minecraft:water' }],
    item_inputs: [
      { amount: 4, item: 'modern_industrialization:brick_dust' },
      { amount: 4, item: 'minecraft:clay_ball' }
    ],
    item_outputs: [{ amount: 6, item: 'modern_industrialization:fire_clay_dust' }]
  }).id('modern_industrialization:materials/mixer/fire_clay_dust');

  event.custom({
    type: 'modern_industrialization:mixer',
    duration: 100,
    eu: 2,
    fluid_inputs: [{ amount: 1000, fluid: 'minecraft:water' }],
    item_inputs: [
      { amount: 4, item: 'modern_industrialization:fire_clay_dust' },
      { amount: 4, tag: 'c:sands' }
    ],
    item_outputs: [{ amount: 4, item: 'productivemetalworks:fire_clay' }]
  }).id('kubejs:mixer/crucible_clay');
});
