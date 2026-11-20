const MELTING = /^productivemetalworks:melting\/(ores|raw_materials|storage_blocks)\/(.+)$/;

function metalName(fluid) {
  return String(fluid).replace(/^.*molten_/, '');
}

ServerEvents.recipes(event => {
  event.remove({ id: /productivemetalworks:alloying\// });
  event.remove({ id: /oritech:compat\/productivemetalworks\/alloying\// });

  const castAmount = {};
  const casting = readRecipes(event, { type: 'productivemetalworks:item_casting' });
  Object.keys(casting).forEach(id => {
    const json = casting[id];
    const cast = json.cast ? String(json.cast.item) : '';
    if (!cast.endsWith('ingot_cast') && !cast.endsWith('gem_cast')) return;
    if (!json.fluid) return;

    const name = metalName(json.fluid.tag || json.fluid.fluid);
    if (castAmount[name] === undefined) castAmount[name] = json.fluid.amount;
  });

  const rewrites = [];
  const melting = readRecipes(event, { type: 'productivemetalworks:item_melting' });
  Object.keys(melting).forEach(recipeId => {
    const match = MELTING.exec(recipeId);
    if (!match) return;

    const json = melting[recipeId];
    if (!Array.isArray(json.result) || json.result.length !== 1) return;

    let ingots = 1;
    if (match[1] === 'storage_blocks') ingots = match[2].startsWith('raw_') ? 9 : 0;

    const amount = castAmount[metalName(json.result[0].id)] * ingots;
    if (!amount || json.result[0].amount === amount) return;

    json.result[0].amount = amount;
    delete json['neoforge:conditions'];
    rewrites.push({ id: recipeId, json: json });
  });

  replaceRecipes(event, rewrites, []);

  console.info(`[productive-metalworks] rewrote ${rewrites.length} melting recipes`);
});
