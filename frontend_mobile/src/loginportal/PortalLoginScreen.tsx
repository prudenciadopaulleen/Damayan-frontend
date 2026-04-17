import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MobileHeader } from "../components/MobileShell";
import { Button, Input, Pill, Screen, SectionCard } from "../components/UI";
import { roleColors, theme, fonts } from "../theme";
import { PortalRole } from "../types";
import { styles } from "./PortalLoginScreen.styles";

const roleContent: Record<
  PortalRole,
  { title: string; subtitle: string; loginLabel: string; accent: string; action: string }
> = {
  admin: {
    title: "Admin Access",
    subtitle: "Oversee approvals, system health, and platform coordination.",
    loginLabel: "Admin",
    accent: roleColors.admin,
    action: "Log In To Admin Dashboard",
  },
  dispatcher: {
    title: "Dispatcher Access",
    subtitle: "Manage tickets, teams, and active field response operations.",
    loginLabel: "Dispatcher",
    accent: roleColors.dispatcher,
    action: "Continue To Dispatcher Dashboard",
  },
  site_manager: {
    title: "Site Manager Access",
    subtitle: "Manage shelter readiness, intake, and local distribution.",
    loginLabel: "Site Manager",
    accent: roleColors.site_manager,
    action: "Log In To Site Manager Dashboard",
  },
  citizen: {
    title: "Citizen Access",
    subtitle: "Sign in for alerts, preparedness info, and relief access.",
    loginLabel: "Citizen",
    accent: roleColors.citizen,
    action: "Continue To Citizen Dashboard",
  },
};

