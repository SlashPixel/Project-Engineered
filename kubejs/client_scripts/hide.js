const removed = JSON.parse(JsonIO.toString(JsonIO.read('kubejs/config/removed_content.json')));

RecipeViewerEvents.removeEntries('item', event => {
  Object.values(removed.mods).forEach(mod => mod.items.forEach(id => event.remove(id)));
});

RecipeViewerEvents.removeCategories(event => {
  removed.categories.forEach(id => event.remove(id));
});
