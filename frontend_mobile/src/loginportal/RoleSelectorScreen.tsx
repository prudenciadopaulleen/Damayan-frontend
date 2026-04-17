import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/UI";
import { roleColors, theme } from "../theme";
import { AppRoute, PortalRole } from "../types";
import { styles } from "./RoleSelectorScreen.styles";

const roles: { id: PortalRole; label: string; desc: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "admin", label: "Admin", desc: "System monitoring & approvals", icon: "shield-checkmark" },
  { id: "dispatcher", label: "Dispatcher", desc: "Field & resource coordination", icon: "airplane" },
  { id: "site_manager", label: "Site Manager", desc: "Intake & logistics operations", icon: "home" },
  { id: "citizen", label: "Affected Citizen", desc: "Registration & relief access", icon: "people" },
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
            <View style={[styles.iconContainer, { backgroundColor: roleColors[role.id] + "10" }]}>
              <Ionicons name={role.icon} size={28} color={roleColors[role.id]} />
            </View>
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


