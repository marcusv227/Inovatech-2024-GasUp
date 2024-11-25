import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../../assets/styles/stylesAlert';
import { DollarSign, Fuel, Pin } from 'lucide-react-native';
import theme from '../../assets/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

type alertItem = {
  local: string;
  preço: string;
  bairro: string;
  latitude: number;
  longitude: number;
  onPress: (latitude: number, longitude: number) => void;
};

const StationsItem = ({
  local,
  preço,
  bairro,
  latitude,
  longitude,
  onPress,
}: alertItem) => (
  <View style={styles.innerBox}>
    <View style={styles.infoRow}>
      <Fuel size={20} color={theme.colors.primary} />
      <Text style={styles.infoText}>{local}</Text>
    </View>
    <View style={styles.infoRow}>
      <Pin size={20} color={theme.colors.primary} />
      <Text style={styles.infoTextBairro}>{bairro}</Text>
    </View>
    <View style={styles.infoRow}>
      <DollarSign size={20} color={theme.colors.primary} />
      <Text style={styles.infoText}>Preço: {preço}</Text>
    </View>
    <TouchableOpacity onPress={() => onPress(latitude, longitude)}>
      <View style={styles.botao}>
        <Text style={styles.buttonText}>Ver posto</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default function Stations() {
  const [gasStations, setGasStations] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  const apiKey = 'AIzaSyB7tn6ZJMq92Ys6kbSVV-J3HS3-fSAzeew';

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  };

  const getUserLocation = async () => {
    return await Location.getCurrentPositionAsync({});
  };

  const fetchGasStations = async (latitude: number, longitude: number) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2500&type=gas_station&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        setGasStations(data.results);
      } else {
        console.error('Erro ao buscar postos de gasolina:', data.error_message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const fetchLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        alert('Permissão para acessar a localização negada!');
        return;
      }
      const userLocation = await getUserLocation();
      setLocation(userLocation);
      fetchGasStations(userLocation.coords.latitude, userLocation.coords.longitude);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar localização:', error);
    }
  };

  useEffect(() => {
    const loadLocationFromStorage = async () => {
      const savedLocation = await AsyncStorage.getItem('userLocation');
      if (savedLocation) {
        const parsedLocation = JSON.parse(savedLocation);
        setLocation(parsedLocation);
        fetchGasStations(parsedLocation.coords.latitude, parsedLocation.coords.longitude);
        setLoading(false);
      } else {
        fetchLocation();
      }
    };

    loadLocationFromStorage();
  }, []);

  const handleSelectStation = (latitude: number, longitude: number) => {
    setSelectedStation({ latitude, longitude });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedStation(null);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Postos de Gasolina</Text>
      <View style={styles.mainBox}>
        {gasStations.map((place, index) => (
          <StationsItem
            key={index}
            local={place.name}
            bairro={place.vicinity.split('-')[0]}
            preço={'R$ 6,99'}
            latitude={place.geometry.location.lat}
            longitude={place.geometry.location.lng}
            onPress={handleSelectStation}
          />
        ))}
      </View>

      {/* Modal para exibir o mapa */}
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={{ margin: 0 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <TouchableOpacity onPress={closeModal} style={{ padding: 10 }}>
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Fechar</Text>
          </TouchableOpacity>
          {selectedStation && (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: selectedStation.latitude,
                longitude: selectedStation.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  latitude: selectedStation.latitude,
                  longitude: selectedStation.longitude,
                }}
              >
                <View style={styles.balon}>
                  <Fuel size={20} color='white' />
                </View>
              </Marker>
            </MapView>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}
