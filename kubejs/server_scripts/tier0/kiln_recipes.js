const CLAY_KILN = 'custommachinery:custom_machine_item[custommachinery:machine="custommachinery:clay_kiln"]';

ServerEvents.recipes(event => {
  const kiln = (input, output) => {
    event.recipes.custommachinery
      .custom_machine('custommachinery:clay_kiln', 300)
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
