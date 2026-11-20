StartupEvents.registry('item', event => {
  event.create('wood_ash').displayName('Wood Ash').texture('minecraft:item/sugar').color(0, 0xb0a08a);
  event.create('glass_dust').displayName('Glass Dust').texture('minecraft:item/sugar').color(0, 0xbfe6ee);
  event
    .create('glass_tiny_dust')
    .displayName('Glass Tiny Dust')
    .texture('modern_industrialization:item/iron_tiny_dust')
    .color(0, 0xbfe6ee);
  event
    .create('glass_small_dust')
    .displayName('Glass Small Dust')
    .texture('ftbmaterials:item/iron_small_dust')
    .color(0, 0xbfe6ee);

  event
    .create('crushed_limestone')
    .displayName('Crushed Limestone')
    .texture('minecraft:item/bone_meal')
    .color(0, 0xd9d3bd);
  event.create('limestone_dust').displayName('Limestone Dust').texture('minecraft:item/sugar').color(0, 0xd9d3bd);
  event
    .create('limestone_tiny_dust')
    .displayName('Limestone Tiny Dust')
    .texture('modern_industrialization:item/iron_tiny_dust')
    .color(0, 0xd9d3bd);

  event.create('silica_dust').displayName('Silica Dust').texture('minecraft:item/sugar').color(0, 0xe8e4da);
  event
    .create('silica_tiny_dust')
    .displayName('Silica Tiny Dust')
    .texture('modern_industrialization:item/iron_tiny_dust')
    .color(0, 0xe8e4da);

  event
    .create('wrought_iron_ingot')
    .displayName('Wrought Iron Ingot')
    .texture('minecraft:item/iron_ingot')
    .color(0, 0xc4ac6c);
  event
    .create('wrought_iron_dust')
    .displayName('Wrought Iron Dust')
    .texture('modern_industrialization:item/iron_dust')
    .color(0, 0xc4ac6c);
  event
    .create('wrought_iron_tiny_dust')
    .displayName('Wrought Iron Tiny Dust')
    .texture('modern_industrialization:item/iron_tiny_dust')
    .color(0, 0xc4ac6c);
});
