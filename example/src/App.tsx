import { HeartSwitch } from 'heart-switch-react-native';
import { Container, Row } from './styles';

export default function App() {
  return (
    <Container>
      <Row>
        <HeartSwitch size="sm" checked />
        <HeartSwitch circleColor="#3bbbe8" />
        <HeartSwitch size="lg" />
      </Row>

      <Row>
        <HeartSwitch
          checked
          size="sm"
          fillColor="#3bbbe8"
          strokeColor="#2982a2"
        />

        <HeartSwitch
          inactiveFillColor="#353839"
          inactiveStrokeColor="#747576"
        />

        <HeartSwitch
          disabled
          checked
          size="lg"
          disabledCircleColor="#f4f4f4"
          disabledFillColor="#e1e1e1"
          disabledStrokeColor="#c8c8c8"
        />
      </Row>
    </Container>
  );
}
