ServerEvents.recipes(event => {
  ['minecraft:smelting', 'minecraft:blasting'].forEach(type => {
    event.remove({ type, input: '#c:ores', output: '#c:ingots' });
    event.remove({ type, input: '#c:raw_materials', output: '#c:ingots' });
  });
});
