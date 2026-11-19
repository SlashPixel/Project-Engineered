ServerEvents.recipes(event => {
  event.shaped('kubejs:furnace_core', [
    '###',
    '# #',
    '###'
  ], {
    '#': '#minecraft:stone_crafting_materials'
  }).id('kubejs:furnace_core');

  event.shaped('kubejs:smoker_core', [
    ' L ',
    'LFL',
    ' L '
  ], {
    L: '#minecraft:logs',
    F: 'kubejs:furnace_core'
  }).id('kubejs:smoker_core');

  event.shaped('kubejs:blast_furnace_core', [
    'III',
    'IFI',
    'SSS'
  ], {
    I: 'minecraft:iron_ingot',
    F: 'kubejs:furnace_core',
    S: 'minecraft:smooth_stone'
  }).id('kubejs:blast_furnace_core');
});
