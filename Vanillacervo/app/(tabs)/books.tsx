import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useCollection } from "../lib/CollectionContext";
import BookCard from "../../components/BookCard";

export default function BooksScreen() {
  const { books } = useCollection();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Nenhum livro adicionado.</Text>}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => router.push(`/book/${item.id}`)}
          />
        )}
      />
    </View>
  );
}
