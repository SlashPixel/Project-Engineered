ServerEvents.recipes(event => {
  const pressureChamber = (id, tag, result) => {
    event.remove({ id: id });
    event.custom({
      type: 'pneumaticcraft:pressure_chamber',
      inputs: [{ count: 1, tag: tag }],
      pressure: 2.0,
      results: [{ count: 1, id: result }]
    }).id(id);
  };

  const explosionCrafting = (id, tag, result) => {
    event.remove({ id: id });
    event.custom({
      type: 'pneumaticcraft:explosion_crafting',
      input: { count: 1, tag: tag },
      loss_rate: 20,
      results: [{ count: 1, id: result }]
    }).id(id);
  };

  pressureChamber('pneumaticcraft:pressure_chamber/compressed_iron_ingot', 'c:ingots/steel', 'pneumaticcraft:ingot_iron_compressed');
  pressureChamber('pneumaticcraft:pressure_chamber/compressed_iron_block', 'c:storage_blocks/steel', 'pneumaticcraft:compressed_iron_block');
  explosionCrafting('pneumaticcraft:explosion_crafting/compressed_iron_ingot', 'c:ingots/steel', 'pneumaticcraft:ingot_iron_compressed');
  explosionCrafting('pneumaticcraft:explosion_crafting/compressed_iron_block', 'c:storage_blocks/steel', 'pneumaticcraft:compressed_iron_block');
});
