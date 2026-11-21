ServerEvents.recipes(event => {
  event
    .custom({
      type: 'modern_industrialization:primitive_coke_oven',
      eu: 1,
      duration: 1200,
      item_inputs: [{ item: 'minecraft:coal', amount: 1 }],
      fluid_outputs: [{ fluid: 'modern_industrialization:creosote', amount: 500 }],
      item_outputs: [{ item: 'immersiveengineering:coal_coke', amount: 1 }]
    })
    .id('kubejs:primitive_coke_oven/coal_to_coal_coke');

  event
    .custom({
      type: 'modern_industrialization:primitive_coke_oven',
      eu: 1,
      duration: 200,
      item_inputs: [{ tag: 'minecraft:logs_that_burn', amount: 1 }],
      item_outputs: [
        { item: 'minecraft:charcoal', amount: 1 },
        { item: 'kubejs:wood_ash', amount: 1 }
      ]
    })
    .id('kubejs:primitive_coke_oven/logs_to_charcoal');

  event
    .custom({
      type: 'modern_industrialization:coke_oven',
      eu: 2,
      duration: 100,
      item_inputs: [{ tag: 'minecraft:logs_that_burn', amount: 1 }],
      item_outputs: [
        { item: 'minecraft:charcoal', amount: 1 },
        { item: 'kubejs:wood_ash', amount: 1 }
      ]
    })
    .id('kubejs:coke_oven/logs_to_charcoal');

  event
    .shaped('mi_tweaks:primitive_coke_oven', ['BBB', 'BFB', 'BBB'], {
      B: 'minecraft:brick',
      F: 'kubejs:furnace_core'
    })
    .id('kubejs:primitive_coke_oven');

  event.remove({ id: 'modern_industrialization:steam_age/fireclay/coke_oven' });
  event.remove({ id: 'modern_industrialization:steam_age/fireclay/packer/coke_oven' });
  event
    .shaped('modern_industrialization:coke_oven', ['BBB', 'SPS', 'BBB'], {
      B: 'minecraft:brick',
      S: 'modern_industrialization:steam_bucket',
      P: 'mi_tweaks:primitive_coke_oven'
    })
    .id('kubejs:coke_oven_from_primitive');
});
