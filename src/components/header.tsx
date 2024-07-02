import { Text, View, TouchableOpacity, Image } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logoutRequest } from "../utils/logoutRequest";
import useUser from "../utils/hooks/useUser";
import logoRounded from "../assets/logo-rounded.png"

interface HeaderProps {
  title: string;
  goBack: () => void;
}

const Header = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useUser();
  const userName = user?.usuario.nome;
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
        <Image source={logoRounded} style={{ height: 24, width: 24 }} />
          <Text style={styles.title}>{userName || ""}</Text>
        </View>

      </View>
    </View>
  );
};
export default Header;
