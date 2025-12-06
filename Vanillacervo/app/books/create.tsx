import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { createBook } from "../../lib/api";
import { useRouter } from "expo-router";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function save() {
    if (!title.trim()) return;
    setSaving(true);
    try {
      await createBook({ title: title.trim(), author: author.trim(), year: Number(year) || 0 });
      router.push("/(tabs)/books");
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
        <TextInput label="Autor" value={author} onChangeText={setAuthor} style={{ marginBottom: 12 }} />
        <TextInput label="Ano" value={year} onChangeText={setYear} keyboardType="numeric" style={{ marginBottom: 12 }} />

        <Button mode="contained" onPress={save} loading={saving}>
          Salvar
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
