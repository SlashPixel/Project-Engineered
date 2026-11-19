// oritech tags biosteel as c:ingots/steel, so every steel recipe accepts it
ServerEvents.tags('item', event => {
  event.remove('c:ingots/steel', 'oritech:biosteel_ingot');
});
