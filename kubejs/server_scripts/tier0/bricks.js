const MOULD = 'kubejs:brick_mould';

const COOKING_TYPES = ['minecraft:smelting', 'minecraft:blasting', 'minecraft:smoking', 'minecraft:campfire_cooking'];

const BRICKS = [
  { id: 'brick', output: 'minecraft:brick', input: 'minecraft:clay_ball' },
  { id: 'nether_brick', output: 'minecraft:nether_brick', input: 'minecraft:netherrack', count: 4 },
  {
    id: 'fire_clay_brick',
    output: 'modern_industrialization:fire_clay_brick',
    input: 'modern_industrialization:fire_clay_dust'
  },
  { id: 'fire_brick', output: 'productivemetalworks:fire_brick', input: 'productivemetalworks:fire_clay' },
  { id: 'stone_brick', output: 'kubejs:stone_brick', input: 'minecraft:stone', count: 4 }
];

ServerEvents.recipes(event => {
  event
    .shaped(MOULD, ['SSS', 'S S', 'SSS'], {
      S: 'minecraft:stick'
    })
    .id('kubejs:brick_mould');

  event.remove({ id: 'productivemetalworks:crafting/fire_clay' });

  BRICKS.forEach(brick => {
    const unfired = `kubejs:unfired_${brick.id}`;

    COOKING_TYPES.forEach(type => event.remove({ output: brick.output, type, not: { input: unfired } }));

    event
      .shaped(Item.of(unfired, brick.count || 2), ['III', 'IMI', 'III'], {
        I: brick.input,
        M: MOULD
      })
      .damageIngredient(MOULD)
      .id(unfired);

    event.smelting(brick.output, unfired).xp(0.1).id(`kubejs:smelting_${brick.id}`);
  });
});
