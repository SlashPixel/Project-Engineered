const C_BLOCK_TAGS = [
  { tag: 'c:ores_in_ground/end_stone', values: ['#c:ores_in_ground/end', 'rftoolsbase:dimensionalshard_end'] },
  { tag: 'c:ores_in_ground/netherrack', values: ['#c:ores_in_ground/nether', 'rftoolsbase:dimensionalshard_nether'] }
];

const C_ITEM_TAGS = [
  { tag: 'c:carbs/rice', values: ['farmersdelight:rice'] },
  { tag: 'c:crops', values: ['#c:crops/linseed', '#c:crops/wild_flax'] },
  { tag: 'c:crops/coffee', values: ['pamhc2crops:coffeebeanitem'] },
  { tag: 'c:crops/coffeebean', values: ['actuallyadditions:coffee_beans'] },
  { tag: 'c:crops/flax', values: ['silentgear:flax_seeds'], remove: ['pamhc2crops:flaxitem', 'supplementaries:flax'] },
  { tag: 'c:crops/linseed', values: ['pamhc2crops:flaxitem'] },
  { tag: 'c:crops/rice', values: ['actuallyadditions:rice_seeds'] },
  { tag: 'c:crops/wild_flax', values: ['supplementaries:flax'] },
  { tag: 'c:flour_plants/rice', values: ['farmersdelight:rice'] },
  { tag: 'c:grain/rice', values: ['farmersdelight:rice'] },
  { tag: 'c:ingots/steel', remove: ['oritech:biosteel_ingot'] },
  { tag: 'c:leafyvegetables/cabbage', values: ['farmersdelight:cabbage'] },
  { tag: 'c:onions/onion', values: ['farmersdelight:onion'] },
  { tag: 'c:ores_in_ground/end_stone', values: ['#c:ores_in_ground/end', 'rftoolsbase:dimensionalshard_end'] },
  { tag: 'c:ores_in_ground/netherrack', values: ['#c:ores_in_ground/nether', 'rftoolsbase:dimensionalshard_nether'] },
  { tag: 'c:paper_plants/rice', values: ['farmersdelight:rice'] },
  { tag: 'c:protein/rice', values: ['farmersdelight:rice'] },
  { tag: 'c:rootvegetables/onion', values: ['farmersdelight:onion'] },
  { tag: 'c:salad_ingredients/cabbage', values: ['farmersdelight:cabbage'] },
  { tag: 'c:salad_ingredients/tomato', values: ['farmersdelight:tomato'] },
  { tag: 'c:seeds', values: ['#c:seeds/linseed', '#c:seeds/wild_flax'] },
  { tag: 'c:seeds/cabbage', values: ['farmersdelight:cabbage_seeds'] },
  { tag: 'c:seeds/coffeebean', values: ['actuallyadditions:coffee_beans'], remove: ['pamhc2crops:coffeebeanseeditem'] },
  { tag: 'c:seeds/flax', remove: ['pamhc2crops:flaxseeditem', 'supplementaries:flax_seeds'] },
  { tag: 'c:seeds/linseed', values: ['pamhc2crops:flaxseeditem'] },
  { tag: 'c:seeds/onion', values: ['farmersdelight:onion'], remove: ['pamhc2crops:onionseeditem'] },
  { tag: 'c:seeds/rice', values: ['farmersdelight:rice'], remove: ['pamhc2crops:riceseeditem'] },
  { tag: 'c:seeds/tomato', values: ['farmersdelight:tomato_seeds'] },
  { tag: 'c:seeds/wild_flax', values: ['supplementaries:flax_seeds'] },
  { tag: 'c:vegetables/cabbage', values: ['farmersdelight:cabbage'] },
  { tag: 'c:vegetables/onion', values: ['farmersdelight:onion'] },
  { tag: 'c:vegetables/tomato', values: ['farmersdelight:tomato'] },
  { tag: 'c:vinegar_ingredients/rice', values: ['farmersdelight:rice'] },
  { tag: 'c:vinegar_ingredients/tomato', values: ['farmersdelight:tomato'] }
];

const CREATE_BLOCK_TAGS = [
  { tag: 'create:fan_processing_catalysts/blasting', replace: true },
  { tag: 'create:fan_processing_catalysts/smoking', replace: true }
];

const CREATE_FLUID_TAGS = [{ tag: 'create:fan_processing_catalysts/blasting', replace: true }];

