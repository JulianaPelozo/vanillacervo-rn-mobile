import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { FAB, ActivityIndicator, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import BookCard from "../../components/BookCard";
import { getBooks, deleteBook } from "../../lib/api";
import { Book } from "../../types";

export default function BooksScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
  <>
    {loading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating size="large" />
      </View>
    ) : books.length === 0 ? (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Nenhum livro encontrado.</Text>
      </View>
    ) : (
      <ScrollView>
        {books.map((b) => (
          <BookCard
            key={b.id}
            book={b}
            onEdit={() =>
              router.push({
                pathname: "../books/edit/[id]",
                params: { id: String(b.id) },
              })
            }
            onDelete={async () => {
              try {
                await deleteBook(b.id);
                await load();
              } catch (e) {
                console.warn(e);
              }
            }}
          />
        ))}
      </ScrollView>
    )}

    <FAB
      icon="plus"
      style={{ position: "absolute", right: 16, bottom: 16 }}
      onPress={() => router.push("../books/create")}
    />
  </>
);

}
