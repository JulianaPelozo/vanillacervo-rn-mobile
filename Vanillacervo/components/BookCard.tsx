// components/BookCard.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { Book } from "../types";

type Props = {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
};

export default function BookCard({ book, onEdit, onDelete }: Props) {
  return (
    <Card style={styles.card}>
      <Card.Title title={book.title} subtitle={book.author} />
      <Card.Content>
        <Text>Ano: {String(book.year ?? "—")}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="pencil" onPress={onEdit} accessibilityLabel="Editar" />
        <IconButton icon="delete" onPress={onDelete} accessibilityLabel="Deletar" />
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { margin: 12 },
});
