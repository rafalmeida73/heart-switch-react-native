import type { Size } from '../types';

export const sizeToScale = (size: Size) => {
  const sizes = {
    sm: 1,
    md: 1.5,
    lg: 2,
  };

  return sizes[size] || sizes.md;
};
