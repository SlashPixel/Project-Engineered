const HIDDEN_ITEMS = [
  'modern_industrialization:coke',
  'modern_industrialization:coke_dust',
  'modern_industrialization:coke_block',
  'ftbmaterials:coal_coke_gem',
  'ftbmaterials:coal_coke_dust',
  'ftbmaterials:coal_coke_block',
  'immersiveengineering:blastbrick_reinforced',
  'immersiveengineering:slab_blastbrick_reinforced'
];

const HIDDEN_CATEGORIES = ['create:fan_blasting', 'create:fan_smoking'];

RecipeViewerEvents.removeEntries('item', event => {
  HIDDEN_ITEMS.forEach(item => event.remove(item));
});

RecipeViewerEvents.removeCategories(event => {
  HIDDEN_CATEGORIES.forEach(category => event.remove(category));
});
