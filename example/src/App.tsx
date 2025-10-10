/* eslint-disable react-native/no-inline-styles */
import { HeartSwitch } from 'heart-switch-react-native';
import { View } from 'react-native';
import { styles } from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <HeartSwitch size="sm" checked />
        <HeartSwitch circleColor="#3bbbe8" />
        <HeartSwitch size="lg" />
      </View>

      <View style={[styles.row, { marginTop: 40 }]}>
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
      </View>
    </View>
  );
}
