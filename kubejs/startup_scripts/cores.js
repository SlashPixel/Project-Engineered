StartupEvents.registry('item', event => {
  event.create('furnace_core').displayName('Furnace Core').texture('minecraft:block/furnace_front');
  event.create('smoker_core').displayName('Smoker Core').texture('minecraft:block/smoker_front');
  event.create('blast_furnace_core').displayName('Blast Furnace Core').texture('minecraft:block/blast_furnace_front');
});
