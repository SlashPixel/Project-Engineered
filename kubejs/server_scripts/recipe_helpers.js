// priority: 1000
let RECIPE_EVENT = null;

ServerEvents.recipes(event => {
  RECIPE_EVENT = event;
});

function readRecipes(event, filter) {
  const recipes = {};
  event.forEachRecipe(filter, recipe => {
    recipes[String(recipe.getId())] = JSON.parse(JsonIO.toString(recipe.originalJson));
  });
  return recipes;
}

function replaceRecipes(event, rewrites, removals) {
  removals.forEach(id => event.remove({ id: id }));
  rewrites.forEach(rewrite => {
    event.remove({ id: rewrite.id });
    event.custom(rewrite.json).id(rewrite.id);
  });
}

function ingredient(value) {
  if (Array.isArray(value)) return value.map(ingredient);
  if (typeof value == 'object') return value;
  return value.charAt(0) == '#' ? { tag: value.substring(1) } : { item: value };
}

function stack(value) {
  if (typeof value == 'string') return { id: value, count: 1 };
  if (Array.isArray(value)) return { id: value[0], count: value[1] || 1 };
  return value;
}

function ingredientMap(keys) {
  const mapped = {};
  Object.keys(keys).forEach(symbol => {
    mapped[symbol] = ingredient(keys[symbol]);
  });
  return mapped;
}

function compact(json) {
  const result = {};
  Object.keys(json).forEach(key => {
    if (json[key] !== undefined) result[key] = json[key];
  });
  return result;
}

function addRecipe(id, json, options) {
  const fullId = id.indexOf(':') < 0 ? 'kubejs:' + id : id;
  RECIPE_EVENT.remove({ id: fullId });
  json['neoforge:conditions'] = (options || {}).conditions;
  RECIPE_EVENT.custom(JSON.parse(JSON.stringify(compact(json)))).id(fullId);
}

function miInputs(entries) {
  return entries.map(entry => {
    const spec = ingredient(entry[0]);
    spec.amount = entry[1];
    if (entry[2] !== undefined) spec.probability = entry[2];
    return spec;
  });
}

function miOutputs(entries) {
  return entries.map(entry => {
    const spec = { item: entry[0], amount: entry[1] };
    if (entry[2] !== undefined) spec.probability = entry[2];
    return spec;
  });
}

function miFluids(entries, key) {
  return entries.map(entry => {
    const spec = { amount: entry[1] };
    spec[key] = entry[0];
    if (entry[2] !== undefined) spec.probability = entry[2];
    return spec;
  });
}

const MI_MACHINES = [
  'assembler',
  'blast_furnace',
  'centrifuge',
  'chemical_reactor',
  'compressor',
  'cutting_machine',
  'distillery',
  'electrolyzer',
  'furnace',
  'implosion_compressor',
  'macerator',
  'mixer',
  'packer',
  'polarizer',
  'unpacker',
  'vacuum_freezer',
  'wiremill'
];

const mi = {};

MI_MACHINES.forEach(machine => {
  mi[machine] = (id, o) =>
    addRecipe(
      id,
      {
        type: 'modern_industrialization:' + machine,
        eu: o.eu,
        duration: o.duration,
        item_inputs: o.items ? miInputs(o.items) : undefined,
        fluid_inputs: o.fluids ? miFluids(o.fluids, 'fluid') : undefined,
        item_outputs: o.out ? miOutputs(o.out) : undefined,
        fluid_outputs: o.fluidOut ? miFluids(o.fluidOut, 'fluid') : undefined
      },
      o
    );
});

mi.forge_hammer = (id, o) =>
  addRecipe(
    id,
    {
      type: 'modern_industrialization:forge_hammer',
      damage: o.damage,
      ingredient: ingredient(o.in),
      result: stack(o.out)
    },
    o
  );

const crafting = {
  shaped: (id, o) =>
    addRecipe(
      id,
      {
        type: 'minecraft:crafting_shaped',
        category: o.category,
        pattern: o.pattern,
        key: ingredientMap(o.key),
        result: stack(o.out)
      },
      o
    ),
  shapeless: (id, o) =>
    addRecipe(
      id,
      {
        type: 'minecraft:crafting_shapeless',
        category: o.category,
        ingredients: o.ingredients.map(ingredient),
        result: stack(o.out)
      },
      o
    )
};

function cmItem(entry, mode, slots) {
  return {
    type: 'custommachinery:item',
    mode: mode,
    ingredient: Object.assign(ingredient(entry[0]), { count: entry[1] }),
    slots: slots
  };
}

function cmTool(tool) {
  return {
    type: 'custommachinery:durability',
    mode: 'input',
    ingredient: ingredient(tool.in),
    amount: tool.damage,
    break: true,
    slots: tool.slots
  };
}

const cm = {
  recipe: (id, o) =>
    addRecipe(
      id,
      {
        type: 'custommachinery:custom_machine',
        machine: o.machine,
        time: o.time,
        requirements: o.items
          .map(entry => cmItem(entry, 'input', o.slots))
          .concat(o.tool ? [cmTool(o.tool)] : [])
          .concat(o.out.map(entry => cmItem(entry, 'output', o.outSlots)))
      },
      o
    )
};

const cooking = {};

['smelting', 'blasting', 'smoking', 'campfire_cooking'].forEach(kind => {
  cooking[kind] = (id, o) =>
    addRecipe(
      id,
      {
        type: 'minecraft:' + kind,
        category: o.category,
        ingredient: ingredient(o.in),
        result: stack(o.out),
        experience: o.xp,
        cookingtime: o.time
      },
      o
    );
});

const rack = {
  drying: (id, o) =>
    addRecipe(
      id,
      {
        type: 'rackitup:drying',
        ingredient: ingredient(o.in),
        result: stack(o.out),
        time: o.time
      },
      o
    )
};

const pnc = {
  pressureChamber: (id, o) =>
    addRecipe(
      id,
      {
        type: 'pneumaticcraft:pressure_chamber',
        inputs: o.in.map(entry => Object.assign(ingredient(entry[0]), { count: entry[1] })),
        pressure: o.pressure,
        results: o.out.map(stack)
      },
      o
    ),
  explosion: (id, o) =>
    addRecipe(
      id,
      {
        type: 'pneumaticcraft:explosion_crafting',
        input: Object.assign(ingredient(o.in[0]), { count: o.in[1] }),
        loss_rate: o.lossRate,
        results: o.out.map(stack)
      },
      o
    )
};
