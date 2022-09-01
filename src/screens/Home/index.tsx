/* eslint-disable no-console */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante Existe",
        "Já existe um participante na lista com esse nome."
      );
    }

    setParticipants((prevState) => [...prevState, participantName]);

    setParticipantName("");
    return null;
  }

  function handleParticipantRemove(name: string) {
    return Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ),
      },
      { text: "Não", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text key="1" style={styles.eventName}>
        Nome do evento
      </Text>
      <Text key="2" style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={handleParticipantRemove}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
      />
    </View>
  );
}
