import { StyleSheet } from "react-native";
import { theme, fonts } from "../theme";

export const styles = StyleSheet.create({
  hero: {
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: theme.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
    overflow: "hidden",
    position: "relative",
  },
  heroGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.primaryDeep,
    opacity: 0.4,
  },
  mark: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  markText: {
    color: "#ffffff",
    fontSize: 22,
    ...fonts.black,
  },
  brand: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    ...fonts.extrabold,
    letterSpacing: 2,
    marginBottom: 8,
  },
  headline: {
    color: "#ffffff",
    fontSize: 34,
    lineHeight: 38,
    ...fonts.black,
    marginBottom: 12,
  },
  copy: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: "90%",
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.surface,
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.line,
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Android Shadow
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  roleCopy: {
    flex: 1,
  },
  roleLabel: {
    fontSize: 18,
    color: theme.text,
    ...fonts.bold,
    marginBottom: 2,
  },
  roleDesc: {
    fontSize: 13,
    color: theme.textMuted,
    lineHeight: 18,
  },
  chevron: {
    marginLeft: 8,
    opacity: 0.3,
  },
});
