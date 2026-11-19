const DISABLED_FAN_TYPES = ['blasting', 'smoking'];

['block', 'fluid'].forEach(registry => {
  ServerEvents.tags(registry, event => {
    DISABLED_FAN_TYPES.forEach(type => event.removeAll(`create:fan_processing_catalysts/${type}`));
  });
});
