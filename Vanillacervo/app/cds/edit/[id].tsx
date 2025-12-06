// app/cds/edit/[id].tsx
import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getCD, updateCD } from "../../../lib/api";

export default function EditCD() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const cd = await getCD(Number(id));
        setTitle(cd.title ?? "");
        setArtist(cd.artist ?? "");
        setYear(String(cd.year ?? ""));
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function save() {
    setSaving(true);
    try {
      await updateCD(Number(id), { title: title.trim(), artist: artist.trim(), year: Number(year) || 0 });
      router.push("/(tabs)/cds");
    } catch (e) {
      console.warn(e);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <ActivityIndicator style={{ marginTop: 32 }} />;

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
