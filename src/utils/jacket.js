// Coordinates follow the original 1312 × 1200 portrait, independently of its crop.
export const jacketOutline = 'M 5 1200 C 24 1110 53 1016 100 955 C 171 906 318 839 404 801 L 417 756 Q 425 725 488 696 L 500 744 L 507 802 L 499 836 Q 514 869 543 874 Q 611 884 675 855 L 692 802 Q 780 765 847 690 L 853 627 Q 880 629 890 655 L 935 725 Q 1100 778 1254 855 Q 1296 871 1312 903 L 1312 1200 Z'

// Inner T-shirt and metal fittings retain their original pixels.
export const jacketExclusions = [
  'M 472 785 Q 488 813 499 836 Q 514 869 543 874 Q 611 884 675 855 L 657 917 Q 625 1056 623 1200 L 390 1200 Q 427 1060 451 988 Q 478 959 447 927 Q 469 851 472 785 Z',
  'M 431 834 C 445 832 449 847 440 865 C 431 884 420 874 423 858 Z',
  'M 737 819 C 759 811 770 845 750 858 C 729 872 717 835 737 819 Z',
  'M 432 922 Q 489 942 480 981 L 409 1200 L 384 1200 L 453 984 Q 473 955 428 938 Z',
  'M 658 908 L 676 913 Q 640 1047 636 1200 L 610 1200 Q 615 1046 658 908 Z',
]

export function prepareJacketTint(original, mask) {
  let count = 0
  for (let i = 3; i < mask.length; i += 4) if (mask[i]) count++

  const offsets = new Uint32Array(count)
  const shades = new Float64Array(count)
  const highlights = new Float64Array(count)
  const coverages = new Float64Array(count)
  let index = 0
  for (let i = 0; i < mask.length; i += 4) {
    if (!mask[i + 3]) continue
    const luminance = (original[i] * 0.2126 + original[i + 1] * 0.7152 + original[i + 2] * 0.0722) / 255
    offsets[index] = i
    shades[index] = Math.min(1, Math.pow(luminance, 0.72) * 1.65)
    highlights[index] = Math.max(0, (luminance - 0.42) / 0.58) * 0.65
    coverages[index] = mask[i + 3] / 255
    index++
  }
  return { offsets, shades, highlights, coverages }
}

export function applyJacketTint(original, output, prepared, target) {
  const { offsets, shades, highlights, coverages } = prepared
  const red = target[0] * 0.96 + 6
  const green = target[1] * 0.96 + 6
  const blue = target[2] * 0.96 + 6
  for (let i = 0; i < offsets.length; i++) {
    const offset = offsets[i]
    const shade = shades[i]
    const highlight = highlights[i]
    const coverage = coverages[i]
    const inverseCoverage = 1 - coverage
    output[offset] = Math.round(original[offset] * inverseCoverage + (red * shade * (1 - highlight) + 255 * highlight) * coverage)
    output[offset + 1] = Math.round(original[offset + 1] * inverseCoverage + (green * shade * (1 - highlight) + 255 * highlight) * coverage)
    output[offset + 2] = Math.round(original[offset + 2] * inverseCoverage + (blue * shade * (1 - highlight) + 255 * highlight) * coverage)
  }
}

export function tintLeatherPixel(r, g, b, target, coverage = 1) {
  const luminance = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255
  // Lift the dark leather midtones while retaining grain, seams and specular light.
  const shade = Math.min(1, Math.pow(luminance, 0.72) * 1.65)
  const highlight = Math.max(0, (luminance - 0.42) / 0.58) * 0.65
  return target.map((channel, i) => {
    const tinted = (channel * 0.96 + 6) * shade * (1 - highlight) + 255 * highlight
    return Math.round([r, g, b][i] * (1 - coverage) + tinted * coverage)
  })
}
