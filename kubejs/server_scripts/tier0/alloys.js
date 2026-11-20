const ALLOY_OUTPUT = {
  'immersiveengineering:alloysmelter/bronze': 3,
  'immersiveengineering:alloysmelter/brass': 1,
  'immersiveengineering:alloysmelter/invar': 2,
  'immersiveengineering:alloysmelter/constantan': 1
};

ServerEvents.recipes(event => {
  const alloys = readRecipes(event, { type: 'immersiveengineering:alloy' });
  const rewrites = [];
  const removals = [];

  Object.keys(alloys).forEach(recipeId => {
    const count = ALLOY_OUTPUT[recipeId];

    if (count === undefined) {
      removals.push(recipeId);
      return;
    }

    const json = alloys[recipeId];
    json.result.count = count;
    delete json['neoforge:conditions'];
    rewrites.push({ id: recipeId, json: json });
  });

  replaceRecipes(event, rewrites, removals);

  event.remove({ id: 'immersiveengineering:crafting/constantan_mix' });
  event.remove({ id: 'immersiveengineering:crafting/electrum_mix' });
  event.remove({ id: 'modern_industrialization:materials/bronze_dust' });
  event.remove({ id: 'modern_industrialization:materials/bronze_tiny_dust' });

  event.remove({ id: 'immersiveengineering:crafting/alloybrick' });
  event
    .shaped(Item.of('immersiveengineering:alloybrick', 2), ['FB', 'BF'], {
      F: 'modern_industrialization:fire_clay_brick',
      B: '#c:bricks'
    })
    .id('immersiveengineering:crafting/alloybrick');

  console.info(`[alloys] kiln: rewrote ${rewrites.length}, removed ${removals.length}`);
});
