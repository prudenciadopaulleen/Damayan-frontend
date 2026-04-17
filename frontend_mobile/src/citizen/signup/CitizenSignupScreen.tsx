import React, { useState, useRef } from "react";
import { Text, View, Pressable, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { MobileHeader } from "../../components/MobileShell";
import { Button, Input, Pill, Screen, SectionCard } from "../../components/UI";
import { citizenStyles } from "../shared";

const fileIconUri = "https://lh3.googleusercontent.com/aida-public/AB6AXuDmjENrAB5IQ3c2Xo9CHxLTG1Zx_wgP7ExXJmB7Kmj71CYaOiI0t7iQF9ibo6i1cY9WmMIHjRJCv_OhCLyiUH5Eml5d2lTOImfkIKJHeLVUIWIuVb1csgOiXIcvCezQF77Cfu-HJg4eUnCjMQMvjZhbUia0NTelqhZTDjEUY992V_wxjgsl2rHbXTQPkDG1lQEyRLoDyAJNLCd2J0550CN_KivV_VtOiFchDlvQLlJ9PgN6a7lsmlgO--ZHDGsz_hJfyQ7qJyk9GGoV"; // Using existing avatar uri as a placeholder if no better icon, wait, I will use a simple view with a file icon style, or unicode. Let's just use the emoji or an image.
// Actually, let's just use a unicode file icon, it looks fine.

type SignupStep = "CHOICE" | "FORM" | "MEMBERS" | "SUCCESS";
type RegistrationType = "Individual" | "Household";

export function CitizenSignupScreen({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [step, setStep] = useState<SignupStep>("CHOICE");
  const [regType, setRegType] = useState<RegistrationType>("Individual");
  const [members, setMembers] = useState([{ name: "", age: "" }]);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  async function handlePickDocument() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png"],
      });
      if (result.assets && result.assets.length > 0) {
        setSelectedFileName(result.assets[0].name);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  }

  function handleAddMember() {
    setMembers([...members, { name: "", age: "" }]);
  }

  function handleContinue() {
    if (step === "CHOICE") setStep("FORM");
    else if (step === "FORM") {
      if (regType === "Household") setStep("MEMBERS");
      else setStep("SUCCESS");
    } else if (step === "MEMBERS") {
      setStep("SUCCESS");
    } else {
      onSubmit();
    }
  }

  function renderView() {
    switch (step) {
      case "CHOICE":
        return (
          <View style={{ gap: 20 }}>
            <SectionCard style={citizenStyles.greenHero}>
              <Text style={citizenStyles.heroTitle}>How are you registering?</Text>
              <Text style={citizenStyles.heroBody}>Select your registration type to proceed with digital ID generation.</Text>
            </SectionCard>
            <View style={citizenStyles.choiceGrid}>
              <Pressable 
                onPress={() => { setRegType("Individual"); handleContinue(); }}
                style={citizenStyles.choiceCard}
              >
                <View style={citizenStyles.choiceIcon}>
                  <Text style={{ fontSize: 24 }}>👤</Text>
                </View>
                <Text style={citizenStyles.choiceTitle}>Register Myself</Text>
                <Text style={citizenStyles.choiceBody}>Get my personal digital ID for faster entry and personal alerts.</Text>
              </Pressable>

              <Pressable 
                onPress={() => { setRegType("Household"); handleContinue(); }}
                style={citizenStyles.choiceCard}
              >
                <View style={[citizenStyles.choiceIcon, { backgroundColor: "#fff8e1" }]}>
                  <Text style={{ fontSize: 24 }}>🏠</Text>
                </View>
                <Text style={citizenStyles.choiceTitle}>Register My Family</Text>
                <Text style={citizenStyles.choiceBody}>Enroll every household member under one cluster for group aid.</Text>
              </Pressable>
            </View>
          </View>
        );

      case "FORM":
        return (
          <View style={{ gap: 20 }}>
            <SectionCard style={citizenStyles.greenHero}>
              <Pill label={regType} tone="warning" />
              <Text style={citizenStyles.heroTitle}>Account Setup</Text>
              <Text style={citizenStyles.heroBody}>Set up your digital identity and valid credentials.</Text>
            </SectionCard>
            <SectionCard>
              <View style={{ gap: 16 }}>
                <Input label="FULL NAME" placeholder="Juan Dela Cruz" />
                <Input label="CREATE USERNAME" placeholder="juan.dc" />
                <Input label="PASSWORD" placeholder="********" secureTextEntry />
                <View style={{ gap: 8 }}>
                  <Text style={{ color: "#547061", fontSize: 13, fontWeight: "800", letterSpacing: 1.2, textTransform: "uppercase" }}>UPLOAD GOVERNMENT ID</Text>
                  <Pressable onPress={handlePickDocument} style={citizenStyles.uploadBox}>
                    <Text style={{ fontSize: 32 }}>📄</Text>
                    <Text style={{ color: "#1d7b3a", fontWeight: "800", fontSize: 14 }}>{selectedFileName ? "ID UPLOADED" : "TAP TO UPLOAD ID"}</Text>
                    {selectedFileName && <Text style={{ color: "#7a8a7c", fontSize: 12 }}>{selectedFileName}</Text>}
                  </Pressable>
                </View>
                <Button label={regType === "Individual" ? "Complete Registration" : "Next: Add Family"} onPress={handleContinue} />
              </View>
            </SectionCard>
          </View>
        );

      case "MEMBERS":
        return (
          <View style={{ gap: 20 }}>
            <SectionCard style={citizenStyles.greenHero}>
              <Text style={citizenStyles.heroTitle}>Household Members</Text>
              <Text style={citizenStyles.heroBody}>List everyone in your family for group resource allocation.</Text>
            </SectionCard>
            <SectionCard>
              <View style={{ gap: 4 }}>
                {members.map((m, i) => (
                  <View key={i} style={citizenStyles.memberRow}>
                    <View style={{ flex: 2 }}><Input label="Name" placeholder="Full Name" /></View>
                    <View style={{ flex: 1 }}><Input label="Age" placeholder="Age" keyboardType="numeric" /></View>
                  </View>
                ))}
                <Pressable onPress={handleAddMember} style={{ padding: 16, borderStyle: "dashed", borderWidth: 2, borderColor: theme.line, borderRadius: 16, alignItems: "center", marginBottom: 20 }}>
                  <Text style={{ color: theme.textMuted, fontWeight: "800" }}>+ Add Family Member</Text>
                </Pressable>
                <Button label="Complete Registration" onPress={handleContinue} />
              </View>
            </SectionCard>
          </View>
        );

      case "SUCCESS":
        return (
          <View style={{ gap: 20 }}>
            <SectionCard style={citizenStyles.greenHero}>
              <View style={{ backgroundColor: "#fff", width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Text style={{ color: theme.primary, fontSize: 24, fontWeight: "900" }}>✓</Text>
              </View>
              <Text style={citizenStyles.heroTitle}>Digital ID Generated</Text>
              <Text style={citizenStyles.heroBody}>Your {regType} registration is confirmed. Save this QR code for shelter entry.</Text>
            </SectionCard>
            <View style={citizenStyles.qrSuccessCard}>
               <View style={citizenStyles.qrCodeMock}>
                  <View style={{ flex: 1, backgroundColor: "#fff", padding: 8, display: "flex", flexWrap: "wrap", flexDirection: "row", gap: 4 }}>
                     {[...Array(25)].map((_, i) => (
                       <View key={i} style={{ width: 28, height: 28, backgroundColor: i % 3 === 0 ? "#000" : "transparent" }} />
                     ))}
                  </View>
               </View>
               <Text style={{ marginTop: 24, fontSize: 20, fontWeight: "900", color: theme.text, letterSpacing: 2 }}>{regType === "Individual" ? "IND-DC-092" : "FAM-CLUSTER-04"}</Text>
               <Text style={{ color: theme.textMuted, fontSize: 13, marginTop: 4 }}>Valid until Renewal: 2026</Text>
               <View style={{ marginTop: 32, width: "100%" }}>
                 <Button label="Open Citizen Portal" onPress={onSubmit} />
               </View>
            </View>
          </View>
        );
    }
  }

  return (
    <Screen>
      <MobileHeader title="Citizen Portal" subtitle="Registration" onBack={step === "CHOICE" ? onBack : () => setStep("CHOICE")} />
      {renderView()}
    </Screen>
  );
}
