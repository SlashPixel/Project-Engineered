ServerEvents.recipes(event => {
  [
    'minecraft:furnace',
    'minecraft:smoker',
    'minecraft:blast_furnace',
    'modern_industrialization:vanilla_recipes/blast_furnace_asbl',
    'modern_industrialization:assembler_generated/vanilla_recipes/blast_furnace'
  ].forEach(recipeId => event.remove({ id: recipeId }));
});
