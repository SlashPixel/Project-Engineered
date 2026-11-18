const NEEDS_TAGS = [
  'minecraft:needs_stone_tool',
  'minecraft:needs_iron_tool',
  'silentgear:needs_copper_tool'
];

const TIERS = {
  wood: [],
  stone: ['minecraft:needs_stone_tool'],
  copper: ['minecraft:needs_iron_tool', 'silentgear:needs_copper_tool'],
  bronze: ['minecraft:needs_iron_tool']
};

const LOGGED_TAGS = NEEDS_TAGS.concat([
  'minecraft:needs_diamond_tool',
  'minecraft:mineable/pickaxe',
  'c:ores/tin'
]);

ServerEvents.tags('block', event => {
  function setTier(selector, tier) {
    NEEDS_TAGS.forEach(tag => event.remove(tag, selector));
    TIERS[tier].forEach(tag => event.add(tag, selector));
    event.add('minecraft:mineable/pickaxe', selector);
  }

  setTier('#c:ores/tin', 'copper');
});
