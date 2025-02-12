/*
    This file contains all the helper functions that are used in the other files.
    please please place all the helper functions in this file to make the code there more readable and call them when needed.
*/

import * as Location from "expo-location";

// haversine distance to calculate the distance between client and pharmacy
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Reverse geocode the location to get the address
export const getAddressFromLocation = async (latitude, longitude) => {
  try {
    const address = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address.length > 0) {
      const { street, city, region, postalCode, country } = address[0];
      const rawAddress = `${street || ''}, ${postalCode || ''} ${city || ''}, ${region || ''}, ${country || ''}`;
      return cleanAddress(rawAddress);
    }
    return "Unknown Location";
  } catch (error) {
    console.error("Error reverse geocoding location:", error);
    return "Unknown Location";
  }
};

// Clean the address above
export const cleanAddress = (address) => {
  if (!address) return "Unknown Location";

  const parts = address.split(',').map(part => part.trim());

  const street = parts[0] || '';
  const postalCode = parts[1]?.match(/\d+/)?.[0] || '';
  const city = parts[2] || '';

  return `${street}, ${postalCode} ${city}`;
};

// get the name of the pharmacy
export const getPharmacyName = (name) => {
  if (!name) return "Unknown Pharmacy";
  return name.includes("|") ? name.split("|")[0].trim() : name.trim();
};

// check if the pharmacy is open or closed
export const isPharmacyOpen = (workingHours) => {
  if (!workingHours) return "Closed";
  try {
    const now = new Date();
    const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
    const hours = JSON.parse(workingHours)[dayOfWeek];

    if (!hours || hours.toLowerCase() === "closed") return "Closed";
    if (hours.toLowerCase() === "open 24 hours") return "Opened";

    const timeRanges = hours.split(",");
    for (let timeRange of timeRanges) {
      let [startTime, endTime] = timeRange.trim().split("-");

      const parseTime = (time) => {
        const match = time.match(/(\d+)(?::(\d+))?\s*(AM|PM)/i);
        if (!match) throw new Error("Invalid time format");
        let [, hour, minute = "0", modifier] = match;
        hour = parseInt(hour);
        minute = parseInt(minute);
        if (modifier.toUpperCase() === "PM" && hour !== 12) hour += 12;
        if (modifier.toUpperCase() === "AM" && hour === 12) hour = 0;
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date;
      };

      let start = parseTime(startTime);
      let end = parseTime(endTime);

      if (end < start) end.setDate(end.getDate() + 1);
      if (now >= start && now <= end) return "Opened";
    }
  } catch (error) {
    return "Closed";
  }
  return "Closed";
};

// get the rating of the pharmacy
export const getPharmacyRating = (rating) => {
  if (!rating) return "--";
  return `${rating}`;
};

// clean the street name
export const cleanStreetName = (street) => {
  if (!street || street === "") return "No street info";
  array = street.split(" ");
  for (let i = 0; i < array.length; i++) {
    if (array[i] != undefined && array[i].includes("+")) array.splice(i, 1);
    if (array[i] != undefined && /^\d+$/.test(array[i])) array.splice(i, 1);
    if (array[i] != undefined && /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(array[i]))
      array.splice(i, 1);
  }
  street = array.join(" ");

  return !street ? "No street info" : street;
};