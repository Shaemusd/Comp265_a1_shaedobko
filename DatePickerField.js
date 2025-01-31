import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function DatePickerField({ date, onChangeDate }) {
    // If the picker is visible
    const [showPicker, setShowPicker] = useState(false);

    // Handle opening the picker
    const openPicker = () => {
        setShowPicker(true);
    };

    // Handle user picking a date
    const onDateChange = (event, selectedDate) => {
        // For iOS, user can press cancel and selectedDate might be undefined
        // For Android, event.type might be 'dismissed'
        setShowPicker(false);

        if (selectedDate) {
            // Notify the parent about the new date
            onChangeDate(selectedDate);
        }
    };

    // Format the date to a readable string
    const formattedDate = date ? date.toISOString().split('T')[0] : '';

    return (
        <View>
            {/* Display the chosen date as text or a button */}
            <Button title={`Date: ${formattedDate}`} onPress={openPicker} />

            {/* Show the picker when showPicker is true */}
            {showPicker && (
                <DateTimePicker
                    value={date || new Date()}   // default to "today" if date not set
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                />
            )}
        </View>
    );
}
