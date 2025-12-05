import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCollection } from "../lib/CollectionContext";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getItemById } = useCollection();

  const item = getItemById(id as string);

  if (!item)
    return (
      <View style={{ padding: 16 }}>
        <Text>Item não encontrado</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="headlineMedium">{item.title}</Text>

      {item.type === "book" ? (
        <Text style={{ marginTop: 12 }}>Autor: {item.author}</Text>
      ) : (
        <Text style={{ marginTop: 12 }}>Artista: {item.artist}</Text>
      )}

      <Text style={{ marginTop: 12 }}>Ano: {item.year ?? "—"}</Text>
      <Text style={{ marginTop: 12 }}>Tipo: {item.type}</Text>

      <Button mode="contained" onPress={() => router.back()} style={{ marginTop: 20 }}>
        Voltar
      </Button>
    </View>
  );
}
