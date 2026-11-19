ClientEvents.lang('en_us', event => {
  event.renameItem('productivemetalworks:fire_clay', 'Crucible Clay');
  event.renameItem('productivemetalworks:fire_brick', 'Crucible Brick');

  event.renameItem('pneumaticcraft:ingot_iron_compressed', 'Compressed Steel Ingot');
  event.renameItem('pneumaticcraft:compressed_iron_block', 'Block of Compressed Steel');
  event.renameItem('pneumaticcraft:compressed_iron_gear', 'Compressed Steel Gear');
  event.renameItem('pneumaticcraft:compressed_iron_helmet', 'Compressed Steel Helmet');
  event.renameItem('pneumaticcraft:compressed_iron_chestplate', 'Compressed Steel Chestplate');
  event.renameItem('pneumaticcraft:compressed_iron_leggings', 'Compressed Steel Leggings');
  event.renameItem('pneumaticcraft:compressed_iron_boots', 'Compressed Steel Boots');
  event.renameItem('pneumaticcraft:drill_bit_compressed_iron', 'Compressed Steel Drill Bit');

  ['black', 'blue', 'brown', 'cyan', 'gray', 'green', 'light_blue', 'light_gray', 'lime', 'magenta', 'orange', 'pink', 'purple', 'red', 'white', 'yellow'].forEach(color => {
    const name = color.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    event.renameItem(`productivemetalworks:${color}_fire_bricks`, `${name} Crucible Bricks`);
  });
});
