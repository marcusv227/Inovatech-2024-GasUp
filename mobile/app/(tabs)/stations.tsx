import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/styles/stylesAlert';
import { DollarSign, Fuel } from 'lucide-react-native'
import theme from '../../assets/theme';

type alertItem = {
  local: string
  preço: string
  horario: string
}


const OcorrenciaItem = ({ local, preço }: alertItem) => (
  <View style={styles.innerBox}>
    <View style={styles.infoRow}>

      <Fuel size={20} color={theme.colors.primary} />
      <Text style={styles.infoText}>Local: {local}</Text>

    </View>
    <View style={styles.infoRow}>

      <DollarSign size={20} color={theme.colors.primary} />
      <Text style={styles.infoText}>Preço: {preço}</Text>

    </View>
    <TouchableOpacity>
      <View style={styles.botao}>
        <Text style={styles.buttonText}>Ver rota</Text>
      </View>
    </TouchableOpacity>

  </View>
);

export default function Ocorrencia() {
  const dadosMocados = [
    { local: 'Local 1', preço: 'R$ 6,99', horario: '10:00' },
    { local: 'Local 2', preço: 'R$ 6,99', horario: '14:30' },
    { local: 'Local 3', preço: 'R$ 6,99', horario: '16:45' },
    { local: 'Local 4', preço: 'R$ 6,99', horario: '09:15' },
    { local: 'Local 5', preço: 'R$ 6,99', horario: '12:00' },

  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ocorrência</Text>
      <View style={styles.mainBox}>
        {dadosMocados.map((dados, index) => (
          <OcorrenciaItem
            key={index}
            local={dados.local}
            preço={dados.preço}
            horario={dados.horario}
          />
        ))}
      </View>
    </ScrollView>
  );
}
