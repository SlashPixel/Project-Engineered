const SG_ANVIL_RECIPES = [
  { name: 'azure_electrum_dust', in: '#c:ingots/azure_electrum', out: 'silentgear:azure_electrum_dust' },
  { name: 'azure_silver_dust', in: '#c:ingots/azure_silver', out: 'silentgear:azure_silver_dust' },
  { name: 'blaze_gold_dust', in: '#c:ingots/blaze_gold', out: 'silentgear:blaze_gold_dust' },
  { name: 'crimson_iron_dust', in: '#c:ingots/crimson_iron', out: 'silentgear:crimson_iron_dust' },
  { name: 'crimson_steel_dust', in: '#c:ingots/crimson_steel', out: 'silentgear:crimson_steel_dust' },
  { name: 'tyrian_steel_dust', in: '#c:ingots/tyrian_steel', out: 'silentgear:tyrian_steel_dust' },
  {
    name: 'crushed_shulker_shell',
    in: 'minecraft:shulker_shell',
    out: 'silentgear:crushed_shulker_shell',
    damage: 200
  },
  { name: 'pebble', in: '#c:cobblestones', out: ['silentgear:pebble', 9] }
];

ServerEvents.recipes(event => {
  event.remove({ id: 'silentgear:stone_anvil' });
  event.remove({ id: 'silentgear:template_board' });
  event.remove({ id: 'silentgear:woodcutting/template_board' });

  SG_ANVIL_RECIPES.forEach(recipe => {
    event.remove({ id: 'silentgear:' + recipe.name });
    mi.forge_hammer('forge_hammer/silentgear_' + recipe.name, {
      damage: recipe.damage || 20,
      in: recipe.in,
      out: recipe.out
    });
  });

  event
    .shaped(Item.of('silentgear:template_board', 16), ['LLL', 'LKL', 'LLL'], {
      L: '#minecraft:logs',
      K: '#c:tools/knife'
    })
    .damageIngredient('#c:tools/knife')
    .id('kubejs:template_board');
});
