// priority: -50
const WOOD_CRAFTING_TYPES = ['minecraft:crafting_shaped', 'minecraft:crafting_shapeless'];
const WOOD_YIELD = 2;

ServerEvents.recipes(event => {
  const rewrites = [];

  ['#minecraft:planks', 'minecraft:stick'].forEach(output => {
    WOOD_CRAFTING_TYPES.forEach(type => {
      const recipes = readRecipes(event, { output, type });
      Object.keys(recipes).forEach(id => {
        const json = recipes[id];
        if (!json.result || (json.result.count || 1) <= WOOD_YIELD) return;
        json.result.count = WOOD_YIELD;
        rewrites.push({ id, json });
      });
    });
  });

  replaceRecipes(event, rewrites, []);

  event
    .shaped(Item.of('minecraft:stick', 4), ['L', 'L'], {
      L: '#minecraft:logs'
    })
    .id('kubejs:sticks_from_logs');
});
