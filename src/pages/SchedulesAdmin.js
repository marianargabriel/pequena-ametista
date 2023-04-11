import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const bookings = [
    {
        id: 1,
        date: '01/05/2023',
        time: '10:00 AM',
        service: 'Manicure',
        client: 'Ana',
    },
    {
        id: 2,
        date: '01/06/2023',
        time: '11:00 AM',
        service: 'Pedicure',
        client: 'Maria',
    },
    {
        id: 3,
        date: '01/07/2023',
        time: '02:00 PM',
        service: 'Corte de cabelo',
        client: 'João',
    },
];

const BeautyBookings = () => {
    const renderBookingItem = ({ item }) => (
        <View style={styles.bookingItem}>
            <Text style={styles.bookingDate}>{item.date}</Text>
            <Text style={styles.bookingTime}>{item.time}</Text>
            <Text style={styles.bookingService}>{item.service}</Text>
            <Text style={styles.bookingClient}>Com {item.client}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.bookingsList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    bookingsList: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    bookingItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    bookingDate: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bookingTime: {
        fontSize: 16,
        marginBottom: 5,
    },
    bookingService: {
        fontSize: 16,
        marginBottom: 5,
    },
    bookingClient: {
        fontSize: 16,
    },
});

export default BeautyBookings;