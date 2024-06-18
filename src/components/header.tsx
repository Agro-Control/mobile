import { Text, View, TouchableOpacity, Image } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logoutRequest } from "../utils/logoutRequest";
interface HeaderProps {
  title: string;
  goBack: () => void;
}

const Header = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.headerWrapper,
        {
          top: top,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={styles.userContainer}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.userIconBackground}
          >
            <Icon name="user" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Maicon Lara</Text>
        </View>

        <TouchableOpacity onPress={() => logoutRequest()}>
          <Icon name="log-out" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;
