ServerEvents.recipes(() => {
  crafting.shaped('minecraft:enchanting_table', {
    pattern: [' B ', 'D#D', '###'],
    key: { B: 'minecraft:enchanted_book', D: '#c:gems/diamond', '#': 'minecraft:obsidian' },
    out: 'minecraft:enchanting_table',
    category: 'misc'
  });

  crafting.shaped('pneumaticcraft:universal_sensor', {
    pattern: [' S ', 'PRP', 'PCP'],
    key: {
      C: 'pneumaticcraft:pressure_tube',
      P: '#pneumaticcraft:plastic_sheets',
      R: 'minecraft:repeater',
      S: 'minecraft:ender_eye'
    },
    out: 'pneumaticcraft:universal_sensor',
    category: 'misc'
  });
});
