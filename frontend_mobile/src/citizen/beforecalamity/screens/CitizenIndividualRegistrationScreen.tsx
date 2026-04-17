import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Button, Screen } from "../../../components/UI";
import { CitizenBottomNav } from "../../shared";
import { styles } from "../styles/CitizenIndividualRegistrationScreen.styles";

const avatarUri =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDmjENrAB5IQ3c2Xo9CHxLTG1Zx_wgP7ExXJmB7Kmj71CYaOiI0t7iQF9ibo6i1cY9WmMIHjRJCv_OhCLyiUH5Eml5d2lTOImfkIKJHeLVUIWIuVb1csgOiXIcvCezQF77Cfu-HJg4eUnCjMQMvjZhbUia0NTelqhZTDjEUY992V_wxjgsl2rHbXTQPkDG1lQEyRLoDyAJNLCd2J0550CN_KivV_VtOiFchDlvQLlJ9PgN6a7lsmlgO--ZHDGsz_hJfyQ7qJyk9GGoV";

const qrUri =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCrX9Nqu19-hAhpO8rM-9DherTik7ptpsbnrQch9rvtbUQAhyhNf6D82iXcimlfey1XA3K9KgtUzbPxxm-S6NOSLrPT2QbRg82ettvfR239M-w2yBxNuNvAzeNmsH8Z9eMuTpCZPxC00vxBqfNGsnYaX-q-X5i8K3GQ5NzGpBF0W3QdP16xUgAAoybfEuVWOiYqtxjrzlKjuijxK_qGRfvSnb2JDR-r7rMdsKlZxORTjU73kQrDnzs5PeBpIPiP-k6oUhY45_7jXYxy";

export function CitizenIndividualRegistrationScreen({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  return (
    <Screen>
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Pressable onPress={onBack} style={styles.topButton}>
            <Text style={styles.topButtonIcon}>|||</Text>
          </Pressable>
          <Text style={styles.topBarTitle}>Citizen Hub</Text>
        </View>

        <View style={styles.avatarWrap}>
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        </View>
      </View>
      <View style={styles.topDivider} />

      <View style={styles.heroSection}>
        <View style={styles.successBadge}>
          <Text style={styles.successBadgeIcon}>OK</Text>
        </View>
        <Text style={styles.heroTitle}>Your Personal ID is Ready</Text>
        <Text style={styles.heroCopy}>
          Registration complete. This QR ID serves as your digital key for relief
          goods, medical assistance, and emergency shelter access.
        </Text>
      </View>

      <View style={styles.cardShell}>
        <View style={styles.cardGlow} />
        <View style={styles.idCard}>
          <View style={styles.idHeader}>
            <View>
              <Text style={styles.idHeaderLabel}>Damayan Relief Network</Text>
              <Text style={styles.idHeaderTitle}>OFFICIAL CITIZEN ID</Text>
            </View>
            <Text style={styles.idHeaderMark}>SH</Text>
          </View>

          <View style={styles.idContent}>
            <View style={styles.qrSection}>
              <View style={styles.qrFrame}>
                <Image source={{ uri: qrUri }} style={styles.qrImage} />
              </View>
              <View style={styles.idCodeBadge}>
                <Text style={styles.idCodeText}>284-991-001</Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <View style={styles.detailBlock}>
                <Text style={styles.detailLabel}>Full Name</Text>
                <Text style={styles.detailValue}>Elena S. Villacruz</Text>
              </View>

              <View style={styles.detailGrid}>
                <View style={styles.detailMiniBlock}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <View style={styles.verifiedRow}>
                    <Text style={styles.verifiedIcon}>V</Text>
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>

                <View style={styles.detailMiniBlock}>
                  <Text style={styles.detailLabel}>Expiry</Text>
                  <Text style={styles.detailSmallValue}>12 / 2025</Text>
                </View>
              </View>

              <View style={styles.regionBlock}>
                <View style={styles.regionIconWrap}>
                  <Text style={styles.regionIcon}>L</Text>
                </View>
                <View>
                  <Text style={styles.detailLabel}>Registered Region</Text>
                  <Text style={styles.regionText}>Bicol Region, District 2</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <View style={styles.toggleCard}>
          <View style={styles.toggleLeft}>
            <View style={styles.toggleIconWrap}>
              <Text style={styles.toggleIcon}>!</Text>
            </View>
            <View>
              <Text style={styles.toggleTitle}>Enable Alerts</Text>
              <Text style={styles.toggleCopy}>Real-time SMS and push updates</Text>
            </View>
          </View>

          <Switch
            value={alertsEnabled}
            onValueChange={setAlertsEnabled}
            trackColor={{ false: "#e2e3de", true: "#0d631b" }}
            thumbColor="#ffffff"
          />
        </View>

        <Pressable style={styles.primaryAction}>
          <Text style={styles.primaryActionIcon}>DL</Text>
          <Text style={styles.primaryActionText}>Save to Device</Text>
        </Pressable>

        <Button label="Go To Dashboard" onPress={onContinue} tone="ghost" />
      </View>

      <CitizenBottomNav active="qr" />
    </Screen>
  );
}


