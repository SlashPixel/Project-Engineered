const DECOR_FURNACE_ITEMS = ['kubejs:decor_furnace', 'kubejs:decor_smoker', 'kubejs:decor_blast_furnace'];

ItemEvents.modifyTooltips(event => {
  event.add(DECOR_FURNACE_ITEMS, [Text.translate('tooltip.kubejs.decor_furnace').gray()]);
});
