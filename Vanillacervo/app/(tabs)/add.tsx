import React, { useState } from "react";
import { View } from "react-native";
import { Button, Switch, Text, TextInput } from "react-native-paper";
import { useCollection } from "../lib/CollectionContext";
import { useRouter } from "expo-router";

export default function AddScreen() {
  const [isBook, setIsBook] = useState(true);
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();
  const { addBook, addCD } = useCollection();

  const onSubmit = () => {
    if (!title.trim()) return;

    if (isBook) {
      addBook({ title, author: meta, year });
      router.push("/(tabs)/books");
    } else {
      addCD({ title, artist: meta, year });
      router.push("/(tabs)/cds");
    }

    setTitle("");
    setMeta("");
    setYear("");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        Adicionar {isBook ? "Livro" : "CD"}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
        <Text>Livro</Text>
        <Switch value={isBook} onValueChange={setIsBook} />
        <Text>CD</Text>
      </View>

      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 12 }}
      />

      <TextInput
        label={isBook ? "Autor" : "Artista"}
        value={meta}
        onChangeText={setMeta}
        style={{ marginBottom: 12 }}
      />

      <TextInput
        label="Ano (opcional)"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        style={{ marginBottom: 12 }}
      />

      <Button mode="contained" onPress={onSubmit}>
        Salvar
      </Button>
    </View>
  );
}
