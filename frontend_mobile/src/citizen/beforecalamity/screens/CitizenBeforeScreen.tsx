import React, { useState } from "react";
import { Pressable, Text, View, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen, Pill, SectionCard } from "../../../components/UI";
import { theme } from "../../../theme";
import {
  CitizenBottomNav,
  CitizenPreparednessTopBar,
  citizenStyles,
} from "../../shared";

export function CitizenBeforeScreen({
  onBack,
  onOpenResponse,
}: {
  onBack: () => void;
  onOpenResponse: () => void;
}) {
  const [active] = useState<"home" | "relief" | "qr" | "profile">("home");
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(true);
  const [activeAlert, setActiveAlert] = useState<string | null>("FLASH FLOOD WARNING: Sector 4 expects 20cm surge within 120mins. Acknowledge to receive evacuation route.");
  const [registrationMode, setRegistrationMode] = useState<"NONE" | "INDIVIDUAL" | "HOUSEHOLD">("NONE");

  return (
    <Screen>
      {/* Push Notification Modal */}
      <Modal visible={showNotificationPrompt} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#fff", padding: 32, borderRadius: 24, width: "100%", alignItems: "center" }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.primaryLight, alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Ionicons name="notifications" size={32} color={theme.primary} />
            </View>
            <Text style={{ fontSize: 22, fontWeight: "900", color: theme.text, textAlign: "center", marginBottom: 8 }}>Enable Alert Notifications?</Text>
            <Text style={{ fontSize: 14, color: theme.textMuted, textAlign: "center", lineHeight: 20, marginBottom: 24 }}>
              Stay informed with real-time push notifications for critical weather updates and evacuation orders in your sector.
            </Text>
            <TouchableOpacity onPress={() => setShowNotificationPrompt(false)} style={{ backgroundColor: theme.primary, width: "100%", padding: 18, borderRadius: 16, alignItems: "center", marginBottom: 12 }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Allow Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowNotificationPrompt(false)}>
              <Text style={{ color: theme.textMuted, fontWeight: "700" }}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Critical Alert Banner */}
      {activeAlert && (
        <View style={{ backgroundColor: theme.danger, padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 1, marginRight: 12 }}>
             <View style={{ backgroundColor: "rgba(255,255,255,0.2)", alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 4 }}>
                <Text style={{ color: "#fff", fontSize: 10, fontWeight: "900" }}>CRITICAL ALERT</Text>
             </View>
             <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }} numberOfLines={2}>{activeAlert}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setActiveAlert(null)}
            style={{ backgroundColor: "#fff", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
          >
            <Text style={{ color: theme.danger, fontWeight: "900", fontSize: 12 }}>ACKNOWLEDGE</Text>
          </TouchableOpacity>
        </View>
      )}

      <CitizenPreparednessTopBar onBack={onBack} />
      
      {/* Flowchart Step: Registration of Users with QR */}
      {registrationMode === "NONE" ? (
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <SectionCard style={{ gap: 16 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "900", color: theme.text }}>Digital ID Registration</Text>
              <Text style={{ fontSize: 13, color: theme.textMuted }}>Complete this to receive aid allocations.</Text>
            </View>
            <View style={{ gap: 12 }}>
              <Pressable 
                onPress={() => setRegistrationMode("INDIVIDUAL")}
                style={{ flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: theme.surfaceSoft, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.line }}
              >
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: theme.primaryLight, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 20 }}>👤</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "800", color: theme.text }}>Register Myself</Text>
                  <Text style={{ fontSize: 12, color: theme.textMuted }}>Fastest for personal tracking</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.primary} />
              </Pressable>

              <Pressable 
                onPress={() => setRegistrationMode("HOUSEHOLD")}
                style={{ flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: "#fff8e1", padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#ffe082" }}
              >
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#fffde7", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 20 }}>🏠</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "800", color: "#856404" }}>Register My Family</Text>
                  <Text style={{ fontSize: 12, color: "#856404", opacity: 0.7 }}>Unified aid for your household</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#856404" />
              </Pressable>
            </View>
          </SectionCard>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <SectionCard style={{ backgroundColor: theme.primary, borderNone: true }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: "#fff", fontSize: 12, fontWeight: "800", opacity: 0.8 }}>MY DIGITAL ID</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "900", marginTop: 4 }}>
                  {registrationMode === "INDIVIDUAL" ? "Juan Dela Cruz" : "Dela Cruz Family Cluster"}
                </Text>
              </View>
              <View style={{ backgroundColor: "#fff", padding: 8, borderRadius: 8 }}>
                 <Ionicons name="qr-code" size={32} color={theme.primary} />
              </View>
            </View>
            <TouchableOpacity onPress={() => setRegistrationMode("NONE")} style={{ marginTop: 16 }}>
               <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700", textDecorationLine: "underline" }}>Switch Registration Type</Text>
            </TouchableOpacity>
          </SectionCard>
        </View>
      )}

      <SectionCard style={[citizenStyles.greenHero, { marginHorizontal: 20, marginBottom: 20 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.secondary }} />
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 12, letterSpacing: 1 }}>ACTIVE PLAN: STABLE</Text>
        </View>
        <Text style={citizenStyles.heroTitle}>Low-Risk Condition.</Text>
        <Text style={citizenStyles.heroBody}>
          No immediate environmental threats detected in your primary zone. Current preparedness phase: Maintenance.
        </Text>
      </SectionCard>

      <View style={{ paddingHorizontal: 20 }}>
        <SectionCard>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "900", color: theme.text }}>Ready-Check</Text>
              <Text style={{ fontSize: 13, color: theme.textMuted }}>Monthly Preparedness Audit</Text>
            </View>
            <Pill label="01/03" tone="primary" />
          </View>

          <View style={{ gap: 12 }}>
             <View style={{ flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: theme.surfaceSoft, padding: 12, borderRadius: 12 }}>
                <Ionicons name="checkmark-circle" size={24} color={theme.primary} />
                <View>
                   <Text style={{ fontWeight: "800", color: theme.text }}>Emergency Contact List</Text>
                   <Text style={{ fontSize: 12, color: theme.textMuted }}>Last updated: 2 days ago</Text>
                </View>
             </View>
             <View style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: theme.line }}>
                <Ionicons name="ellipse-outline" size={24} color={theme.line} />
                <View>
                   <Text style={{ fontWeight: "800", color: theme.text }}>72-Hour Survival Kit</Text>
                   <Text style={{ fontSize: 12, color: theme.textMuted }}>Refresh water supply</Text>
                </View>
             </View>
          </View>
        </SectionCard>

        <SectionCard>
          <Text style={{ fontSize: 18, fontWeight: "900", color: theme.text, marginBottom: 12 }}>Current Sector</Text>
          <View style={[citizenStyles.fakeMap, { height: 120, borderRadius: 16 }]}>
              <View style={{ backgroundColor: theme.primary, padding: 8, borderRadius: 8 }}>
                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 10 }}>ZONE 4: CLEAR</Text>
              </View>
          </View>
        </SectionCard>

        <TouchableOpacity 
          onPress={onOpenResponse}
          style={{ backgroundColor: theme.primary, padding: 20, borderRadius: 16, alignItems: "center", marginTop: 10, marginBottom: 40 }}
        >
          <Text style={{ color: "#fff", fontWeight: "900", fontSize: 16 }}>Open Response Mode</Text>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 4 }}>Access shelter maps and report incidents</Text>
        </TouchableOpacity>
      </View>

      <CitizenBottomNav active={active} />
    </Screen>
  );
}
