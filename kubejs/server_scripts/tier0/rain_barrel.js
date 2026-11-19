const RAIN_BARREL = 'custommachinery:custom_machine_item[custommachinery:machine="custommachinery:rain_barrel"]';

ServerEvents.recipes(event => {
  const BARREL = 'custommachinery:rain_barrel';

  event.shaped(RAIN_BARREL, [
    'P P',
    'I I',
    'LLL'
  ], {
    L: '#minecraft:logs',
    P: '#minecraft:planks',
    I: 'minecraft:iron_ingot'
  }).id('kubejs:rain_barrel');

  const fill = (weather, amount) =>
    event.recipes.custommachinery
      .custom_machine(BARREL, 20)
      .mustSeeSky()
      .requireWeatherOnMachine(weather)
      .produceFluid(Fluid.of('minecraft:water', amount))
      .resetOnError()
      .id(`kubejs:rain_barrel/${weather}`);

  fill('clear', 20);
  fill('rain', 200);
  fill('snow', 200);
  fill('thunder', 200);
});
