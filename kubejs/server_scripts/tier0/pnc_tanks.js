ServerEvents.recipes(event => {
  event.remove({ id: 'pneumaticcraft:liquid_hopper' });
  event
    .shaped('pneumaticcraft:liquid_hopper', ['T', 'H'], {
      T: 'modern_industrialization:steel_tank',
      H: 'minecraft:hopper'
    })
    .id('pneumaticcraft:liquid_hopper');

  event.replaceInput(
    { input: 'pneumaticcraft:small_tank', not: { id: 'pneumaticcraft:liquid_hopper' } },
    'pneumaticcraft:small_tank',
    'enderio:fluid_tank'
  );
});
