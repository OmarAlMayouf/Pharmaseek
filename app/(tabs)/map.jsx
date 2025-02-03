import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { markers } from "../../constants/markers";

const INITIAL_REGION = {
  //Riyadh
  latitude: 24.774265,
  longitude: 46.738586,
  latitudeDelta: 0.27,
  longitudeDelta: 0.27,
};

const getPharmacyName = (name) => {
  if (!name) return "Unknown Pharmacy";
  return name.includes("|") ? name.split("|")[0].trim() : name.trim();
};

const getPharmacyRating = (rating) => {
  if (!rating) return "-- / 5 ⭐";
  return `${rating} / 5 ⭐`;
};
const getPharmacyStatus = (workingHours) => {
  if (!workingHours) return 'Closed';

  try {
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
    const hours = JSON.parse(workingHours)[dayOfWeek];

    if (!hours || hours.toLowerCase() === 'closed') return 'Closed';
    if (hours.toLowerCase() === 'open 24 hours') return 'Opened';

    const timeRanges = hours.split(',');
    for (let timeRange of timeRanges) {
      let [startTime, endTime] = timeRange.trim().split('-');

      const parseTime = (time) => {
        const match = time.match(/(\d+)(?::(\d+))?\s*(AM|PM)/i);
        if (!match) throw new Error('Invalid time format');
        let [, hour, minute = '0', modifier] = match;
        hour = parseInt(hour);
        minute = parseInt(minute);
        if (modifier.toUpperCase() === 'PM' && hour !== 12) hour += 12;
        if (modifier.toUpperCase() === 'AM' && hour === 12) hour = 0;
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date;
      };

      let start = parseTime(startTime);
      let end = parseTime(endTime);

      if (end < start) end.setDate(end.getDate() + 1);

      if (now >= start && now <= end) return 'Opened';
    }
  } catch (error) {
    return 'Closed';
  }

  return 'Closed';
};

const onMarkerSelected = (marker) => {};

const map = () => {
  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <MapView
        style={StyleSheet.absoluteFill}
        // provider={ PROVIDER_GOOGLE }
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            //title={getPharmacyName(marker.title)}
            //description={getPharmacyRating(marker.rating)}
          >
            <Callout>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {getPharmacyName(marker.title)}
                </Text>

                <Text style={{ fontSize: 14 }}>
                  {getPharmacyRating(marker.rating)}
                </Text>

                <Text 
                  style={{ 
                    fontSize: 14,
                    color: getPharmacyStatus(marker.working_hours) === 'Opened' ? 'green' : 'red' 
                  }}
                >
                  {getPharmacyStatus(marker.working_hours)}
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
