StartupEvents.registry('item', event => {
  event.create('wood_ash').displayName('Wood Ash').texture('minecraft:item/sugar').color(0, 0xB0A08A);
  event.create('glass_dust').displayName('Glass Dust').texture('minecraft:item/sugar').color(0, 0xBFE6EE);
  event.create('glass_tiny_dust').displayName('Glass Tiny Dust').texture('modern_industrialization:item/iron_tiny_dust').color(0, 0xBFE6EE);
  event.create('glass_small_dust').displayName('Glass Small Dust').texture('ftbmaterials:item/iron_small_dust').color(0, 0xBFE6EE);

  event.create('crushed_limestone').displayName('Crushed Limestone').texture('minecraft:item/bone_meal').color(0, 0xD9D3BD);
  event.create('limestone_dust').displayName('Limestone Dust').texture('minecraft:item/sugar').color(0, 0xD9D3BD);
  event.create('limestone_tiny_dust').displayName('Limestone Tiny Dust').texture('modern_industrialization:item/iron_tiny_dust').color(0, 0xD9D3BD);

  event.create('silica_dust').displayName('Silica Dust').texture('minecraft:item/sugar').color(0, 0xE8E4DA);
  event.create('silica_tiny_dust').displayName('Silica Tiny Dust').texture('modern_industrialization:item/iron_tiny_dust').color(0, 0xE8E4DA);

  event.create('wrought_iron_ingot').displayName('Wrought Iron Ingot')
    .texture('kubejs:item/generated/wrought_iron_ingot');
  event.create('wrought_iron_dust').displayName('Wrought Iron Dust')
    .texture('kubejs:item/generated/wrought_iron_dust');
  event.create('wrought_iron_tiny_dust').displayName('Wrought Iron Tiny Dust')
    .texture('kubejs:item/generated/wrought_iron_tiny_dust');
});
