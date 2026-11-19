ServerEvents.recipes(event => {
  event.custom({
    type: 'modern_industrialization:forge_hammer',
    damage: 20,
    ingredient: { item: 'create:limestone' },
    result: { id: 'kubejs:limestone_dust', count: 1 }
  }).id('kubejs:forge_hammer/limestone_to_dust');

  event.custom({
    type: 'modern_industrialization:macerator',
    eu: 2,
    duration: 200,
    item_inputs: { item: 'create:limestone', amount: 1 },
    item_outputs: { item: 'kubejs:limestone_dust', amount: 2 }
  }).id('kubejs:macerator/limestone_to_dust');
});