const STONE_TIER_ORES = ['#c:ores/copper', '#c:ores/iron', '#c:ores/tin'];

const MINECRAFT_BLOCK_TAGS = [
  { tag: 'minecraft:needs_stone_tool', values: STONE_TIER_ORES },
  { tag: 'minecraft:needs_iron_tool', remove: STONE_TIER_ORES },
  { tag: 'minecraft:needs_diamond_tool', remove: STONE_TIER_ORES }
];

const MINECRAFT_ITEM_TAGS = [
  {
    tag: 'minecraft:chicken_food',
    values: ['actuallyadditions:canola_seeds', 'actuallyadditions:coffee_beans', 'farmersdelight:onion'],
    remove: ['pamhc2crops:coffeebeanseeditem', 'pamhc2crops:onionseeditem', 'pamhc2crops:riceseeditem']
  },
  { tag: 'minecraft:cow_food', values: ['farmersdelight:rice'] },
  {
    tag: 'minecraft:parrot_food',
    values: ['actuallyadditions:canola_seeds', 'actuallyadditions:coffee_beans', 'farmersdelight:onion'],
    remove: ['pamhc2crops:coffeebeanseeditem', 'pamhc2crops:onionseeditem', 'pamhc2crops:riceseeditem']
  },
  { tag: 'minecraft:pig_food', values: ['farmersdelight:onion'] },
  {
    tag: 'minecraft:rabbit_food',
    values: [
      'pamhc2crops:blackberryitem',
      'pamhc2crops:blueberryitem',
      'pamhc2crops:cactusfruititem',
      'pamhc2crops:candleberryitem',
      'pamhc2crops:cantaloupeitem',
      'pamhc2crops:cranberryitem',
      'pamhc2crops:elderberryitem',
      'pamhc2crops:grapeitem',
      'pamhc2crops:greengrapeitem',
      'pamhc2crops:huckleberryitem',
      'pamhc2crops:juniperberryitem',
      'pamhc2crops:kiwiitem',
      'minecraft:melon_slice',
      'pamhc2crops:mulberryitem',
      'pamhc2crops:pineappleitem',
      'pamhc2crops:raspberryitem',
      'pamhc2crops:spiceleafitem',
      'pamhc2crops:strawberryitem',
      'minecraft:sweet_berries',
      'minecraft:glow_berries',
      'pamhc2crops:chiaitem',
      'pamhc2crops:cloudberryitem',
      'pamhc2crops:wolfberryitem',
      'pamhc2crops:guaranaitem',
      'pamhc2crops:alfalfaitem'
    ]
  },
  { tag: 'minecraft:sheep_food', values: ['farmersdelight:rice'] },
  {
    tag: 'minecraft:villager_plantable_seeds',
    values: [
      'actuallyadditions:canola',
      'actuallyadditions:canola_seeds',
      'actuallyadditions:coffee_beans',
      'farmersdelight:cabbage',
      'farmersdelight:rice',
      'farmersdelight:tomato'
    ],
    remove: ['pamhc2crops:coffeebeanseeditem', 'pamhc2crops:onionseeditem', 'pamhc2crops:riceseeditem']
  }
];

const NUTRITIONAL_ITEM_TAGS = [
  { tag: 'nutritional:nutrient/fruit', values: ['actuallyadditions:coffee_beans'] },
  { tag: 'nutritional:nutrient/protein', values: ['actuallyadditions:coffee_beans'] },
  { tag: 'nutritional:nutrient/vegetable', values: ['actuallyadditions:canola', 'actuallyadditions:coffee_beans'] }
];

function applyTag(event, entry) {
  if (entry.replace) event.removeAll(entry.tag);
  (entry.values || []).forEach(value => event.add(entry.tag, value));
  (entry.remove || []).forEach(value => event.remove(entry.tag, value));
}

ServerEvents.tags('block', event => {
  [C_BLOCK_TAGS, CREATE_BLOCK_TAGS, MINECRAFT_BLOCK_TAGS].forEach(tags =>
    tags.forEach(entry => applyTag(event, entry))
  );
});

ServerEvents.tags('fluid', event => {
  [CREATE_FLUID_TAGS].forEach(tags => tags.forEach(entry => applyTag(event, entry)));
});

ServerEvents.tags('item', event => {
  [C_ITEM_TAGS, MINECRAFT_ITEM_TAGS, NUTRITIONAL_ITEM_TAGS].forEach(tags =>
    tags.forEach(entry => applyTag(event, entry))
  );
});
