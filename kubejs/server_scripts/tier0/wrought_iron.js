const INGOT = 'kubejs:wrought_iron_ingot';
const DUST = 'kubejs:wrought_iron_dust';

ServerEvents.tags('item', event => {
  event.add('c:ingots', INGOT);
  event.add('c:ingots/wrought_iron', INGOT);
});

ServerEvents.recipes(event => {
  event.smelting(INGOT, 'minecraft:iron_ingot').xp(0.1).id('kubejs:smelting/wrought_iron_ingot');

  event.smelting(INGOT, DUST).xp(0.1).id('kubejs:smelting/wrought_iron_ingot_from_dust');
  event.blasting(INGOT, DUST).xp(0.1).id('kubejs:blasting/wrought_iron_ingot_from_dust');
});
