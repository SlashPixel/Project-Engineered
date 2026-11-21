ServerEvents.recipes(event => {
  event
    .custom({
      type: 'treetap:tap_extract',
      log: { item: 'minecraft:jungle_log' },
      required_block_count: 6,
      processing_time: 2400,
      result: { id: 'industrialforegoing:latex_bucket' },
      collect_bucket: true,
      display_fluid: { fluid: 'industrialforegoing:latex' },
      particle_color: '#e8e0c8'
    })
    .id('kubejs:treetap/latex_from_jungle_log');

  event.remove({ id: 'treetap:tap' });
  event
    .shaped('treetap:tap', ['RIR', 'RPR'], {
      R: '#c:rods/copper',
      I: '#c:ingots/copper',
      P: '#c:plates/copper'
    })
    .id('kubejs:treetap/tap');
});
