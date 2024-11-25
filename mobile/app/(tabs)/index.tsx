import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { FAB } from "react-native-paper";
import { styles } from '../../assets/styles/stylesIndex';
import React from "react";
import { Fuel } from "lucide-react-native";
import theme from "../../assets/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(true);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
    const [gasStations, setGasStations] = useState<any[]>([]);
    const mapRef = useRef<MapView>(null);
    const apiKey = 'AIzaSyB7tn6ZJMq92Ys6kbSVV-J3HS3-fSAzeew';

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

            await AsyncStorage.setItem('userLocation', JSON.stringify(userLocation));
        } catch (error) {
            console.error("Erro ao buscar localização:", error);
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

    const fetchGasStations = async (latitude: number, longitude: number) => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2500&type=gas_station&key=${apiKey}`;

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

    const defaultLocation = {
        latitude: -3.0967102598408895,
        longitude: -60.02555758643335,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
    };

    const region = location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
    } : defaultLocation;

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
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={region}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsMyLocationButton={false}
                        showsCompass={true}
                    >
                        {gasStations.map((place, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: place.geometry.location.lat,
                                    longitude: place.geometry.location.lng,
                                }}
                                title={place.name}
                                description={place.vicinity}
                            >
                                <View style={styles.balon}>
                                    <Fuel size={20} color={theme.colors.primary} />
                                </View>
                            </Marker>
                        ))}
                    </MapView>
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
