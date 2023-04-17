import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const bookings = [
    {
        id: 1,
        date: 'Data',
        time: 'Hora',
        service: 'Subtitulo',
        client: 'Cliente',
        details: 'Serviço',
    },
    {
        id: 2,
        date: 'Data',
        time: 'Hora',
        service: 'Subtitulo',
        client: 'Cliente',
        details: 'Serviço',
    },
    {
        id: 3,
        date: 'Data',
        time: 'Hora',
        service: 'Subtitulo',
        client: 'Cliente',
        details: 'Serviço',
    },
];

const SchedulesAdmin = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);

    const handleBookingPress = (booking) => {
        setSelectedBooking(booking);
    };

    const renderBookingItem = ({ item }) => (
        <TouchableOpacity style={styles.bookingItem} onPress={() => handleBookingPress(item)}>
            <Text style={styles.bookingDate}>{item.date}</Text>
            <Text style={styles.bookingTime}>{item.time}</Text>
            <Text style={styles.bookingService}>{item.service}</Text>
            <Text style={styles.bookingClient}>Com {item.client}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.bookingsList}
            />
            {selectedBooking && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>Detalhes da Marcação</Text>
                    <Text style={styles.detailsText}>{selectedBooking.details}</Text>
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => setSelectedBooking(null)}
                    >
                        <Text style={styles.detailsButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    detailsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 16,
        marginBottom: 20,
    },
    detailsButton: {
        backgroundColor: '#FFC0CB',
        borderRadius: 10,
        padding: 10,
    },
    detailsButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default SchedulesAdmin;