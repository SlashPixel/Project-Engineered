const CUSTOM_ORES = JSON.parse(JsonIO.toString(JsonIO.read('kubejs/config/custom_ores.json'))).ores;

const ORE_VEIN_SIZE = 8;

const ORE_HOSTS = {
  stone: {
    replaceable: 'minecraft:stone_ore_replaceables',
    biomes: '#minecraft:is_overworld',
    minY: 0,
    maxY: 96,
    count: 8
  },
  deepslate: {
    replaceable: 'minecraft:deepslate_ore_replaceables',
    biomes: '#minecraft:is_overworld',
    minY: -60,
    maxY: 0,
    count: 6
  },
  netherrack: {
    replaceable: 'minecraft:base_stone_nether',
    biomes: '#minecraft:is_nether',
    minY: 10,
    maxY: 117,
    count: 10
  }
};

function oreBlockId(ore) {
  return `${ore.host === 'deepslate' ? 'deepslate_' : ''}${ore.id}_ore`;
}

ServerEvents.tags('block', event => {
  CUSTOM_ORES.forEach(ore => {
    event.add('c:ores', `kubejs:${oreBlockId(ore)}`);
    event.add(`c:ores/${ore.id}`, `kubejs:${oreBlockId(ore)}`);
    event.add(`c:ores_in_ground/${ore.host}`, `kubejs:${oreBlockId(ore)}`);
  });
});

ServerEvents.tags('item', event => {
  CUSTOM_ORES.forEach(ore => {
    event.add('c:ores', `kubejs:${oreBlockId(ore)}`);
    event.add(`c:ores/${ore.id}`, `kubejs:${oreBlockId(ore)}`);
    event.add(`c:raw_materials/${ore.id}`, `kubejs:raw_${ore.id}`);
  });
});

LootJS.lootTables(event => {
  CUSTOM_ORES.forEach(ore => {
    const block = `kubejs:${oreBlockId(ore)}`;
    const id = `kubejs:blocks/${oreBlockId(ore)}`;
    const table = event.hasLootTable(id) ? event.getLootTable(id).clear() : event.create(id, 'block');

    table.createPool(pool => {
      pool.addEntry(
        LootEntry.alternative(
          LootEntry.of(Item.of(block)).when(conditions => conditions.matchCustomCondition(SILK_TOUCH)),
          LootEntry.of(Item.of(`kubejs:raw_${ore.id}`)).applyOreBonus('minecraft:fortune').simulateExplosionDecay()
        )
      );
    });
  });
});

ServerEvents.generateData('after_mods', event => {
  CUSTOM_ORES.forEach(ore => {
    const host = ORE_HOSTS[ore.host];
    const feature = `ore_${oreBlockId(ore)}`;

    event.json(`pe:worldgen/configured_feature/${feature}`, {
      type: 'minecraft:ore',
      config: {
        size: ORE_VEIN_SIZE,
        discard_chance_on_air_exposure: 0,
        targets: [
          {
            target: { predicate_type: 'minecraft:tag_match', tag: host.replaceable },
            state: { Name: `kubejs:${oreBlockId(ore)}` }
          }
        ]
      }
    });

    event.json(`pe:worldgen/placed_feature/${feature}`, {
      feature: `pe:${feature}`,
      placement: [
        { type: 'minecraft:count', count: host.count },
        { type: 'minecraft:in_square' },
        {
          type: 'minecraft:height_range',
          height: {
            type: 'minecraft:uniform',
            min_inclusive: { absolute: host.minY },
            max_inclusive: { absolute: host.maxY }
          }
        },
        { type: 'minecraft:biome' }
      ]
    });

    event.json(`pe:neoforge/biome_modifier/add_${feature}`, {
      type: 'neoforge:add_features',
      biomes: host.biomes,
      features: `pe:${feature}`,
      step: 'underground_ores'
    });
  });
});
