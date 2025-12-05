import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useCollection } from "../lib/CollectionContext";
import CDCard from "../../components/CDCard";


export default function CDsScreen() {
  const { cds } = useCollection();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cds}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Nenhum CD adicionado.</Text>}
        renderItem={({ item }) => (
          <CDCard
            cd={item}
            onPress={() => router.push(`/book/${item.id}`)}
          />
        )}
      />
    </View>
  );
}
