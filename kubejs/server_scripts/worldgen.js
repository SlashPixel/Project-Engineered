const REMOVE_ORES_ACTUALLYADDITIONS = ['ore_black_quartz'];

const REMOVE_ORES_AD_ASTRA = [
  'glacio_coal_ore',
  'glacio_copper_ore',
  'glacio_deepslate_coal_ore',
  'glacio_deepslate_copper_ore',
  'glacio_deepslate_iron_ore',
  'glacio_deepslate_lapis_ore',
  'glacio_ice_shard_ore',
  'glacio_iron_ore',
  'glacio_lapis_ore',
  'mars_diamond_ore',
  'mars_ice_shard_ore',
  'mars_iron_ore',
  'mars_ostrum_ore',
  'mercury_iron_ore',
  'moon_cheese_ore',
  'moon_desh_ore',
  'moon_ice_shard_ore',
  'moon_iron_ore',
  'venus_calorite_ore',
  'venus_coal_ore',
  'venus_diamond_ore',
  'venus_gold_ore'
];

const REMOVE_ORES_CREATE = ['zinc_ore'];

const REMOVE_ORES_EXCESSIVE_UTILITIES = [
  'depths_ore_coal_lower',
  'depths_ore_coal_upper',
  'depths_ore_copper',
  'depths_ore_copper_large',
  'depths_ore_diamond',
  'depths_ore_diamond_buried',
  'depths_ore_diamond_large',
  'depths_ore_diamond_medium',
  'depths_ore_emerald',
  'depths_ore_emerald_extra',
  'depths_ore_gold',
  'depths_ore_gold_extra',
  'depths_ore_gold_lower',
  'depths_ore_iron_middle',
  'depths_ore_iron_small',
  'depths_ore_iron_upper',
  'depths_ore_iron_upper_extra',
  'depths_ore_lapis',
  'depths_ore_lapis_buried',
  'depths_ore_redstone',
  'depths_ore_redstone_lower'
];

const REMOVE_ORES_IMMERSIVEENGINEERING = ['bauxite', 'deep_nickel', 'lead', 'nickel', 'silver', 'uranium'];

const REMOVE_ORES_MEKANISM = [
  'ore_fluorite_buried',
  'ore_fluorite_normal',
  'ore_lead_normal',
  'ore_osmium_middle',
  'ore_osmium_small',
  'ore_osmium_upper',
  'ore_tin_large',
  'ore_tin_small',
  'ore_uranium_buried',
  'ore_uranium_small',
  'salt'
];

const REMOVE_ORES_MINECRAFT = [
  'ore_coal_lower',
  'ore_coal_upper',
  'ore_copper',
  'ore_copper_large',
  'ore_diamond',
  'ore_diamond_buried',
  'ore_diamond_large',
  'ore_diamond_medium',
  'ore_emerald',
  'ore_gold',
  'ore_gold_extra',
  'ore_gold_lower',
  'ore_iron_middle',
  'ore_iron_small',
  'ore_iron_upper',
  'ore_lapis',
  'ore_lapis_buried',
  'ore_redstone',
  'ore_redstone_lower'
];

const REMOVE_ORES_MODERN_INDUSTRIALIZATION = [
  'deepslate_ore_generator_antimony',
  'deepslate_ore_generator_bauxite',
  'deepslate_ore_generator_lead',
  'deepslate_ore_generator_lignite_coal',
  'deepslate_ore_generator_monazite',
  'deepslate_ore_generator_nickel',
  'deepslate_ore_generator_salt',
  'deepslate_ore_generator_tin',
  'deepslate_ore_generator_tungsten',
  'deepslate_ore_generator_uranium',
  'ore_generator_antimony',
  'ore_generator_bauxite',
  'ore_generator_lead',
  'ore_generator_lignite_coal',
  'ore_generator_monazite',
  'ore_generator_nickel',
  'ore_generator_salt',
  'ore_generator_tin',
  'ore_generator_tungsten',
  'ore_generator_uranium'
];

const REMOVE_ORES_ORITECH = ['ore_nickel', 'ore_platinum', 'uranium_patch'];

const REMOVE_ORES_REPLICATION = ['replica_ore_deepslate'];

const REMOVE_ORES_RFTOOLSBASE = ['dimshard_dimensions', 'dimshard_overworld'];

const REMOVE_ORES_SILENTGEAR = ['bort_ore'];

const REMOVE_ORES_TERRALITH = ['cave/fungal/ore_coal_extra'];

const REMOVE_ORES_BY_NAMESPACE = {
  actuallyadditions: REMOVE_ORES_ACTUALLYADDITIONS,
  ad_astra: REMOVE_ORES_AD_ASTRA,
  create: REMOVE_ORES_CREATE,
  excessive_utilities: REMOVE_ORES_EXCESSIVE_UTILITIES,
  immersiveengineering: REMOVE_ORES_IMMERSIVEENGINEERING,
  mekanism: REMOVE_ORES_MEKANISM,
  minecraft: REMOVE_ORES_MINECRAFT,
  modern_industrialization: REMOVE_ORES_MODERN_INDUSTRIALIZATION,
  oritech: REMOVE_ORES_ORITECH,
  replication: REMOVE_ORES_REPLICATION,
  rftoolsbase: REMOVE_ORES_RFTOOLSBASE,
  silentgear: REMOVE_ORES_SILENTGEAR,
  terralith: REMOVE_ORES_TERRALITH
};

const REMOVE_ORES_BIOMES = {
  overworld: '#minecraft:is_overworld',
  extra: [
    'ad_astra:glacio_ice_peaks',
    'ad_astra:glacio_snowy_barrens',
    'ad_astra:infernal_venus_barrens',
    'ad_astra:lunar_wastelands',
    'ad_astra:martian_canyon_creek',
    'ad_astra:martian_polar_caps',
    'ad_astra:martian_wastelands',
    'ad_astra:mercury_deltas',
    'ad_astra:venus_wastelands',
    'excessive_utilities:the_depths',
    'nuclearcraftneohaul:nuclear_wasteland',
    'terralith:deep_warm_ocean',
    'terralith:skylands_autumn',
    'terralith:skylands_spring',
    'terralith:skylands_summer',
    'terralith:skylands_winter'
  ]
};

const REMOVE_ORES_FEATURES = [];

Object.keys(REMOVE_ORES_BY_NAMESPACE).forEach(namespace =>
  REMOVE_ORES_BY_NAMESPACE[namespace].forEach(path => REMOVE_ORES_FEATURES.push(namespace + ':' + path))
);

ServerEvents.generateData('after_mods', event => {
  Object.keys(REMOVE_ORES_BIOMES).forEach(group =>
    event.json('pe:neoforge/biome_modifier/remove_foreign_ores_' + group, {
      type: 'neoforge:remove_features',
      biomes: REMOVE_ORES_BIOMES[group],
      features: REMOVE_ORES_FEATURES
    })
  );
});
