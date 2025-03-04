import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Helper function to format date as "Today", "Yesterday", or "Last Monday", etc.
const formatDateToLastWeekday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today to midnight

    let inputDate = new Date(date);
    inputDate.setDate(inputDate.getDate() + 1); // ✅ Fix: Shift the input date forward by 1 day (this drove me insane)
    inputDate.setHours(0, 0, 0, 0); // Reset time to midnight

    // Convert both to 'YYYY-MM-DD' format for correct matching
    const todayStr = today.toLocaleDateString('en-CA'); 
    const inputStr = inputDate.toLocaleDateString('en-CA'); 

    // console.log("DEBUG LOG:");
    // console.log("Today (Local):", todayStr);
    // console.log("Input Date (Shifted):", inputStr);
    // console.log("Days Ago:", Math.floor((today - inputDate) / (1000 * 60 * 60 * 24)));

    const daysAgo = Math.floor((today - inputDate) / (1000 * 60 * 60 * 24));
    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (inputStr === todayStr) {
        return "Today";
    } else if (daysAgo === 1) {
        return "Yesterday";
    } else if (daysAgo >= 2 && daysAgo <= 7) {
        return `Last ${weekdayNames[inputDate.getDay()]}`;
    }

    return null; // Hide anything older than a week
};




export default function LastWeekMoods({ entries }) {
    // Filter entries for **today, yesterday, and last 7 days only**
    const filteredEntries = entries
        .map(entry => ({
            formattedDate: formatDateToLastWeekday(entry.date),
            mood: entry.mood,
            note: entry.note || "", // Default to empty string if no note
        }))
        .filter(entry => entry.formattedDate !== null); // Remove anything too old

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Past Week Moods</Text>
            <ScrollView style={styles.listContainer}>
                {filteredEntries.length === 0 ? (
                    <Text style={styles.emptyText}>No moods logged yet.</Text>
                ) : (
                    filteredEntries.map((entry, index) => (
                        <View key={index} style={styles.entryItem}>
                            <Text style={styles.entryText}>
                                {entry.formattedDate} - {entry.mood} 
                                {entry.note ? `, "${entry.note}"` : ""}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FFC107', // Golden Yellow
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121', // Dark Charcoal
        marginBottom: 10,
    },
    listContainer: {
        maxHeight: 200, // Increased height so it fits today, yesterday, and the last week
    },
    entryItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5DC', // Soft Beige
    },
    entryText: {
        fontSize: 16,
        color: '#212121',
    },
    emptyText: {
        fontSize: 16,
        color: '#212121',
        textAlign: 'center',
        paddingVertical: 10,
    },
});
