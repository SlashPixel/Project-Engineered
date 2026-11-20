const CORE_SWAPS = {
  'minecraft:furnace': 'kubejs:furnace_core',
  'minecraft:smoker': 'kubejs:smoker_core',
  'minecraft:blast_furnace': 'kubejs:blast_furnace_core'
};

const FURNACE_TAG = 'c:player_workstations/furnaces';

const REWRITE_IDS = [
  'immersive_aircraft:engine',
  'immersive_aircraft:steel_boiler',
  'immersive_aircraft:boiler',
  'industrialforegoing:dissolution_chamber/processing_addon_tier_1',
  'industrialforegoing:dissolution_chamber/processing_addon_tier_2',
  'industrialforegoing:dissolution_chamber/industrialforegoing.processing_addon_tier_2',
  'industrialforegoing:dissolution_chamber/processing_addon_3',
  'industrialforegoing:dissolution_chamber/processing_addon_4',
  'industrialforegoing:dissolution_chamber/processing_addon_5',
  'industrialforegoing:dissolution_chamber/processing_addon_6',
  'industrialforegoing:dissolution_chamber/processing_addon_7',
  'industrialforegoing:dissolution_chamber/processing_addon_8'
];

function swapCores(node) {
  if (typeof node === 'string') return CORE_SWAPS[node] || node;
  if (Array.isArray(node)) return node.map(swapCores);
  if (node && typeof node === 'object') {
    if (node.tag === FURNACE_TAG) return { item: CORE_SWAPS['minecraft:furnace'] };

    let swapped = {};
    Object.keys(node).forEach(key => {
      swapped[key] = key === 'result' ? node[key] : swapCores(node[key]);
    });
    return swapped;
  }
  return node;
}

ServerEvents.recipes(event => {
  Object.keys(CORE_SWAPS).forEach(vanilla => {
    event.replaceInput({}, vanilla, CORE_SWAPS[vanilla]);
  });

  const recipes = readRecipes(event, { or: REWRITE_IDS.map(id => ({ id: id })) });
  const rewrites = Object.keys(recipes).map(id => {
    const json = swapCores(recipes[id]);
    delete json['neoforge:conditions'];
    return { id: id, json: json };
  });
  replaceRecipes(event, rewrites, []);

  console.info(`[furnace-cores] rewrote ${rewrites.length}/${REWRITE_IDS.length} recipes by id`);
});
