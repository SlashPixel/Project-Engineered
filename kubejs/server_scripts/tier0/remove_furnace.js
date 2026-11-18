ServerEvents.recipes(event => {
  event.remove({ id: 'minecraft:furnace' });
  event.remove({ output: 'minecraft:smoker' });
  event.remove({ output: 'minecraft:blast_furnace' });
});
