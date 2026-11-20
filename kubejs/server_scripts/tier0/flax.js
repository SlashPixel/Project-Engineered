const FLAX_FLAG = { type: 'supplementaries:flag', flag: 'flax' };
const FLAX_CROPS = ['#c:crops/flax', '#c:crops/wild_flax'];

ServerEvents.recipes(() => {
  crafting.shapeless('silentgear:flax_string', {
    ingredients: [
      ['silentgear:flax_fiber', '#c:crops/flax'],
      ['silentgear:flax_fiber', '#c:crops/flax']
    ],
    out: 'silentgear:flax_string',
    category: 'misc'
  });

  crafting.shaped('supplementaries:doormat_2', {
    pattern: ['11 ', '   ', '   '],
    key: { 1: FLAX_CROPS },
    out: 'supplementaries:doormat',
    conditions: [{ type: 'supplementaries:flag', flag: 'doormat' }, FLAX_FLAG]
  });

  crafting.shaped('supplementaries:rope', {
    pattern: ['1  ', '1  ', '1  '],
    key: { 1: FLAX_CROPS },
    out: ['supplementaries:rope', 3],
    conditions: [{ type: 'supplementaries:flag', flag: 'rope' }, FLAX_FLAG]
  });

  crafting.shaped('supplementaries:sack', {
    pattern: ['121', '1 1', '111'],
    key: { 1: FLAX_CROPS, 2: '#c:strings' },
    out: 'supplementaries:sack',
    conditions: [{ type: 'supplementaries:flag', flag: 'sack' }, FLAX_FLAG]
  });
});
