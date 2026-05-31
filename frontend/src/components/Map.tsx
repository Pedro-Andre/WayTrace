import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { Coords } from "../../../shared/coords-model";
import { sendLocationToAPI } from "../services/sendLocation-service";

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_API_KEY;

function Map() {
  const destination: LatLng = {
    latitude: -23.555,
    longitude: -46.64,
  };

  const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);

  // Pede permissão da localização
  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permissão negada");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (loc) => {
          const coords: Coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };

          // 📍 Atualiza posição REAL
          setCurrentPosition(coords);

          // 📡 Envia pra API
          sendLocationToAPI(coords);
        },
      );
    })();

    return () => {
      // if (subscription) {;
      subscription?.remove();
    };
  }, []);

  if (!currentPosition) return null;

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* Origem */}
      <Marker coordinate={currentPosition} title="Você" pinColor="blue" />

      {/* Destino */}
      <Marker coordinate={destination} title="Destino" />

      {/* Motorista */}
      <MapViewDirections
        origin={currentPosition}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={4}
        strokeColor={"#f60"}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "60%",
    marginBlock: "auto",
    marginInline: "auto",
    padding: 2,
  },
});

export default Map;
