const CLAY_KILN = 'custommachinery:custom_machine_item[custommachinery:machine="custommachinery:clay_kiln"]';

ServerEvents.recipes(event => {
  event.remove({ id: 'ceramicbucket:ceramic_bucket' });

  event.shaped('kubejs:unfired_clay_kiln', [
    'CCC',
    'C C',
    'CCC'
  ], {
    C: 'minecraft:clay_ball'
  }).id('kubejs:unfired_clay_kiln');

  event.recipes.minecraft.campfire_cooking(CLAY_KILN, 'kubejs:unfired_clay_kiln', 0.3, 600)
    .id('kubejs:campfire_clay_kiln');

  event.recipes.minecraft.campfire_cooking('ceramicbucket:ceramic_bucket', 'ceramicbucket:unfired_clay_bucket', 0.3, 600)
    .id('kubejs:campfire_ceramic_bucket');

  event.recipes.minecraft.campfire_cooking('kubejs:wood_ash', '#minecraft:logs_that_burn', 0.1, 600)
    .id('kubejs:campfire_wood_ash');

  let kiln = (input, output) => {
    event.recipes.custommachinery.custom_machine('custommachinery:clay_kiln', 300)
      .requireItem(input)
      .produceItem(output)
      .id(`kubejs:kiln/${String(input).replace(/[^a-z0-9]+/g, '_')}`);
  };

  kiln('kubejs:unfired_brick', 'minecraft:brick');
  kiln('kubejs:unfired_nether_brick', 'minecraft:nether_brick');
  kiln('#minecraft:logs_that_burn', 'minecraft:charcoal');
  kiln('kubejs:unfired_fire_clay_brick', 'modern_industrialization:fire_clay_brick');
  kiln('kubejs:unfired_fire_brick', 'productivemetalworks:fire_brick');
  kiln('ceramicbucket:unfired_clay_bucket', 'ceramicbucket:ceramic_bucket');
  kiln('kubejs:unfired_clay_kiln', Item.of(CLAY_KILN));
});
