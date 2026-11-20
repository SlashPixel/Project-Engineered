const MI_CABLE_TIERS = [
  { id: 't_iv', short: 'T-IV', long: 'Tier IV', eu: 65536, color: 0x2aa198 },
  { id: 't_v', short: 'T-V', long: 'Tier V', eu: 524288, color: 0x3c78d8 },
  { id: 't_vi', short: 'T-VI', long: 'Tier VI', eu: 4194304, color: 0x8e5bd0 },
  { id: 't_vii', short: 'T-VII', long: 'Tier VII', eu: 33554432, color: 0xd05ba8 },
  { id: 't_viii', short: 'T-VIII', long: 'Tier VIII', eu: 1024000000, color: 0xe8913a }
];

StartupEvents.registry('block', event => {
  MI_CABLE_TIERS.forEach(tier => {
    event
      .create(`${tier.id}_machine_hull`)
      .displayName(`${tier.short} Machine Hull`)
      .texture(`kubejs:block/generated/${tier.id}_machine_hull`)
      .hardness(5)
      .resistance(6)
      .requiresTool()
      .tagBlock('minecraft:mineable/pickaxe');
  });
});

MIRegistrationEvents.registerCableTiers(event => {
  MI_CABLE_TIERS.forEach(tier => {
    event.register(tier.id, tier.short, tier.long, tier.eu, `kubejs:${tier.id}_machine_hull`);
  });
});

MIMachineEvents.registerHatches(event => {
  MI_CABLE_TIERS.forEach(tier => event.energy(tier.id));
});

MIMaterialEvents.addMaterials(event => {
  MI_CABLE_TIERS.forEach(tier => {
    event.createMaterial(`${tier.short} Conductor`, `${tier.id}_conductor`, tier.color, builder => {
      builder.materialSet('metallic').addParts('wire').cable(tier.id);
    });
  });
});
