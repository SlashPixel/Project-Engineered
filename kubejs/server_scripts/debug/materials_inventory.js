const PREFIXES = ['c:ingots/', 'c:plates/', 'c:dusts/'];

ServerEvents.loaded(() => {
  const byTag = {};

  Item.getList().forEach(stack => {
    stack.tags.forEach(tag => {
      const name = String(tag).replace(/^TagKey\[.*? \/ (.*)\]$/, '$1');
      if (!PREFIXES.some(prefix => name.startsWith(prefix))) return;
      if (!byTag[name]) byTag[name] = new Set();
      byTag[name].add(String(stack.id));
    });
  });

  let duplicates = 0;

  Object.keys(byTag).sort().forEach(tag => {
    const ids = Array.from(byTag[tag]).sort();
    console.info(`[materials] ${tag} (${ids.length}): ${ids.join(', ')}`);
    if (ids.length > 1) {
      duplicates++;
      console.info(`[materials-dup] ${tag}: ${ids.join(', ')}`);
    }
  });

  console.info(`[materials] ${Object.keys(byTag).length} tags, ${duplicates} with duplicates`);
});
