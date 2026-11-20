const TIER_HULL_SOURCE = 'modern_industrialization:block/quantum_machine_hull';
const TIER_WIRE_SOURCE = 'modern_industrialization:item/tin_wire';
const TIER_TEXTURES = [
  { id: 't_iv', base: [42, 161, 152] },
  { id: 't_v', base: [60, 120, 216] },
  { id: 't_vi', base: [142, 91, 208] },
  { id: 't_vii', base: [208, 91, 168] },
  { id: 't_viii', base: [232, 145, 58] }
];

function tierShade(base, t) {
  const dark = base.map(c => c * 0.35);
  const light = mixColors(base, [255, 255, 255], 0.5);
  return t < 0.5 ? mixColors(dark, base, t * 2) : mixColors(base, light, (t - 0.5) * 2);
}

ClientEvents.generateAssets('after_mods', event => {
  TIER_TEXTURES.forEach(tier => {
    const hull = recolorTexture(event, TIER_HULL_SOURCE, t => tierShade(tier.base, t));
    event.texture(`kubejs:block/generated/${tier.id}_machine_hull`, hull);
    event.texture(
      `modern_industrialization:item/${tier.id}_conductor_wire`,
      recolorTexture(event, TIER_WIRE_SOURCE, t => tierShade(tier.base, t))
    );
  });
});
