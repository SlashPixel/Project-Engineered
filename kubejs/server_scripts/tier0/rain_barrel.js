ServerEvents.recipes(event => {
  event.recipes.custommachinery.custom_machine('custommachinery:rain_barrel', 20)
    .produceFluid(Fluid.of('minecraft:water', 20));

  event.recipes.custommachinery.custom_machine('custommachinery:rain_barrel', 20)
    .requireWeather('rain')
    .produceFluid(Fluid.of('minecraft:water', 200));
});
