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

  let recipes = {};
  event.forEachRecipe({ type: FORGE_HAMMER }, recipe => {
    recipes[String(recipe.getId())] = JSON.parse(JsonIO.toString(recipe.originalJson));
  });

  let rewrites = [];
  let removals = [];

  Object.keys(recipes).forEach(id => {
    let json = recipes[id];
    if (json.damage !== undefined) return;

    let toolId = id + TOOL_SUFFIX;
    let toolJson = recipes[toolId];

    removals.push(id);
    if (toolJson === undefined) {
      json.damage = DEFAULT_DAMAGE;
      rewrites.push({ id: toolId, json: json });
    } else {
      toolJson.result = json.result;
      rewrites.push({ id: toolId, json: toolJson });
    }
  });

  removals.forEach(id => event.remove({ id: id }));
  rewrites.forEach(rewrite => {
    event.remove({ id: rewrite.id });
    event.custom(rewrite.json).id(rewrite.id);
  });
});
