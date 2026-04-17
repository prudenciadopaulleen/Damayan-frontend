import React, { useState } from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CitizenBottomNav } from "../../shared";
import { styles } from "../styles/CitizenHouseholdRegistrationScreen.styles";

const backgroundUri =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC--5f9c3_GRfzlSPjisj7YAsAyhZwu63BDlzdjwfjjAqWG4v1Hy5a8NnY5TDUoVugC2ldLKxupmgehjjXUscnnmu2spH1UBsXN90N-5-1bms_G2Z1MwkjLaiIlEFRk3fLuIhsTLLS5yAWQvO4DWauAQARcP8_Bf3H8Tub_I_y0VluHWEU3GVQ9Z9DmuaZXBzdpacrMglmtyvymi-YsYmCwk_36lFPKCex5OZmaHlr0g4UVH8IHv8p7Kpy0aadbPnfpfYgjpg0Vu1IW";

const bloodTypes = ["A+", "A-", "B+", "O+"];
const genderOptions = ["Select", "Female", "Male", "Non-binary", "Prefer not to say"];

export function CitizenHouseholdRegistrationScreen({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [active] = useState<"home" | "relief" | "qr" | "profile">("home");
  const [gender, setGender] = useState("Select");
  const [bloodType, setBloodType] = useState("A+");
  const [consent, setConsent] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={onBack} style={styles.iconButton}>
            <Text style={styles.iconText}>{"<"}</Text>
          </Pressable>
          <Text style={styles.topTitle}>Citizen Registration</Text>
        </View>
        <Text style={styles.brand}>Verdant Relief</Text>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.stepLabel}>Step 01 / Registration</Text>
        <Text style={styles.heroTitle}>Personal Identity Profile</Text>
        <Text style={styles.heroCopy}>
          Your health and identity are vital for coordinating relief. Please
          provide accurate details to ensure medical responders have the context
          they need.
        </Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Full Legal Name</Text>
          <TextInput
            placeholder="As shown on official ID"
            placeholderTextColor="#7d867b"
            style={styles.textField}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldGroup, styles.rowLarge]}>
            <Text style={styles.fieldLabel}>Date of Birth</Text>
            <TextInput placeholder="YYYY-MM-DD" placeholderTextColor="#7d867b" style={styles.textField} />
          </View>
          <View style={[styles.fieldGroup, styles.rowSmall]}>
            <Text style={styles.fieldLabel}>Gender Identity</Text>
            <View style={styles.selectField}>
              <Text style={[styles.selectText, gender === "Select" && styles.placeholderText]}>{gender}</Text>
            </View>
            <View style={styles.optionRow}>
              {genderOptions.slice(1).map((option) => (
                <Pressable key={option} onPress={() => setGender(option)} style={styles.optionChip}>
                  <Text style={styles.optionChipText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.medicalCard}>
        <View style={styles.medicalHeader}>
          <View style={styles.medicalIconWrap}>
            <Text style={styles.medicalIcon}>+</Text>
          </View>
          <View style={styles.medicalHeaderCopy}>
            <Text style={styles.medicalTitle}>Critical Medical Data</Text>
            <Text style={styles.medicalSubtitle}>
              Used exclusively by medical triage teams during emergencies.
            </Text>
          </View>
        </View>

        <View style={styles.medicalGrid}>
          <View style={styles.bloodTypeSection}>
            <Text style={styles.fieldLabel}>Blood Type</Text>
            <View style={styles.bloodGrid}>
              {bloodTypes.map((type) => {
                const selected = type === bloodType;
                return (
                  <Pressable
                    key={type}
                    onPress={() => setBloodType(type)}
                    style={[styles.bloodButton, selected && styles.bloodButtonActive]}
                  >
                    <Text style={[styles.bloodButtonText, selected && styles.bloodButtonTextActive]}>
                      {type}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.conditionsSection}>
            <Text style={styles.fieldLabel}>Conditions & Allergies</Text>
            <TextInput
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholder="List any chronic conditions (e.g., Diabetes, Asthma) or severe allergies (e.g., Penicillin, Peanuts)..."
              placeholderTextColor="#7d867b"
              style={styles.textArea}
            />
          </View>
        </View>
      </View>

      <Pressable onPress={() => setConsent((value) => !value)} style={styles.consentRow}>
        <View style={[styles.checkbox, consent && styles.checkboxActive]}>
          {consent ? <Text style={styles.checkboxMark}>✓</Text> : null}
        </View>
        <Text style={styles.consentText}>
          I certify that the information provided is accurate. I understand this data
          is used for humanitarian coordination under the{" "}
          <Text style={styles.consentLink}>Privacy Protection Protocol</Text>.
        </Text>
      </Pressable>

      <View style={styles.actionSection}>
        <Pressable onPress={onContinue} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continue Registration</Text>
          <Text style={styles.primaryButtonArrow}>-&gt;</Text>
        </Pressable>
      </View>

      <CitizenBottomNav active={active} />
    </ScrollView>
  );
}


