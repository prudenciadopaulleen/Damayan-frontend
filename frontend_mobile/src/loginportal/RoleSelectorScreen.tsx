import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/UI";
import { roleColors, theme } from "../theme";
import { AppRoute, PortalRole } from "../types";
import { styles } from "./RoleSelectorScreen.styles";

const roles: { id: PortalRole; label: string; desc: string }[] = [
  { id: "admin", label: "Admin", desc: "System monitoring & approvals" },
  { id: "dispatcher", label: "Dispatcher", desc: "Field & resource coordination" },
  { id: "site_manager", label: "Site Manager", desc: "Intake & logistics operations" },
  { id: "citizen", label: "Affected Citizen", desc: "Registration & relief access" },
];

const routeMap: Record<PortalRole, AppRoute> = {
  admin: "admin-login",
  dispatcher: "dispatcher-login",
  site_manager: "site-manager-login",
  citizen: "citizen-login",
};

export function RoleSelectorScreen({ onNavigate }: { onNavigate: (route: AppRoute) => void }) {
  return (
    <Screen style={{ backgroundColor: theme.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroGradient} />
        <View style={{ paddingHorizontal: 24 }}>
          <View style={styles.mark}>
            <Text style={styles.markText}>D</Text>
          </View>
          <Text style={styles.brand}>DAMAYAN</Text>
          <Text style={styles.headline}>Choose Your{"\n"}Portal</Text>
          <Text style={styles.copy}>
            Open the operational view for your role. This app mirrors the main
            desktop flows in a mobile-safe format.
          </Text>
        </View>
      </View>

      <View style={{ paddingBottom: 40 }}>
        {roles.map((role) => (
          <Pressable
            key={role.id}
            onPress={() => onNavigate(routeMap[role.id])}
            style={({ pressed }) => [
              styles.roleCard,
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 }
            ]}
          >
            <View style={styles.roleCopy}>
              <Text style={styles.roleLabel}>{role.label}</Text>
              <Text style={styles.roleDesc}>{role.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textLight} style={styles.chevron} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}


