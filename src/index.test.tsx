import { render, fireEvent } from '@testing-library/react-native';
import { HeartSwitch } from '.';
import { sizeToScale } from './utils/sizeToScale';

const handlePress = jest.fn();

describe('HeartSwitch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render.', async () => {
    const component = render(<HeartSwitch />);

    expect(component).toBeTruthy();
  });

  it('Should render correct height.', async () => {
    const scaleValue = 'md';

    const { getByTestId } = render(
      <HeartSwitch checked={true} size={scaleValue} />
    );

    const container = getByTestId('heart-switch-container');

    expect(container.props.style[1].height).toBe(25 * sizeToScale(scaleValue));
  });

  it('Should render correct width.', async () => {
    const scaleValue = 'lg';

    const { getByTestId } = render(
      <HeartSwitch checked={true} size={scaleValue} />
    );

    const container = getByTestId('heart-switch-container');

    expect(container.props.style[1].width).toBe(36 * sizeToScale(scaleValue));
  });

  it('Should be able to press', async () => {
    const scaleValue = 'lg';

    const { getByTestId } = render(
      <HeartSwitch checked={true} onChange={handlePress} size={scaleValue} />
    );
    const button = getByTestId('heart-switch-button');
    fireEvent.press(button);

    await new Promise((resolve) =>
      setTimeout(resolve, 6.3 * sizeToScale(scaleValue))
    );

    expect(handlePress).toHaveBeenCalled();
  });

  it('Should not be able to press', async () => {
    const scaleValue = 'lg';

    const { getByTestId } = render(
      <HeartSwitch
        checked={true}
        onChange={handlePress}
        size={scaleValue}
        disabled
      />
    );
    const button = getByTestId('heart-switch-button');
    fireEvent.press(button);

    await new Promise((resolve) =>
      setTimeout(resolve, 6.3 * sizeToScale(scaleValue))
    );

    expect(handlePress).not.toHaveBeenCalled();
  });

  it('Should render correct with containerProps.', async () => {
    const bg = '#FF0000';

    const { getByTestId } = render(
      <HeartSwitch
        checked={true}
        containerProps={{
          style: {
            backgroundColor: bg,
          },
        }}
      />
    );

    const container = getByTestId('heart-switch-container');

    expect(container.props.style[2].backgroundColor).toBe(bg);
  });
  it('Should render correct with buttonProps.', async () => {
    const bg = '#FF0000';

    const { getByTestId } = render(
      <HeartSwitch
        checked={true}
        buttonProps={{
          style: {
            backgroundColor: bg,
          },
        }}
      />
    );

    const button = getByTestId('heart-switch-button');

    expect(button.props.style.backgroundColor).toBe(bg);
  });
});
