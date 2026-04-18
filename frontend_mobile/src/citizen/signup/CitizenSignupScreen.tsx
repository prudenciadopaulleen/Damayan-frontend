import React, { useState } from "react";
import { Text, View, Pressable } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { MobileHeader } from "../../components/MobileShell";
import { Button, Input, Pill, Screen, SectionCard } from "../../components/UI";
import { citizenStyles } from "../shared";
import { theme } from "../../theme";

export function CitizenSignupScreen({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
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

  return (
    <Screen>
      <MobileHeader 
        title="Citizen Registration" 
        subtitle="Create account" 
        onBack={onBack} 
      />
      
      <SectionCard style={citizenStyles.greenHero}>
        <Pill label="Register" tone="warning" />
        <Text style={citizenStyles.heroTitle}>Create A Citizen Account</Text>
        <Text style={citizenStyles.heroBody}>
          Sign up to generate your digital identity, access crisis alerts, and 
          coordinate relief support within our secure sanctuary.
        </Text>
      </SectionCard>
      
      <SectionCard>
        <View style={{ gap: 20 }}>
          <View style={{ gap: 16 }}>
            <Input label="FULL NAME" placeholder="e.g. Juan De La Cruz" />
            <Input label="CREATE USERNAME" placeholder="citizen.unique.id" />
            <Input label="PASSWORD" placeholder="********" secureTextEntry />
            
            <View style={{ gap: 8 }}>
              <Text style={{ 
                color: theme.textMuted, 
                fontSize: 13, 
                fontWeight: "800", 
                letterSpacing: 1.2, 
                textTransform: "uppercase" 
              }}>
                UPLOAD GOVERNMENT ID
              </Text>
              <Pressable 
                onPress={handlePickDocument} 
                style={citizenStyles.uploadBox}
              >
                <Text style={{ fontSize: 36, opacity: 0.8 }}>📄</Text>
                <View style={{ alignItems: "center", gap: 6, marginTop: 4 }}>
                  <Text style={citizenStyles.uploadTitle}>
                    {selectedFileName ? "FILE SELECTED" : "UPLOAD FILE OR DRAG HERE"}
                  </Text>
                  <Text style={citizenStyles.uploadHint}>
                    {selectedFileName ? selectedFileName : "JPG OR PNG • MAX 5MB"}
                  </Text>
                  {selectedFileName && (
                    <Text style={{
                      marginTop: 4,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      backgroundColor: theme.primaryLight,
                      borderRadius: 8,
                      color: theme.primary,
                      fontSize: 12,
                      fontWeight: "700",
                    }}>
                      ✓ Verified
                    </Text>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
          
          <Button label="Submit Registration" onPress={onSubmit} tone="primary" />

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
            <Text style={{ color: theme.textMuted, fontSize: 14, fontWeight: "400" }}>
              Already have an account?{" "}
            </Text>
            <Pressable onPress={onBack}>
              <Text style={{ color: theme.primary, fontSize: 14, fontWeight: "800" }}>
                Log in here.
              </Text>
            </Pressable>
          </View>
        </View>
      </SectionCard>
    </Screen>
  );
}
