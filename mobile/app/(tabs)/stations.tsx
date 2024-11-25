import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../assets/styles/stylesAlert';
import { MapPinned, CalendarDays, Clock } from 'lucide-react-native'

type alertItem = {
  local: string
  data: string
  horario: string
}


const OcorrenciaItem = ({ local, data, horario }: alertItem) => (
  <View style={styles.innerBox}>
    <View style={styles.infoRow}>

      <MapPinned size={20} color="#000" />
      <Text style={styles.infoText}>Local: {local}</Text>

    </View>
    <View style={styles.infoRow}>

      <CalendarDays size={20} color="#000" />
      <Text style={styles.infoText}>Data: {data}</Text>

    </View>

    <View style={styles.infoRow}>

      <Clock size={20} color="#000" />
      <Text style={styles.infoText}>Horário: {horario}</Text>

    </View>
  </View>
);

export default function Ocorrencia() {
  const dadosMocados = [
    { local: 'Local 1', data: '01/01/2024', horario: '10:00' },
    { local: 'Local 2', data: '02/01/2024', horario: '14:30' },
    { local: 'Local 3', data: '03/01/2024', horario: '16:45' },
    { local: 'Local 4', data: '04/01/2024', horario: '09:15' },
    { local: 'Local 5', data: '05/01/2024', horario: '12:00' },

  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ocorrência</Text>
      <View style={styles.mainBox}>
        {dadosMocados.map((dados, index) => (
          <OcorrenciaItem
            key={index}
            local={dados.local}
            data={dados.data}
            horario={dados.horario}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Crie a sua</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