export function PortalLoginScreen({
  role,
  onBack,
  onSubmit,
  onSecondary,
  secondaryLabel,
}: {
  role: PortalRole;
  onBack: () => void;
  onSubmit: () => void;
  onSecondary?: () => void;
  secondaryLabel?: string;
}) {
  const content = roleContent[role];
  const [citizenId, setCitizenId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  if (role === "citizen") {
    return (
      <Screen>
        <View style={styles.citizenShell}>
          <View style={styles.topBar}>
            <View style={styles.brandRow}>
              <Pressable onPress={onBack} style={styles.menuButton}>
                <Text style={styles.menuButtonText}>≡</Text>
              </Pressable>
              <Text style={styles.brandText}>DAMAYAN</Text>
            </View>

            <View style={styles.roleBadgeRow}>
              <Text style={styles.roleTag}>Affected Citizen</Text>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsxxZ7tWtiorEdOPyE36FXiP8jypRF29-cQQeoNHjDFpKcSmU_HJU8kIr38p5OREBlTSX7Fjf8BBMNqbdr2qr6NRCyKVpJF26FEMhQdT1HkI-aAvHpbbr7U3i6ItcIcXPfqzT7FzCtGmcaTjNwE8_g2NomplnTsnKkoCdJXxRfRydYP6-yJYJ4fJnNncurScunRm1v3h2McrYwGcjwwyPiQIIvW8XdpdEA9rxrgfeJ_RNHhNpNTg3531RpQYXCvfnOprQiFGnuqaG8",
                }}
                style={styles.avatarImage}
              />
            </View>
          </View>

          <View style={styles.editorialPanel}>
            <Text style={styles.gatewayLabel}>Secure Access Gateway</Text>
            <Text style={styles.editorialTitle}>
              The Resilient{"\n"}
              <Text style={styles.editorialAccent}>Sanctuary</Text>
            </Text>
            <Text style={styles.editorialText}>
              Access humanitarian relief protocols, emergency status updates, and
              personal identification records within our secure environment.
            </Text>

            <ImageBackground
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUeDgaq6XCJNBqX0uYoHRejovD-YsgRj9XE5F62qvcrVmANmWRhPjGJdgTgag5gYg96TXaegniq89lq04L0wXvg92nzJmruiEnOyI5oGwyTJzc1503PTnFrS3awvyIO9d95iNTsSSrhrgEqGFrBrR-FuVdXiiqR3Nam6VzDypJIhvd4WOqXhGk_AJtsZpPol5lAkW0P5xFhTUrrykrvIrbQq5cSzalGjM0TO7Y_or_zzhXBQ-9zEQWV2QatioCFDhS4cotqpRETjxM",
              }}
              imageStyle={styles.editorialImage}
              style={styles.imageCard}
            >
              <View style={styles.imageOverlay} />
              <View style={styles.imageFooter}>
                <Text style={styles.verifiedIcon}>✓</Text>
                <Text style={styles.imageFooterText}>Identity Protected System</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.loginCard}>
            <View style={styles.glowOrb} />
            <View style={styles.loginCardInner}>
              <View style={styles.loginIntro}>
                <Text style={styles.loginTitle}>Welcome Back</Text>
                <Text style={styles.loginSubtitle}>
                  Please authenticate to access your relief dashboard.
                </Text>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Username or Digital ID</Text>
                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldIcon}>▣</Text>
                  <TextInput
                    value={citizenId}
                    onChangeText={setCitizenId}
                    placeholder="DAM-XXXX-XXXX"
                    placeholderTextColor="#8f978f"
                    style={styles.fieldInput}
                    autoCapitalize="characters"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>Access Key</Text>
                  <Pressable>
                    <Text style={styles.helpLink}>Forgot Password?</Text>
                  </Pressable>
                </View>

                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldIcon}>◌</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••••••"
                    placeholderTextColor="#8f978f"
                    style={styles.fieldInput}
                    secureTextEntry={!passwordVisible}
                  />
                  <Pressable onPress={() => setPasswordVisible((value) => !value)}>
                    <Text style={styles.visibilityToggle}>
                      {passwordVisible ? "Hide" : "Show"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.actionStack}>
                <Pressable onPress={onSubmit} style={styles.primaryAction}>
                  <View style={styles.primaryGradient}>
                    <Text style={styles.primaryActionText}>Secure Login</Text>
                    <Text style={styles.primaryActionArrow}>→</Text>
                  </View>
                </Pressable>

                {onSecondary && secondaryLabel ? (
                  <>
                    <View style={styles.dividerRow}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>OR</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    <Pressable onPress={onSecondary} style={styles.secondaryAction}>
                      <Text style={styles.secondaryActionText}>{secondaryLabel}</Text>
                    </Pressable>
                  </>
                ) : null}
              </View>

              <View style={styles.altAccessSection}>
                <Text style={styles.altAccessLabel}>Alternative Access</Text>
                <View style={styles.altButtons}>
                  <Pressable style={styles.altButton}>
                    <Text style={styles.altButtonIcon}>◐</Text>
                  </Pressable>
                  <Pressable style={styles.altButton}>
                    <Text style={styles.altButtonIcon}>◉</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerLinks}>
              <Pressable>
                <Text style={styles.footerLink}>Privacy Policy</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.footerLink}>Crisis Support</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.footerLink}>Accessibility</Text>
              </Pressable>
            </View>
            <Text style={styles.footerNote}>
              © 2024 RELIANCE Humanitarian Network. All Rights Reserved.
            </Text>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <MobileHeader title={content.title} subtitle={content.loginLabel} onBack={onBack} />

      <SectionCard style={{ ...styles.hero, backgroundColor: content.accent }}>
        <Pill label={content.loginLabel} />
        <Text style={styles.heroTitle}>{content.title}</Text>
        <Text style={styles.heroText}>{content.subtitle}</Text>
      </SectionCard>

      <SectionCard>
        <Input label="Username" placeholder="Enter username" />
        <Input label="Password" placeholder="********" secureTextEntry />
        <View style={styles.actions}>
          <Button label={content.action} onPress={onSubmit} />
          {onSecondary && secondaryLabel ? (
            <Button label={secondaryLabel} tone="ghost" onPress={onSecondary} />
          ) : null}
        </View>
      </SectionCard>
    </Screen>
  );
}


