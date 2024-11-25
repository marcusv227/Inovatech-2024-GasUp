import { View, Text, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";  // Importando o Marker para desenhar os marcadores no mapa
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { FAB } from "react-native-paper";
import { styles } from '../../assets/styles/stylesIndex';
import * as yup from 'yup';

type FormAlertProps = {
    description: string
}

const alertUpSchema = yup.object({
    description: yup.string().required("*O campo acima não pode está vazio")
})

export default function Index({ description }: FormAlertProps) {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(true);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
    const [gasStations, setGasStations] = useState<any[]>([]); // Para armazenar os postos de gasolina
    const mapRef = useRef<MapView>(null);

    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        return status === "granted";
    };

    const getUserLocation = async () => {
        return await Location.getCurrentPositionAsync({});
    };

    const fetchLocation = async () => {
        try {
            const hasPermission = await requestLocationPermission();
            if (!hasPermission) {
                setLocationPermissionDenied(true);
                return;
            }

            const userLocation = await getUserLocation();
            setLocation(userLocation);
            setLocationPermissionDenied(false);
        } finally {
            setLoading(false);
        }
    };

    const centerUserLocation = () => {
        if (location && mapRef.current) {
            mapRef.current.animateCamera({
                center: location.coords,
            });
        }
    };

    // Função para buscar os postos de gasolina usando a API do Google
    const fetchGasStations = async (latitude: number, longitude: number) => {
        const apiKey = 'AIzaSyD_kPsDn8IpEN-jbXtDyzF4yDOrFWwPoVk'; // Substitua com sua chave de API
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=gas_station&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "OK") {
                setGasStations(data.results);
            } else {
                console.error("Erro ao buscar postos de gasolina:", data.error_message);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    useEffect(() => {
        fetchLocation();
        Location.watchPositionAsync(
            {
                accuracy: Location.LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 1,
            },
            (res) => {
                setLocation(res);
                mapRef.current?.animateCamera({
                    center: res.coords,
                });
                fetchGasStations(res.coords.latitude, res.coords.longitude); // Busca os postos de gasolina a cada atualização de localização
            });
    }, []);

    return (
        <View style={styles.container}>
            {locationPermissionDenied ? (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>
                        Precisamos da sua permissão para acessar a localização.
                    </Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={fetchLocation}>
                        <Text style={styles.buttonText}>Tentar Novamente</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    {location ? (
                        <MapView
                            ref={mapRef}
                            style={styles.map}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002,
                            }}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            showsMyLocationButton={false}
                            showsCompass={false}
                        >
                            {/* Adicionando marcadores para cada posto de gasolina */}
                            {gasStations.map((station, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: station.geometry.location.lat,
                                        longitude: station.geometry.location.lng,
                                    }}
                                    title={station.name}
                                    description={station.vicinity}
                                />
                            ))}
                        </MapView>
                    ) : (
                        <MapView style={styles.map}
                            initialRegion={{
                                latitude: -3.10719,
                                longitude: -60.0261,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002
                            }} />
                    )}
                    <FAB
                        icon="crosshairs-gps"
                        style={styles.fab}
                        onPress={centerUserLocation}
                        color="white"
                    />
                </>
            )}
        </View>
    );
}
