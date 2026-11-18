ServerEvents.loaded(event => {
  let rules = {};
  try {
    rules = JSON.parse(JsonIO.readString('kubejs/config/gamerules.json'));
  } catch (e) {
    console.warn('[gamerules] could not read kubejs/config/gamerules.json');
    return;
  }

  Object.keys(rules).forEach(rule => {
    event.server.runCommand(`gamerule ${rule} ${rules[rule]}`);
    console.info(`[gamerules] ${rule} = ${rules[rule]}`);
  });
});
