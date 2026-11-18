const MELTING = /^productivemetalworks:melting\/(ores|raw_materials|storage_blocks)\/(.+)$/;

function metalName(fluid) {
  return String(fluid).replace(/^.*molten_/, '');
}

function readJson(recipe) {
  return JSON.parse(JsonIO.toString(recipe.originalJson));
}

ServerEvents.recipes(event => {
  event.remove({ id: /productivemetalworks:alloying\// });
  event.remove({ id: /oritech:compat\/productivemetalworks\/alloying\// });

  let castAmount = {};
  event.forEachRecipe({ type: 'productivemetalworks:item_casting' }, recipe => {
    let json = readJson(recipe);
    let cast = json.cast ? String(json.cast.item) : '';
    if (!cast.endsWith('ingot_cast') && !cast.endsWith('gem_cast')) return;
    if (!json.fluid) return;

    let name = metalName(json.fluid.tag || json.fluid.fluid);
    if (castAmount[name] === undefined) castAmount[name] = json.fluid.amount;
  });

  let rewrites = [];
  event.forEachRecipe({ type: 'productivemetalworks:item_melting' }, recipe => {
    let recipeId = String(recipe.getId());
    let match = MELTING.exec(recipeId);
    if (!match) return;

    let json = readJson(recipe);
    if (!Array.isArray(json.result) || json.result.length !== 1) return;

    let ingots = 1;
    if (match[1] === 'storage_blocks') ingots = match[2].startsWith('raw_') ? 9 : 0;

    let amount = castAmount[metalName(json.result[0].id)] * ingots;
    if (!amount || json.result[0].amount === amount) return;

    json.result[0].amount = amount;
    delete json['neoforge:conditions'];
    rewrites.push({ id: recipeId, json: json });
  });

  rewrites.forEach(rewrite => {
    event.remove({ id: rewrite.id });
    event.custom(rewrite.json).id(rewrite.id);
  });

  console.info(`[productive-metalworks] rewrote ${rewrites.length} melting recipes`);
});
