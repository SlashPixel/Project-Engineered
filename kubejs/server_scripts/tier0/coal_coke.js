const COKE_FORMS = [
  {
    target: 'immersiveengineering:coal_coke',
    tag: 'c:coal_coke',
    duplicates: ['modern_industrialization:coke', 'ftbmaterials:coal_coke_gem']
  },
  {
    target: 'immersiveengineering:dust_coke',
    tag: 'c:dusts/coal_coke',
    duplicates: ['modern_industrialization:coke_dust', 'ftbmaterials:coal_coke_dust']
  },
  {
    target: 'immersiveengineering:coke',
    tag: 'c:storage_blocks/coal_coke',
    duplicates: ['modern_industrialization:coke_block', 'ftbmaterials:coal_coke_block']
  }
];

ServerEvents.tags('item', event => {
  COKE_FORMS.forEach(form => form.duplicates.forEach(item => event.add(form.tag, item)));
});

ServerEvents.recipes(event => {
  COKE_FORMS.forEach(form => form.duplicates.forEach(item => {
    event.replaceInput({}, item, form.target);
    event.replaceOutput({}, item, form.target);
  }));
});
