const DECOR_JOB_SITES = {
  'minecraft:butcher': ['kubejs:decor_smoker', 'kubejs:decor_smoker_lit'],
  'minecraft:armorer': ['kubejs:decor_blast_furnace', 'kubejs:decor_blast_furnace_lit']
};

NativeEvents.onEvent(Java.loadClass('net.neoforged.neoforge.common.world.poi.ExtendPoiTypesEvent'), event => {
  Object.keys(DECOR_JOB_SITES).forEach(poi => {
    DECOR_JOB_SITES[poi].forEach(block => event.addBlockToPoi(poi, block));
  });
});
