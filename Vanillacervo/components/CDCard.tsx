// components/CDCard.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { CD } from "../types";

type Props = {
  cd: CD;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CDCard({ cd, onEdit, onDelete }: Props) {
  return (
    <Card style={styles.card}>
      <Card.Title title={cd.title} subtitle={cd.artist} />
      <Card.Content>
        <Text>Ano: {String(cd.year ?? "—")}</Text>
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
