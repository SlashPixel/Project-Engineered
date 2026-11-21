const STONE_FURNACE = 'custommachinery:stone_furnace';
const STONE_FURNACE_ITEM =
  'custommachinery:custom_machine_item[custommachinery:machine="custommachinery:stone_furnace"]';
const CLAY_KILN_ITEM = 'custommachinery:custom_machine_item[custommachinery:machine="custommachinery:clay_kiln"]';

const STONE_FURNACE_SHELL = [
  ['BBB', 'BBB', 'BBB'],
  ['SSS', 'SmS', 'SAS'],
  [' B ', 'BCB', ' B ']
];

const STONE_FURNACE_KEYS = {
  B: ['minecraft:stone_bricks', 'minecraft:hopper'],
  S: ['minecraft:stone_bricks', 'minecraft:hopper', 'minecraft:air'],
  A: ['minecraft:air'],
  C: ['minecraft:campfire[lit=true]']
};

const STONE_FURNACE_TIME_MULT = 1.5;
const STONE_FURNACE_METALS = [
  'iron',
  'copper',
  'gold',
  'tin',
  'lead',
  'silver',
  'nickel',
  'zinc',
  'aluminum',
  'osmium',
  'uranium',
  'platinum',
  'titanium',
  'tungsten',
  'antimony',
  'iridium'
];

ServerEvents.recipes(event => {
  event
    .shaped(STONE_FURNACE_ITEM, ['SSS', 'SKS', 'SCS'], {
      S: 'minecraft:stone',
      K: CLAY_KILN_ITEM,
      C: 'kubejs:furnace_core'
    })
    .id('kubejs:stone_furnace');

  const furnace = (name, input, outputs, time) => {
    [1, 2].forEach(batch => {
      const builder = event.recipes.custommachinery
        .custom_machine(STONE_FURNACE, Math.ceil(time * STONE_FURNACE_TIME_MULT))
        .priority(batch == 1 ? 0 : 1)
        .requireStructure(STONE_FURNACE_SHELL, STONE_FURNACE_KEYS)
        .requireItem(`${batch}x ${input}`, ['input'])
        .requireFuel(batch);
      outputs.forEach(output => {
        for (let i = 0; i < (output.chance === undefined ? 1 : batch); i++) {
          builder.produceItem(Item.of(output.item, output.chance === undefined ? output.count * batch : output.count), [
            'output'
          ]);
          if (output.chance !== undefined) builder.chance(output.chance);
        }
      });
      builder.id(`kubejs:stone_furnace/${name}${batch == 1 ? '' : '_x2'}`);
    });
  };

  STONE_FURNACE_METALS.forEach(metal => {
    const raw = `#c:raw_materials/${metal}`;
    const nugget = AlmostUnified.getTagTargetItem(`c:nuggets/${metal}`);
    if (Ingredient.of(raw).isEmpty() || nugget.isEmpty()) return;
    furnace(
      `nuggets/${metal}`,
      raw,
      [
        { item: nugget.id, count: 4 },
        { item: nugget.id, count: 1, chance: 0.5 }
      ],
      200
    );
  });

  furnace('wrought_iron_ingot', 'minecraft:iron_ingot', [{ item: 'kubejs:wrought_iron_ingot', count: 1 }], 200);

  const smelting = [];
  event.forEachRecipe({ type: 'minecraft:smelting' }, recipe => {
    const json = JSON.parse(JsonIO.toString(recipe.originalJson));
    const inputs = Array.isArray(json.ingredient) ? json.ingredient : [json.ingredient];
    const result = typeof json.result == 'string' ? { id: json.result } : json.result;
    inputs.forEach((input, index) => {
      smelting.push({
        id: String(recipe.getId()).replace(/[^a-z0-9]+/g, '_') + (inputs.length > 1 ? '_' + index : ''),
        input: input.tag ? '#' + input.tag : input.item,
        result: result.id,
        count: result.count || 1,
        time: json.cookingtime || 200
      });
    });
  });

  smelting.forEach(entry => {
    if (!entry.input) return;
    furnace(`smelting/${entry.id}`, entry.input, [{ item: entry.result, count: entry.count }], entry.time);
  });
});
