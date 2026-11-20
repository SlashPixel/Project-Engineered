ServerEvents.recipes(() => {
  mi.blast_furnace('modern_industrialization:materials/blast_furnace/steel', {
    eu: 8,
    duration: 600,
    items: [['modern_industrialization:uncooked_steel_dust', 1]],
    out: [['modern_industrialization:steel_ingot', 1]]
  });

  pnc.pressureChamber('pneumaticcraft:pressure_chamber/compressed_iron_ingot', {
    in: [['#c:ingots/steel', 1]],
    pressure: 2,
    out: ['pneumaticcraft:ingot_iron_compressed']
  });

  pnc.pressureChamber('pneumaticcraft:pressure_chamber/compressed_iron_block', {
    in: [['#c:storage_blocks/steel', 1]],
    pressure: 2,
    out: ['pneumaticcraft:compressed_iron_block']
  });

  pnc.explosion('pneumaticcraft:explosion_crafting/compressed_iron_ingot', {
    in: ['#c:ingots/steel', 1],
    lossRate: 20,
    out: ['pneumaticcraft:ingot_iron_compressed']
  });

  pnc.explosion('pneumaticcraft:explosion_crafting/compressed_iron_block', {
    in: ['#c:storage_blocks/steel', 1],
    lossRate: 20,
    out: ['pneumaticcraft:compressed_iron_block']
  });
});
