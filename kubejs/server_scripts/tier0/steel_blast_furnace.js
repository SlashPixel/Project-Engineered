ServerEvents.recipes((event) => {
  event.remove({
    id: "modern_industrialization:materials/blast_furnace/steel",
  });

  event
    .custom({
      type: "modern_industrialization:blast_furnace",
      duration: 600,
      eu: 8,
      item_inputs: [
        { amount: 1, item: "modern_industrialization:uncooked_steel_dust" },
      ],
      item_outputs: [
        { amount: 1, item: "modern_industrialization:steel_ingot" },
      ],
    })
    .id("kubejs:blast_furnace/steel");
});
