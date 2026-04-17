import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CitizenBottomNav } from "../../shared";
import { styles } from "../styles/CitizenHouseholdMembersScreen.styles";

const familyImageUri =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACb6xMcSZzNzJTsIvbQnebYQbMcbXWDuBeXFUicBSe1YEjdaoD0q6pfSt_O-v4ihIk-yiS5rs_3rmhCVRjor3VHvc0v5mZ4is348YC4b-Q_DeFuLCqvTsPadkPnRSmNNL0onPc7gzVkhgAfpA-SY9N3wPgeWQHvpVRWvCyvIZXf7qSrbHu23aIGQu459C7d2wvapdb6DOvrBaWk_d3ATAxlGuPhkdBBVk6Fi4_GAAxPdrczA2QiD5A6FL3MS3HBnkK0CZMdS-Mlr4n";

const relationshipOptions = ["Spouse", "Child", "Parent", "Sibling", "Other"];
const quickNeeds = [
  { id: "wheelchair", icon: "A", label: "Requires Wheelchair" },
  { id: "medication", icon: "M", label: "Needs Medication" },
  { id: "infant", icon: "I", label: "Infant Care" },
];

export function CitizenHouseholdMembersScreen({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [active] = useState<"home" | "relief" | "qr" | "profile">("home");
  const [relationship, setRelationship] = useState("Select relationship");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  function toggleNeed(needId: string) {
    setSelectedNeeds((current) =>
      current.includes(needId)
        ? current.filter((id) => id !== needId)
        : [...current, needId],
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Pressable onPress={onBack} style={styles.iconButton}>
            <Text style={styles.iconText}>{"<"}</Text>
          </Pressable>
          <Text style={styles.topTitle}>Citizen Registration</Text>
        </View>
        <Text style={styles.brand}>Verdant</Text>
      </View>

      <View style={styles.heroSection}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>Step 2 of 4</Text>
        </View>
        <Text style={styles.heroTitle}>
          Register for my{"\n"}
          <Text style={styles.heroAccent}>Household</Text>
        </Text>
        <Text style={styles.heroCopy}>
          Provide details for each person currently residing with you. This
          ensures appropriate aid distribution and medical prioritization during
          recovery efforts.
        </Text>
      </View>

      <View style={styles.memberCard}>
        <View style={styles.memberHeader}>
          <View>
            <Text style={styles.memberLabel}>Member 01</Text>
            <Text style={styles.memberTitle}>Household Representative</Text>
          </View>
          <Text style={styles.memberStatus}>OK</Text>
        </View>

        <View style={styles.memberGrid}>
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <View style={styles.staticField}>
              <Text style={styles.staticFieldText}>Samuel Aristha</Text>
            </View>
          </View>
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Relationship</Text>
            <View style={styles.staticField}>
              <Text style={styles.staticFieldText}>Self (Head)</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.newMemberCard}>
        <View style={styles.newMemberHeader}>
          <View style={styles.memberNumber}>
            <Text style={styles.memberNumberText}>2</Text>
          </View>
          <Text style={styles.newMemberTitle}>New Family Member</Text>
        </View>

        <View style={styles.formGrid}>
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Full Legal Name</Text>
            <TextInput
              placeholder="e.g. Maria Aristha"
              placeholderTextColor="#7d867b"
              style={styles.inputField}
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Relationship</Text>
            <View style={styles.selectField}>
              <Text
                style={[
                  styles.selectText,
                  relationship === "Select relationship" && styles.placeholderText,
                ]}
              >
                {relationship}
              </Text>
            </View>
            <View style={styles.relationshipRow}>
              {relationshipOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setRelationship(option)}
                  style={styles.relationshipChip}
                >
                  <Text style={styles.relationshipChipText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Age</Text>
            <TextInput
              placeholder="Years"
              placeholderTextColor="#7d867b"
              keyboardType="number-pad"
              style={styles.inputField}
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Specific Needs</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                placeholder="e.g. Requires Wheelchair"
                placeholderTextColor="#7d867b"
                style={styles.iconInputField}
              />
              <Text style={styles.inputIcon}>+</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickSelectSection}>
          <Text style={styles.fieldLabel}>Quick Select Accessibility</Text>
          <View style={styles.quickSelectRow}>
            {quickNeeds.map((need) => {
              const selected = selectedNeeds.includes(need.id);
              return (
                <Pressable
                  key={need.id}
                  onPress={() => toggleNeed(need.id)}
                  style={[
                    styles.needChip,
                    selected && styles.needChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.needChipIcon,
                      selected && styles.needChipIconActive,
                    ]}
                  >
                    {need.icon}
                  </Text>
                  <Text
                    style={[
                      styles.needChipText,
                      selected && styles.needChipTextActive,
                    ]}
                  >
                    {need.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonIcon}>+</Text>
          <Text style={styles.secondaryButtonText}>Add Another Member</Text>
        </Pressable>

        <Pressable onPress={onContinue} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Complete Household</Text>
          <Text style={styles.primaryButtonArrow}>-&gt;</Text>
        </Pressable>
      </View>

      <View style={styles.sidebarCard}>
        <Text style={styles.sidebarIcon}>i</Text>
        <Text style={styles.sidebarTitle}>Why this matters</Text>
        <Text style={styles.sidebarCopy}>
          Accurate household data helps emergency responders calculate food
          ratios, medical supply distribution, and specialized transport needs
          for your specific location.
        </Text>
      </View>

      <View style={styles.privacyCard}>
        <View style={styles.privacyHeader}>
          <Text style={styles.privacyIcon}>S</Text>
          <Text style={styles.privacyTitle}>Privacy Policy</Text>
        </View>
        <Text style={styles.privacyCopy}>
          Your family data is encrypted and only shared with verified
          humanitarian response organizations. We never share sensitive medical
          data with third parties.
        </Text>
      </View>

      <CitizenBottomNav active={active} />
    </ScrollView>
  );
}


