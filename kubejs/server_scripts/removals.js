const removed = JSON.parse(JsonIO.toString(JsonIO.read('kubejs/config/removed_content.json')));

ServerEvents.recipes(event => {
  Object.values(removed.mods).forEach(mod => mod.recipes.forEach(id => event.remove({ id })));
});
