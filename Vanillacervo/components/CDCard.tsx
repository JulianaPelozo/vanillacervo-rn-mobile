import React from "react";
import { Card, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { CD } from "../app/lib/CollectionContext";

type Props = {
  cd: CD;
  onPress?: () => void; 
};

export default function CDCard({ cd, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={{ marginBottom: 12 }}>
        <Card.Title
          title={cd.title}
          subtitle={`Artista: ${cd.artist}`}
        />
        <Card.Content>
          <Text>{cd.year ?? "Ano desconhecido"}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}