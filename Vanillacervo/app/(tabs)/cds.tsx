import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { FAB, ActivityIndicator, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import CDCard from "../../components/CDCard";
import { getCDs, deleteCD } from "../../lib/api";
import { CD } from "../../types";

export default function CDsScreen() {
  const [cds, setCDs] = useState<CD[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCDs();
      setCDs(data);
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
    ) : cds.length === 0 ? (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Nenhum CD encontrado.</Text>
      </View>
    ) : (
      <ScrollView>
        {cds.map((c) => (
          <CDCard
            key={c.id}
            cd={c}
            onEdit={() =>
              router.push({
                pathname: "../cds/edit/[id]",
                params: { id: String(c.id) },
              })
            }
            onDelete={async () => {
              try {
                await deleteCD(c.id);
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
      onPress={() => router.push("../cds/create")}
    />
  </>
);

}