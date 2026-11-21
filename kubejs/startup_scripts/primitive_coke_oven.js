let PRIMITIVE_COKE_OVEN;

MIMachineEvents.registerRecipeTypes(event => {
  PRIMITIVE_COKE_OVEN = event.register('primitive_coke_oven').withItemInputs().withItemOutputs().withFluidOutputs();
});

MITweaksMachineEvents.registerPowerlessMachines(event => {
  const hatches = event.hatchOf('item_input', 'item_output', 'fluid_output');
  const bricks = event.memberOfBlock('minecraft:bricks');

  const shape = event
    .layeredShape('bricks', [
      ['HHH', 'CCC', 'HHH'],
      ['HHH', 'C C', 'H H'],
      ['HHH', 'C#C', 'HHH']
    ])
    .key('H', bricks, hatches)
    .key('C', bricks, event.noHatch())
    .build();

  event.multiblock(
    'Primitive Coke Oven',
    'primitive_coke_oven',
    PRIMITIVE_COKE_OVEN,
    shape,
    event.progressBar(77, 33, 'arrow'),
    itemInputs => itemInputs.addSlot(56, 35),
    itemOutputs => itemOutputs.addSlot(102, 35),
    fluidInputs => {},
    fluidOutputs => fluidOutputs.addSlot(122, 35),
    'bricks',
    'coke_oven',
    true,
    false,
    false,
    1,
    false
  );
});
