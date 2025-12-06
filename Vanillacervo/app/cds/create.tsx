// app/cds/create.tsx
import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { createCD } from "../../lib/api";
import { useRouter } from "expo-router";

export default function CreateCD() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function save() {
    if (!title.trim()) return;
    setSaving(true);
    try {
      await createCD({ title: title.trim(), artist: artist.trim(), year: Number(year) || 0 });
      router.push("/(tabs)/cds");
    } catch (e) {
      console.warn(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <TextInput label="Título" value={title} onChangeText={setTitle} style={{ marginBottom: 12 }} />
        <TextInput label="Artista" value={artist} onChangeText={setArtist} style={{ marginBottom: 12 }} />
        <TextInput label="Ano" value={year} onChangeText={setYear} keyboardType="numeric" style={{ marginBottom: 12 }} />

        <Button mode="contained" onPress={save} loading={saving}>
          Salvar
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
