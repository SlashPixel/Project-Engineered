ServerEvents.recipes(event => {
  event.remove({ id: 'minecraft:enchanting_table' });

  event.shaped('minecraft:enchanting_table', [
    ' B ',
    'D#D',
    '###'
  ], {
    B: 'minecraft:enchanted_book',
    D: 'minecraft:diamond',
    '#': 'minecraft:obsidian'
  }).id('minecraft:enchanting_table');
});
