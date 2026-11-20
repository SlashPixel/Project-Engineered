const SILK_TOUCH = {
  condition: 'minecraft:match_tool',
  predicate: {
    predicates: {
      'minecraft:enchantments': [{ enchantments: 'minecraft:silk_touch', levels: { min: 1 } }]
    }
  }
};

const MINECRAFT = [
  { table: 'minecraft:chests/village/village_snowy_house', replace: { 'minecraft:furnace': 'kubejs:decor_furnace' } },
  { table: 'minecraft:blocks/glass', addWithoutSilkTouch: ['kubejs:silica_dust'] }
];

const PAMHC2CROPS = [
  { table: 'pamhc2crops:blocks/frostgarden', remove: ['pamhc2crops:cabbageitem'] },
  { table: 'pamhc2crops:blocks/shadedgarden', remove: ['pamhc2crops:tomatoitem'] },
  { table: 'pamhc2crops:blocks/soggygarden', remove: ['pamhc2crops:riceitem'] },
  { table: 'pamhc2crops:blocks/tropicalgarden', remove: ['pamhc2crops:coffeebeanitem'] },
  { table: 'pamhc2crops:blocks/windygarden', remove: ['pamhc2crops:canolaitem', 'pamhc2crops:onionitem'] }
];

const FTBMATERIALS_DIMENSIONS = ['end', 'nether'];

const FTBMATERIALS_DROPS = {
  antimony: 'modern_industrialization:raw_antimony',
  bauxite: 'modern_industrialization:bauxite_dust',
  coal: 'minecraft:coal',
  lead: 'modern_industrialization:raw_lead',
  monazite: 'modern_industrialization:monazite_dust',
  nickel: 'modern_industrialization:raw_nickel',
  tin: 'modern_industrialization:raw_tin',
  tungsten: 'modern_industrialization:raw_tungsten',
  uranium: 'modern_industrialization:raw_uranium'
};

const KUBEJS_LIT_DROPS = {
  'kubejs:blocks/decor_blast_furnace_lit': 'kubejs:decor_blast_furnace',
  'kubejs:blocks/decor_furnace_lit': 'kubejs:decor_furnace',
  'kubejs:blocks/decor_smoker_lit': 'kubejs:decor_smoker'
};

LootJS.lootTables(event => {
  [MINECRAFT, PAMHC2CROPS].forEach(rules =>
    rules.forEach(rule => {
      const table = event.getLootTable(rule.table);

      (rule.remove || []).forEach(id => table.removeEntry(entry => String(entry.item.id) === id));

      Object.keys(rule.replace || {}).forEach(id =>
        table.modifyItemEntry(entry => {
          if (String(entry.item.id) === id) entry.item = Item.of(rule.replace[id]).item;
          return entry;
        })
      );

      (rule.addWithoutSilkTouch || []).forEach(id =>
        table.createPool(pool => {
          pool.when(conditions =>
            conditions.matchCustomCondition({ condition: 'minecraft:inverted', term: SILK_TOUCH })
          );
          pool.addEntry(LootEntry.of(Item.of(id)));
        })
      );
    })
  );

  FTBMATERIALS_DIMENSIONS.forEach(dimension =>
    Object.keys(FTBMATERIALS_DROPS).forEach(ore => {
      const block = `ftbmaterials:${ore}_${dimension}_ore`;
      const id = `ftbmaterials:blocks/${ore}_${dimension}_ore`;
      const table = event.hasLootTable(id) ? event.getLootTable(id).clear() : event.create(id, 'block');

      table.createPool(pool => {
        pool.addEntry(
          LootEntry.alternative(
            LootEntry.of(Item.of(block)).when(conditions => conditions.matchCustomCondition(SILK_TOUCH)),
            LootEntry.of(Item.of(FTBMATERIALS_DROPS[ore])).applyOreBonus('minecraft:fortune').simulateExplosionDecay()
          )
        );
      });
    })
  );

  Object.keys(KUBEJS_LIT_DROPS).forEach(id =>
    event.create(id, 'block').createPool(pool => {
      pool.when(conditions => conditions.survivesExplosion());
      pool.addEntry(LootEntry.of(Item.of(KUBEJS_LIT_DROPS[id])));
    })
  );
});
