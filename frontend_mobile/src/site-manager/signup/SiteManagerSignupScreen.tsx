import React, { useState, useRef } from "react";
import { Text, View, Pressable } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { MobileHeader } from "../../components/MobileShell";
import { Button, Input, Pill, Screen, SectionCard } from "../../components/UI";
import { siteManagerStyles } from "../shared";
import { theme } from "../../theme";

export function SiteManagerSignupScreen({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const uploadBoxRef = useRef<View>(null);

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

  async function handleFileFromDrop(files: FileList) {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setSelectedFileName(file.name);
      }
    }
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer?.files) {
      handleFileFromDrop(e.dataTransfer.files);
    }
  }

  return (
    <Screen>
      <MobileHeader title="Site Manager Registration" subtitle="Create account" onBack={onBack} />
      <SectionCard style={siteManagerStyles.primaryHero}>
        <Pill label="Register" tone="secondary" />
        <Text style={siteManagerStyles.heroTitle}>Create A Site Manager Account</Text>
        <Text style={siteManagerStyles.heroText}>
          Register to validate your credentials to access site operations, supplies tracking, and rescue logs.
        </Text>
      </SectionCard>
      
      <SectionCard>
        <View style={{ gap: 20 }}>
          <Input label="CREATE USERNAME" placeholder="site.manager.01" />
          <Input label="CREATE PASSWORD" placeholder="********" secureTextEntry />
          
          <View style={{ gap: 8 }}>
            <Text style={{ color: theme.textMuted, fontSize: 13, fontWeight: "800", letterSpacing: 1.2, textTransform: "uppercase" }}>
              UPLOAD GOVERNMENT ID
            </Text>
            <Pressable 
              ref={uploadBoxRef}
              onPress={handlePickDocument} 
              style={[
                {
                  minHeight: 140,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: theme.tertiary,
                  borderStyle: "dashed",
                  backgroundColor: theme.surfaceSoft,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                },
                isDragging && {
                  borderColor: theme.primary,
                  backgroundColor: theme.primaryLight,
                  borderWidth: 2.5,
                }
              ]}
              onDragEnter={handleDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Text style={{ fontSize: 36, opacity: 0.8 }}>📄</Text>
              <View style={{ alignItems: "center", gap: 6, marginTop: 4 }}>
                <Text style={{ color: theme.primary, fontWeight: "800", fontSize: 14 }}>
                  {selectedFileName ? "FILE SELECTED" : isDragging ? "DROP FILE HERE" : "UPLOAD FILE OR DRAG HERE"}
                </Text>
                <Text style={{ color: theme.textLight, fontSize: 12, fontWeight: "600", textTransform: "uppercase" }}>
                  JPG OR PNG • MAX 5MB
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
                    maxWidth: "90%",
                  }}>
                    ✓ {selectedFileName}
                  </Text>
                )}
              </View>
            </Pressable>
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
