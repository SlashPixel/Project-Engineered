const ALLOY_OUTPUT = {
  'immersiveengineering:alloysmelter/bronze': 3,
  'immersiveengineering:alloysmelter/brass': 1,
  'immersiveengineering:alloysmelter/invar': 2,
  'immersiveengineering:alloysmelter/constantan': 1
};

ServerEvents.recipes(event => {
  let rewrites = [];
  let removals = [];

  event.forEachRecipe({ type: 'immersiveengineering:alloy' }, recipe => {
    let recipeId = String(recipe.getId());
    let count = ALLOY_OUTPUT[recipeId];

    if (count === undefined) {
      removals.push(recipeId);
      return;
    }

    let json = JSON.parse(JsonIO.toString(recipe.originalJson));
    json.result.count = count;
    delete json['neoforge:conditions'];
    rewrites.push({ id: recipeId, json: json });
  });

  removals.forEach(recipeId => event.remove({ id: recipeId }));
  rewrites.forEach(rewrite => {
    event.remove({ id: rewrite.id });
    event.custom(rewrite.json).id(rewrite.id);
  });

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
