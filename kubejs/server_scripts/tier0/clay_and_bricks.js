ServerEvents.recipes(() => {
  crafting.shaped('unfired_clay_kiln', {
    pattern: ['CCC', 'C C', 'CCC'],
    key: { C: 'minecraft:clay_ball' },
    out: 'kubejs:unfired_clay_kiln'
  });

  cooking.campfire_cooking('campfire_clay_kiln', {
    in: 'kubejs:unfired_clay_kiln',
    out: {
      id: 'custommachinery:custom_machine_item',
      count: 1,
      components: { 'custommachinery:machine': 'custommachinery:clay_kiln' }
    },
    xp: 0.3,
    time: 600,
    category: 'misc'
  });

  cooking.campfire_cooking('campfire_ceramic_bucket', {
    in: 'ceramicbucket:unfired_clay_bucket',
    out: 'ceramicbucket:ceramic_bucket',
    xp: 0.3,
    time: 600,
    category: 'misc'
  });

  mi.mixer('mixer/crucible_clay', {
    eu: 2,
    duration: 100,
    items: [
      ['modern_industrialization:fire_clay_dust', 4],
      ['#c:sands', 4]
    ],
    fluids: [['minecraft:water', 1000]],
    out: [['productivemetalworks:fire_clay', 4]]
  });

  crafting.shapeless('modern_industrialization:materials/fire_clay_dust', {
    ingredients: [
      'minecraft:water_bucket',
      'minecraft:clay_ball',
      'minecraft:clay_ball',
      'minecraft:clay_ball',
      'minecraft:clay_ball',
      'modern_industrialization:brick_dust',
      'modern_industrialization:brick_dust',
      'modern_industrialization:brick_dust',
      'modern_industrialization:brick_dust'
    ],
    out: ['modern_industrialization:fire_clay_dust', 6],
    category: 'misc'
  });

  mi.mixer('modern_industrialization:materials/mixer/fire_clay_dust', {
    eu: 2,
    duration: 100,
    items: [
      ['modern_industrialization:brick_dust', 4],
      ['minecraft:clay_ball', 4]
    ],
    fluids: [['minecraft:water', 500]],
    out: [['modern_industrialization:fire_clay_dust', 6]]
  });

  crafting.shaped('immersiveengineering:crafting/cokebrick', {
    pattern: ['CBC', 'BSB', 'CBC'],
    key: { C: '#c:clay', B: 'modern_industrialization:fire_clay_brick', S: '#c:sands' },
    out: ['immersiveengineering:cokebrick', 3],
    category: 'misc'
  });

  crafting.shaped('immersiveengineering:crafting/blastbrick', {
    pattern: ['CBC', 'BMB', 'CBC'],
    key: { C: '#c:clay', B: 'productivemetalworks:fire_brick', M: 'productivemetalworks:black_fire_bricks' },
    out: ['immersiveengineering:blastbrick', 3],
    category: 'misc'
  });
});
