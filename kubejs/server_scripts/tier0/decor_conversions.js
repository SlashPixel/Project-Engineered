const DECOR_CONVERSIONS = [
  {
    id: 'decor/blast_furnace_core_to_decor',
    from: 'kubejs:blast_furnace_core',
    to: 'kubejs:decor_blast_furnace',
    category: 'building'
  },
  {
    id: 'decor/decor_blast_furnace_to_core',
    from: 'kubejs:decor_blast_furnace',
    to: 'kubejs:blast_furnace_core',
    category: 'misc'
  },
  { id: 'decor/decor_furnace_to_core', from: 'kubejs:decor_furnace', to: 'kubejs:furnace_core', category: 'misc' },
  { id: 'decor/decor_smoker_to_core', from: 'kubejs:decor_smoker', to: 'kubejs:smoker_core', category: 'misc' },
  { id: 'decor/furnace_core_to_decor', from: 'kubejs:furnace_core', to: 'kubejs:decor_furnace', category: 'building' },
  { id: 'decor/smoker_core_to_decor', from: 'kubejs:smoker_core', to: 'kubejs:decor_smoker', category: 'building' }
];

ServerEvents.recipes(() => {
  DECOR_CONVERSIONS.forEach(conversion =>
    crafting.shapeless(conversion.id, {
      ingredients: [conversion.from],
      out: conversion.to,
      category: conversion.category
    })
  );
});
