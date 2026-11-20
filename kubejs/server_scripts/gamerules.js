ServerEvents.loaded(event => {
  event.server.runCommand('gamerule waterSourceConversion false');
});
