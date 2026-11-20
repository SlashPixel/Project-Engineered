ServerEvents.recipes(event => {
  event.recipes.modular_machinery_reborn
    .machine_recipe('modular_machinery_reborn:stone_furnace', 200)
    .requireItem('minecraft:charcoal')
    .requireItem('minecraft:raw_iron')
    .produceItem('minecraft:iron_ingot')
    .id('kubejs:stone_furnace/iron_ingot');
});
