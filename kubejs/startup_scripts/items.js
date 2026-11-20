StartupEvents.registry('item', event => {
  event
    .create('brick_mould')
    .displayName('Brick Mould')
    .maxDamage(256)
    .unstackable()
    .texture('kubejs:item/generated/brick_mould');

  event.create('unfired_brick').displayName('Unfired Brick').texture('kubejs:item/generated/unfired_brick');
  event
    .create('unfired_nether_brick')
    .displayName('Unfired Nether Brick')
    .texture('kubejs:item/generated/unfired_nether_brick');
  event
    .create('unfired_fire_clay_brick')
    .displayName('Unfired Fire Clay Brick')
    .texture('kubejs:item/generated/unfired_fire_clay_brick');
  event
    .create('unfired_fire_brick')
    .displayName('Unfired Crucible Brick')
    .texture('kubejs:item/generated/unfired_fire_brick');

  event.create('unfired_clay_kiln').displayName('Unfired Clay Kiln');
});
