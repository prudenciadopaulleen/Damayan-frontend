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
  { 
    title: string; 
    subtitle: string; 
    loginLabel: string; 
    accent: string; 
    action: string;
    editorialTitle?: string;
    editorialAccent?: string;
    editorialText?: string;
    editorialImage?: string;
    gatewayLabel?: string;
  }
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
    gatewayLabel: "Operational Authority",
    editorialTitle: "Global Operational",
    editorialAccent: "Control",
    editorialText: "Access real-time intake tracking, local distribution logs, and shelter capacity monitoring in our optimized mobile workflow.",
    editorialImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7mK6Wlk5tpcz_jg-y_FNS8PaNwyml1WkYUcFxvzRckiijTcFHZ86PvgEvRj5z91SeFpO35w95Xf15h9Te72zdNO_c_pH-SUPMX4S6vwvPbl8QmMKDbrRL0QEyIjDbUkei6wxoM5mR4tV1mIUpd3l_eiEyNBIID90mRxapOumpUbprXPaH5UFcCDYK9tjGxos2cuTC8Enx25m3LklOoLtJ3_jBY0PMnIW53zyJbubc1XMeyAhFTjngNmNce8IUw9kWG3_Iw1rge8vN",
  },
  citizen: {
    title: "Citizen Access",
    subtitle: "Sign in for alerts, preparedness info, and relief access.",
    loginLabel: "Citizen",
    accent: roleColors.citizen,
    action: "Continue To Citizen Dashboard",
    gatewayLabel: "Secure Access Gateway",
    editorialTitle: "The Resilient",
    editorialAccent: "Sanctuary",
    editorialText: "Access humanitarian relief protocols, emergency status updates, and personal identification records within our secure environment.",
    editorialImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUeDgaq6XCJNBqX0uYoHRejovD-YsgRj9XE5F62qvcrVmANmWRhPjGJdgTgag5gYg96TXaegniq89lq04L0wXvg92nzJmruiEnOyI5oGwyTJzc1503PTnFrS3awvyIO9d95iNTsSSrhrgEqGFrBrR-FuVdXiiqR3Nam6VzDypJIhvd4WOqXhGk_AJtsZpPol5lAkW0P5xFhTUrrykrvIrbQq5cSzalGjM0TO7Y_or_zzhXBQ-9zEQWV2QatioCFDhS4cotqpRETjxM",
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

  if (role === "citizen" || role === "site_manager") {
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
              <Text style={styles.roleTag}>{role === "citizen" ? "Affected Citizen" : "Site Manager"}</Text>
              <Image
                source={{
                  uri: role === "citizen" 
                    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDsxxZ7tWtiorEdOPyE36FXiP8jypRF29-cQQeoNHjDFpKcSmU_HJU8kIr38p5OREBlTSX7Fjf8BBMNqbdr2qr6NRCyKVpJF26FEMhQdT1HkI-aAvHpbbr7U3i6ItcIcXPfqzT7FzCtGmcaTjNwE8_g2NomplnTsnKkoCdJXxRfRydYP6-yJYJ4fJnNncurScunRm1v3h2McrYwGcjwwyPiQIIvW8XdpdEA9rxrgfeJ_RNHhNpNTg3531RpQYXCvfnOprQiFGnuqaG8"
                    : "https://lh3.googleusercontent.com/aida-public/AB6AXuDmjENrAB5IQ3c2Xo9CHxLTG1Zx_wgP7ExXJmB7Kmj71CYaOiI0t7iQF9ibo6i1cY9WmMIHjRJCv_OhCLyiUH5Eml5d2lTOImfkIKJHeLVUIWIuVb1csgOiXIcvCezQF77Cfu-HJg4eUnCjMQMvjZhbUia0NTelqhZTDjEUY992V_wxjgsl2rHbXTQPkDG1lQEyRLoDyAJNLCd2J0550CN_KivV_VtOiFchDlvQLlJ9PgN6a7lsmlgO--ZHDGsz_hJfyQ7qJyk9GGoV",
                }}
                style={styles.avatarImage}
              />
            </View>
          </View>

          <View style={styles.editorialPanel}>
            <Text style={styles.gatewayLabel}>{content.gatewayLabel}</Text>
            <Text style={styles.editorialTitle}>
              {content.editorialTitle}{"\n"}
              <Text style={styles.editorialAccent}>{content.editorialAccent}</Text>
            </Text>
            <Text style={styles.editorialText}>
              {content.editorialText}
            </Text>

            <ImageBackground
              source={{
                uri: content.editorialImage,
              }}
              imageStyle={styles.editorialImage}
              style={styles.imageCard}
            >
              <View style={styles.imageOverlay} />
              <View style={styles.imageFooter}>
                <Text style={styles.verifiedIcon}>✓</Text>
                <Text style={styles.imageFooterText}>
                  {role === "citizen" ? "Identity Protected System" : "Operational Authority Verified"}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.loginCard}>
            <View style={styles.glowOrb} />
            <View style={styles.loginCardInner}>
              <View style={styles.loginIntro}>
                <Text style={styles.loginTitle}>Welcome Back</Text>
                <Text style={styles.loginSubtitle}>
                  Please authenticate to access your {role === "citizen" ? "relief" : "manager"} dashboard.
                </Text>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>{role === "citizen" ? "Username or Digital ID" : "Username"}</Text>
                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldIcon}>▣</Text>
                  <TextInput
                    value={citizenId}
                    onChangeText={setCitizenId}
                    placeholder={role === "citizen" ? "DAM-XXXX-XXXX" : "Enter username"}
                    placeholderTextColor="#8f978f"
                    style={styles.fieldInput}
                    autoCapitalize={role === "citizen" ? "characters" : "none"}
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
        <Input 
          label="Username" 
          placeholder="Enter username" 
          value={citizenId}
          onChangeText={setCitizenId}
        />
        <Input 
          label="Password" 
          placeholder="********" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword}
        />
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


