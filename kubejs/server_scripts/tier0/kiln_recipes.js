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
});
