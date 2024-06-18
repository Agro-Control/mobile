import { StyleSheet } from "react-native";
import { colors } from "../src/colors";
import { fonts } from "../src/fonts";

export const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    alignItems: "center",
    minWidth: 150,
    width: "100%",
    borderRadius: 24,
    backgroundColor: colors.green[400],
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontFamily: fonts.baiBold,
    fontSize: 14,
    textTransform: "uppercase",
    color: colors.default.bg,
  },
  container: {
    backgroundColor: colors.default.bg,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 48,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: fonts.baiBold,
    color: colors.blue[400],
    textTransform: "uppercase",
    fontSize: 20,
  },
  titleBig: {
    textAlign: "center",
    fontFamily: fonts.baiBold,
    color: colors.dark.bg,
    textTransform: "uppercase",
    fontSize: 28,
    marginTop: 8
  },
  input: {
    backgroundColor: colors.default.bg,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: colors.green[400],
    height: 40,
    width: "100%",
    minWidth: 165,
    borderRadius: 16,
    fontFamily: fonts.roboto,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: 200,
    paddingHorizontal: 56,
  },
});
