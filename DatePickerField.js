import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePickerField({ date, onChangeDate }) {
    const [showPicker, setShowPicker] = useState(false);

    // Open Picker
    const openPicker = () => {
        setShowPicker(true);
    };

    // Handle Date Selection
    const onDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            onChangeDate(selectedDate);
        }
    };

    // Format Date Display
    const formattedDate = date ? date.toISOString().split('T')[0] : '';

    return (
        <View style={styles.container}>
            {/* Touchable button styled with warm colors */}
            <TouchableOpacity onPress={openPicker} style={styles.dateButton}>
                <Text style={styles.dateText}>📅 {formattedDate}</Text>
            </TouchableOpacity>

            {/* Show Picker when `showPicker` is true */}
            {showPicker && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    dateButton: {
        backgroundColor: '#FF7043', // Sunset Orange
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 18,
        color: '#F5F5DC', // Soft Beige (for contrast)
        fontWeight: 'bold',
    },
});
