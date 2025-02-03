// read the longitude and latitude of each pharmacy

import pharmacyData from '../constants/Pharmacy_dataSet2.json';

export const markers = [
    ...pharmacyData.map((pharmacy) => ({
        coordinate: {
            latitude: pharmacy.latitude,
            longitude: pharmacy.longitude,
        },
        title: pharmacy.name,
        rating: pharmacy.rating,
        working_hours: pharmacy.working_hours
    })),
];