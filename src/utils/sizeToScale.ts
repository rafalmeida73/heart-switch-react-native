import type { Size, SizePreset } from '../types';

const presetScales: Record<SizePreset, number> = {
  sm: 1,
  md: 1.5,
  lg: 2,
};

export const sizeToScale = (size: Size): number => {
  if (typeof size === 'number') {
    return size > 0 ? size : presetScales.md;
  }

  return presetScales[size] ?? presetScales.md;
};
