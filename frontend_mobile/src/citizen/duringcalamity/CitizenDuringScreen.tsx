import React, { useState, useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MobileHeader } from "../../components/MobileShell";
import { Pill, Screen, SectionCard } from "../../components/UI";
import { CitizenBottomNav, citizenStyles } from "../shared";
import { theme } from "../../theme";
import { styles } from "./CitizenDuringScreen.styles";

// Simple pulsating dot component
function PulsatingDot() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: 3, duration: 1500, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true })
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 1500, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.8, duration: 0, useNativeDriver: true })
        ])
      ])
    ).start();
  }, []);

  return (
    <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={[styles.radarRing, { transform: [{ scale }], opacity }]} />
      <View style={styles.coreDot} />
    </View>
  );
}

export function CitizenDuringScreen({
  onBack,
}: {
  onBack: () => void;
}) {
  const [active] = useState<"home" | "relief" | "qr" | "profile">("qr");

  return (
    <Screen>
      <MobileHeader title="Citizen Portal" subtitle="Emergency response dashboard" onBack={onBack} />

      <SectionCard style={citizenStyles.mapCard}>
        <Pill label="Phase 2: Active Response" tone="danger" />
        <Text style={citizenStyles.sectionTitle}>Rescue Map</Text>
        <Text style={citizenStyles.rowCopy}>Current Location: Brgy. 102, District 4</Text>
        <View style={[citizenStyles.fakeMap, styles.mapEnhancement]}>
          <PulsatingDot />
          <View style={styles.rescueVehicle}>
            <Ionicons name="car" size={16} color={theme.info} />
            <Text style={styles.etaText}>ETA 12m</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={[citizenStyles.sectionTitle, { marginBottom: 20 }]}>Active Relief Tickets</Text>
        <View style={styles.timeline}>
          {[
            { id: 1, title: "Medical Kit", meta: "Distribution Point A", status: "Ready", icon: "medkit" },
            { id: 2, title: "Potable Water", meta: "ETA 45 mins", status: "Queued", icon: "water" },
          ].map((ticket, index, arr) => {
            const isReady = ticket.status === "Ready";
            const isLast = index === arr.length - 1;
            return (
              <View key={ticket.id} style={styles.timelineItem}>
                <View style={styles.timelineIconCol}>
                  <View style={[styles.timelineNode, isReady && { backgroundColor: theme.success }]}>
                    <Ionicons name={ticket.icon as any} size={14} color={isReady ? "#fff" : theme.textLight} />
                  </View>
                  {!isLast && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineContent}>
                  <View>
                    <Text style={[citizenStyles.rowTitle, { fontSize: 16 }]}>{ticket.title}</Text>
                    <Text style={citizenStyles.rowCopy}>{ticket.meta}</Text>
                  </View>
                  <Pill label={ticket.status} tone={isReady ? "success" : "warning"} />
                </View>
              </View>
            );
          })}
        </View>
      </SectionCard>

      <CitizenBottomNav active={active} />
    </Screen>
  );
}


