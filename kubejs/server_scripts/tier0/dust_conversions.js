const SIZES = {
  tiny: { tag: 'c:tiny_dusts', count: 9, pattern: ['xxx', 'xxx', 'xxx'] },
  small: { tag: 'c:small_dusts', count: 4, pattern: ['xx', 'xx'] }
};

const MATERIALS = {
  glass: ['tiny', 'small'],
  limestone: ['tiny'],
  silica: ['tiny'],
  wrought_iron: ['tiny']
};

ServerEvents.tags('item', event => {
  Object.keys(MATERIALS).forEach(material => {
    const dust = `kubejs:${material}_dust`;
    event.add('c:dusts', dust);
    event.add(`c:dusts/${material}`, dust);

    MATERIALS[material].forEach(sizeName => {
      const item = `kubejs:${material}_${sizeName}_dust`;
      event.add(SIZES[sizeName].tag, item);
      event.add(`${SIZES[sizeName].tag}/${material}`, item);
    });
  });
});

ServerEvents.recipes(event => {
  Object.keys(MATERIALS).forEach(material => {
    const dust = `kubejs:${material}_dust`;

    MATERIALS[material].forEach(sizeName => {
      const size = SIZES[sizeName];
      const name = `${material}_${sizeName}_dust`;
      const item = `kubejs:${name}`;
      const tag = `${size.tag}/${material}`;

      event.shaped(dust, size.pattern, { x: `#${tag}` }).id(`kubejs:${name}_to_dust`);

      event.shapeless(Item.of(item, size.count), dust).id(`kubejs:${name}_from_dust`);

      event.custom({
        type: 'modern_industrialization:packer',
        duration: 100,
        eu: 2,
        item_inputs: [{ amount: size.count, tag }],
        item_outputs: [{ amount: 1, item: dust }]
      }).id(`kubejs:packer/${name}`);

      event.custom({
        type: 'modern_industrialization:unpacker',
        duration: 100,
        eu: 2,
        item_inputs: [{ amount: 1, tag: `c:dusts/${material}` }],
        item_outputs: [{ amount: size.count, item }]
      }).id(`kubejs:unpacker/${name}`);
    });
  });
});
