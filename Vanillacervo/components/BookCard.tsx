// app/components/BookCard.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { Book } from "../lib/CollectionContext";

type Props = {
  book: Book;
  onPress?: () => void;
};

export default function BookCard({ book, onPress }: Props) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Title title={book.title} subtitle={`Autor: ${book.author}`} />
      <Card.Content>
        <Text>Ano: {book.year}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 12,
  },
});
