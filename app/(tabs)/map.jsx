import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { markers } from "../../constants/markers";
import {
  getPharmacyName,
  getPharmacyRating,
  isPharmacyOpen,
} from "../../constants/dataPulling";
import { Ionicons } from "@expo/vector-icons";

const INITIAL_REGION = {
  // Start in Riyadh
  latitude: 24.774265,
  longitude: 46.738586,
  latitudeDelta: 0.27,
  longitudeDelta: 0.27,
};

const map = () => {
  const titleSize = 16;
  const descriptionSize = 14;
  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinate}>
            <Callout>
              <View>
                <Text
                  style={{ fontSize: titleSize }}
                  className="font-rsemibold"
                >
                  {getPharmacyName(marker.title)}
                </Text>

                <Text
                  style={{ fontSize: descriptionSize }}
                  className="font-rlight"
                >
                  {getPharmacyRating(marker.rating) + " / 5 "}
                  <Ionicons
                    name="star-outline"
                    size={descriptionSize}
                    color="#F3DF00"
                  />
                </Text>

                <Text
                  style={{
                    fontSize: descriptionSize,
                    color:
                      isPharmacyOpen(marker.working_hours) === "Opened"
                        ? "green"
                        : "red",
                  }}
                  className="font-rlight"
                >
                  {isPharmacyOpen(marker.working_hours)}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

export default map;