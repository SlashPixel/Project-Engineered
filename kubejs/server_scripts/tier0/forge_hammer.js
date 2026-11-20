const FORGE_HAMMER = 'modern_industrialization:forge_hammer';
const TOOL_SUFFIX = '_with_tool';
const DEFAULT_DAMAGE = 20;

ServerEvents.recipes(event => {
  event.remove({ id: FORGE_HAMMER });
  event
    .shaped(FORGE_HAMMER, ['___', ' i ', 'iBi'], {
      _: 'minecraft:heavy_weighted_pressure_plate',
      i: 'minecraft:iron_ingot',
      B: '#c:storage_blocks/iron'
    })
    .id(FORGE_HAMMER);

  const recipes = readRecipes(event, { type: FORGE_HAMMER });
  const rewrites = [];
  const removals = [];

  Object.keys(recipes).forEach(id => {
    const json = recipes[id];
    if (json.damage !== undefined) return;

    const toolId = id + TOOL_SUFFIX;
    const toolJson = recipes[toolId];

    removals.push(id);
    if (toolJson === undefined) {
      json.damage = DEFAULT_DAMAGE;
      rewrites.push({ id: toolId, json: json });
    } else {
      toolJson.result = json.result;
      rewrites.push({ id: toolId, json: toolJson });
    }
  });

  replaceRecipes(event, rewrites, removals);
});
