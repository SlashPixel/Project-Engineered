const DECOR_FURNACE_IDS = ['furnace', 'smoker', 'blast_furnace'];

DECOR_FURNACE_IDS.forEach(name => {
  const unlit = `kubejs:decor_${name}`;
  const lit = `kubejs:decor_${name}_lit`;

  [
    [unlit, lit],
    [lit, unlit]
  ].forEach(pair => {
    BlockEvents.rightClicked(pair[0], event => {
      if (event.item.id !== 'minecraft:flint_and_steel') return;

      const block = event.block;
      block.set(pair[1], { facing: block.properties.get('facing') });
      event.item.hurtAndBreak(1, event.level, event.entity, () => {});
      event.level.server.runCommandSilent(
        `playsound minecraft:item.flintandsteel.use block @a ${block.x} ${block.y} ${block.z}`
      );
      return event.success();
    });
  });
});
