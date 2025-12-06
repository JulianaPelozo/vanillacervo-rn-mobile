// app/books/edit/[id].tsx
import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TextInput, ActivityIndicator, Text } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getBook, updateBook } from "../../../lib/api";

export default function EditBook() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const book = await getBook(Number(id));
        setTitle(book.title ?? "");
        setAuthor(book.author ?? "");
        setYear(String(book.year ?? ""));
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
      await updateBook(Number(id), { title: title.trim(), author: author.trim(), year: Number(year) || 0 });
      router.push("/(tabs)/books");
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
        <TextInput label="Autor" value={author} onChangeText={setAuthor} style={{ marginBottom: 12 }} />
        <TextInput label="Ano" value={year} onChangeText={setYear} keyboardType="numeric" style={{ marginBottom: 12 }} />

        <Button mode="contained" onPress={save} loading={saving}>
          Salvar
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
