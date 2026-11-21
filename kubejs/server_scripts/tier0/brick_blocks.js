ServerEvents.recipes(event => {
  event.remove({ output: 'minecraft:bricks', type: 'minecraft:crafting_shaped' });
  event.remove({ id: 'minecraft:bricks' });

  event
    .shaped('minecraft:bricks', ['BBB', 'BMB', 'BBB'], {
      B: 'minecraft:brick',
      M: 'kubejs:mortar'
    })
    .id('kubejs:bricks_from_mortar');
});
