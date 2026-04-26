import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { sendLocationToAPI, Coords } from "./src/services/sendLocation-service";

const GOOGLE_MAPS_APIKEY = "AIzaSyAQYziW6JInQijiLF_Kj6L1ht4OrqKi4Ic";

export default function App() {
  const origin: LatLng = {
    latitude: -23.55052,
    longitude: -46.633308,
  };

  const destination: LatLng = {
    latitude: -23.555,
    longitude: -46.64,
  };

  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [currentPosition, setCurrentPosition] = useState<LatLng>(origin);

  // 🚗 simulação de movimento
  // useEffect(() => {
  //   if (routeCoords.length === 0) return;

  //   let index = 0;

  //   const interval = setInterval(() => {
  //     if (index < routeCoords.length) {
  //       setCurrentPosition(routeCoords[index]);
  //       index++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 1000); // velocidade do movimento

  //   return () => clearInterval(interval);
  // }, [routeCoords]);

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
          timeInterval: 3000,
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
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.553,
          longitude: -46.637,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* Origem */}
        <Marker coordinate={origin} title="Loja" />

        {/* Destino */}
        <Marker coordinate={destination} title="Cliente" />

        {/* 🚗 Motorista */}
        <Marker
          coordinate={currentPosition}
          title="Motorista"
          pinColor="blue"
        />

        {/* 🛣️ Rota real */}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          onReady={(result) => {
            setRouteCoords(result.coordinates);
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

// MAPA

// import { StyleSheet, View } from "react-native";
// import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

// type Coord = {
//   latitude: number;
//   longitude: number;
// };

// export default function App() {
//   // 📍 Origem (loja)
//   const origin: Coord = {
//     latitude: -23.55052,
//     longitude: -46.633308,
//   };

//   // 📍 Destino (cliente)
//   const destination: Coord = {
//     latitude: -23.555,
//     longitude: -46.64,
//   };

//   // 🔄 Rota simulada (vários pontos entre origem e destino)
//   const route: Coord[] = [
//     origin,
//     { latitude: -23.551, longitude: -46.635 },
//     { latitude: -23.552, longitude: -46.637 },
//     { latitude: -23.553, longitude: -46.638 },
//     { latitude: -23.554, longitude: -46.639 },
//     destination,
//   ];

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: -23.553,
//           longitude: -46.637,
//           latitudeDelta: 0.02,
//           longitudeDelta: 0.02,
//         }}
//       >
//         {/* Origem */}
//         <Marker coordinate={origin} title="Loja" />

//         {/* Destino */}
//         <Marker coordinate={destination} title="Cliente" />

//         {/* Rota */}
//         <Polyline coordinates={route} strokeWidth={4} />
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });

// BACK UP
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import MapView, {Region} from "react-native-maps";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>WayTrace</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#eee",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     color: "#0af",
//     fontWeight: 700,
//     fontSize: 35,
//   },
// });
