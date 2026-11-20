ServerEvents.recipes(() => {
  cooking.smelting('smelting/clinker_brick', {
    in: 'minecraft:bricks',
    out: 'immersiveengineering:clinker_brick',
    xp: 0.1,
    time: 200,
    category: 'blocks'
  });

  cooking.smelting('smelting/empty_pcb', {
    in: 'pneumaticcraft:failed_pcb',
    out: 'pneumaticcraft:empty_pcb',
    xp: 0.25,
    time: 100,
    category: 'misc'
  });

  cooking.smelting('smelting/smoked_ham', {
    in: 'farmersdelight:ham',
    out: 'farmersdelight:smoked_ham',
    xp: 0.35,
    time: 200,
    category: 'food'
  });

  cooking.campfire_cooking('campfire_wood_ash', {
    in: '#minecraft:logs_that_burn',
    out: 'kubejs:wood_ash',
    xp: 0.1,
    time: 600,
    category: 'misc'
  });
});
