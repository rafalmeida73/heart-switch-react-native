import styled, { css } from 'styled-components/native';
import type { IContainerProps, IHeartCircleProps } from './types';

export const Container = styled.View<IContainerProps>`
  position: relative;
  justify-content: center;
  align-items: center;

  ${({ size }) => css`
    width: 36 * ${size}px;
    height: 25 * ${size}px;
  `};
`;

export const Content = styled.TouchableOpacity``;

export const HeartCircle = styled.View<IHeartCircleProps>`
  z-index: 1;
  top: ${({ size }) => 12 * size}px;
  left: ${({ size }) => 12 * size}px;
  margin: 0;
  outline: none;
  border-radius: 50%;
  width: ${({ size }) => 18 * size}px;
  height: ${({ size }) => 18 * size}px;
  background-color: ${({ inactiveThumbColor }) => inactiveThumbColor};
  pointer-events: none;
`;
