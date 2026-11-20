const GLASS_DUST = 'kubejs:glass_dust';
const MIX = ['kubejs:silica_dust', 'kubejs:wood_ash', 'kubejs:limestone_dust'];

ServerEvents.recipes(event => {
  ['minecraft:smelting', 'minecraft:blasting'].forEach(type => event.remove({ output: 'minecraft:glass', type }));

  event.remove({ id: 'productivemetalworks:melting/sand' });

  event.shapeless(Item.of(GLASS_DUST, 2), MIX).id('kubejs:glass_dust');

  const mixer = event.recipes.modern_industrialization.mixer(2, 100);
  MIX.forEach(item => mixer.itemIn(item));
  mixer.itemOut(`3x ${GLASS_DUST}`).id('kubejs:mixer/glass_dust');

  event
    .custom({
      type: 'productivemetalworks:item_melting',
      ingredient: { item: GLASS_DUST },
      maximum_temperature: 0,
      minimum_temperature: 1400,
      result: [{ amount: 1000, id: 'productivemetalworks:molten_glass' }]
    })
    .id('kubejs:melting/glass_dust');
});
