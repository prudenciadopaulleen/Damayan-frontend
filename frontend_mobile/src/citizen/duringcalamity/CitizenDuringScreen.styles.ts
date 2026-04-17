import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
  mapEnhancement: {
    backgroundColor: "#eef2eb",
    borderWidth: 1,
    borderColor: "rgba(29, 123, 58, 0.1)",
    position: "relative",
  },
  radarRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.danger,
    position: "absolute",
  },
  coreDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.danger,
    borderWidth: 2,
    borderColor: "#fff"
  },
  rescueVehicle: {
    position: "absolute",
    bottom: 20,
    right: 40,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  etaText: {
    fontSize: 10,
    fontWeight: "700",
    color: theme.info
  },
  timeline: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: "row",
    gap: 16,
  },
  timelineIconCol: {
    alignItems: "center",
  },
  timelineNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: theme.line,
    marginVertical: -4,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 24,
  }
});
