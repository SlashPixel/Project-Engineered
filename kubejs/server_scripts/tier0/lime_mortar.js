ServerEvents.recipes(() => {
  cooking.smelting('smelting_quicklime', {
    in: 'create:limestone',
    out: 'kubejs:quicklime',
    xp: 0.1,
    time: 200
  });

  crafting.shapeless('slaked_lime', {
    ingredients: ['kubejs:quicklime', '#c:sands', 'minecraft:water_bucket'],
    out: ['kubejs:slaked_lime', 2],
    category: 'misc'
  });

  rack.drying('rack/mortar', {
    in: 'kubejs:slaked_lime',
    out: 'kubejs:mortar',
    time: 6000
  });

  crafting.shaped('minecraft:stone_bricks', {
    pattern: ['BBB', 'BMB', 'BBB'],
    key: { B: 'kubejs:stone_brick', M: 'kubejs:mortar' },
    out: ['minecraft:stone_bricks', 2],
    category: 'building'
  });
});
