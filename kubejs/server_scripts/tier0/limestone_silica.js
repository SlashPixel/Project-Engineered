ServerEvents.recipes(() => {
  mi.forge_hammer('forge_hammer/limestone_to_dust', {
    damage: 20,
    in: 'create:limestone',
    out: 'kubejs:limestone_dust'
  });

  mi.forge_hammer('forge_hammer/sand_to_silica_dust_with_tool', {
    damage: 20,
    in: 'minecraft:sand',
    out: 'kubejs:silica_dust'
  });

  mi.macerator('macerator/limestone_to_dust', {
    eu: 2,
    duration: 200,
    items: [['create:limestone', 1]],
    out: [['kubejs:limestone_dust', 2]]
  });

  mi.macerator('macerator/sand_to_silica_dust', {
    eu: 2,
    duration: 200,
    items: [['minecraft:sand', 1]],
    out: [['kubejs:silica_dust', 2]]
  });
});
