import { render, act } from '@testing-library/react-native';
import { HeartSvg } from '.';

const normalizeColor = (color: any): string => {
  if (typeof color === 'string') {
    return color;
  }

  if (typeof color === 'number') {
    const hex = Math.abs(Math.floor(color)).toString(16).padStart(8, '0');
    return `#${hex.slice(2).toUpperCase()}`;
  }

  if (color && typeof color === 'object') {
    if ('payload' in color && typeof color.payload === 'number') {
      const hex = Math.abs(Math.floor(color.payload))
        .toString(16)
        .padStart(8, '0');
      return `#${hex.slice(2).toUpperCase()}`;
    }
    if ('value' in color) {
      return normalizeColor(color.value);
    }
  }

  return 'transparent';
};

describe('HeartSvg Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should render.', async () => {
    const component = render(
      <HeartSvg
        filled={true}
        fillColor="#FF0000"
        strokeColor="#FF0000"
        inactiveFillColor="#CCCCCC"
        inactiveStrokeColor="#CCCCCC"
        size={1}
      />
    );

    expect(component).toBeTruthy();
  });

  it('Should render with the inactiveFillColor if is not filled.', async () => {
    const { queryByTestId } = render(
      <HeartSvg
        filled={false}
        fillColor="#FF0000"
        strokeColor="#FF0000"
        inactiveFillColor="#CCCCCC"
        inactiveStrokeColor="#CCCCCC"
        size={1}
        duration={1000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const heartPath = queryByTestId('heart-path');
    expect(normalizeColor(heartPath.props.fill.payload)).toBe('#CCCCCC');
  });

  it('Should render with the inactiveStrokeColor if is not filled.', async () => {
    const { queryByTestId } = render(
      <HeartSvg
        filled={false}
        fillColor="#FF0000"
        strokeColor="#FF0000"
        inactiveFillColor="#CCCCCC"
        inactiveStrokeColor="#0C1BEA"
        size={1}
        duration={1000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const heartPath = queryByTestId('heart-path');
    expect(normalizeColor(heartPath.props.stroke.payload)).toBe('#0C1BEA');
  });

  it('Should render with the fillColor if is filled.', async () => {
    const { queryByTestId } = render(
      <HeartSvg
        filled
        fillColor="#FF0000"
        strokeColor="#FF0000"
        inactiveFillColor="#CCCCCC"
        inactiveStrokeColor="#CCCCCC"
        size={1}
        duration={1000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const heartPath = queryByTestId('heart-path');
    expect(normalizeColor(heartPath.props.fill.payload)).toBe('#FF0000');
  });

  it('Should render with the strokeColor if is filled.', async () => {
    const { queryByTestId } = render(
      <HeartSvg
        filled
        fillColor="#FF0000"
        strokeColor="#FB00FF"
        inactiveFillColor="#CCCCCC"
        inactiveStrokeColor="#CCCCCC"
        size={1}
        duration={1000}
      />
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const heartPath = queryByTestId('heart-path');
    expect(normalizeColor(heartPath.props.stroke.payload)).toBe('#FB00FF');
  });

  it('Should render with the correct height.', async () => {
    const sizeValue = 1;

    const { queryByTestId } = render(
      <HeartSvg
        filled
        fillColor="#FF0000"
        strokeColor="#FB00FF"
        inactiveFillColor="#CCCCCC"
        inactiveStrokeColor="#CCCCCC"
        size={sizeValue}
      />
    );

    const heartSvg = queryByTestId('heart-svg');

    expect(heartSvg.props.height).toBe(25 * sizeValue);
  });

  it('Should render with the correct width.', async () => {
    const sizeValue = 2;

    const { queryByTestId } = render(
      <HeartSvg
        filled
        fillColor="#FF0000"
        strokeColor="#FB00FF"
        inactiveFillColor="#CCCCCC"
        inactiveStrokeColor="#CCCCCC"
        size={sizeValue}
      />
    );

    const heartSvg = queryByTestId('heart-svg');

    expect(heartSvg.props.width).toBe(36 * sizeValue);
  });
});
