import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

// Mood Emojis (Labels)
const MOOD_EMOJIS = ['😢', '😐', '😊', '😭', '🤩', '😡', '🤪'];

// Mood Order for Data Mapping
const MOOD_ORDER = ['Sad', 'Neutral', 'Happy', 'Very Sad', 'Very Happy', 'Angry', 'Excited'];

export default function MoodBarChart({ entries }) {
    // Count each mood occurrence
    const counts = {
        'Sad': 0, 'Neutral': 0, 'Happy': 0,
        'Very Sad': 0, 'Very Happy': 0, 'Angry': 0, 'Excited': 0
    };

    // Count mood occurrences from entries
    entries.forEach((entry) => {
        if (counts.hasOwnProperty(entry.mood)) {
            counts[entry.mood] += 1;
        }
    });

    // Generate Data Array in Correct Order
    const dataValues = MOOD_ORDER.map(mood => counts[mood]);

    // Chart Data Object
    const chartData = {
        labels: MOOD_EMOJIS,  // Emojis as X-axis labels
        datasets: [
            {
                data: dataValues,
            },
        ],
    };

    // Screen Width for Responsiveness
    const screenWidth = Dimensions.get('window').width;

    return (
        <BarChart
            data={chartData}
            width={screenWidth * 0.9}
            height={250}
            fromZero
            showBarTops
            withInnerLines={false} // Removes extra grid lines for cleaner look
            style={{
                borderRadius: 15,
                marginBottom: 20,
                alignSelf: 'center',
            }}
            chartConfig={{
                backgroundColor: '#E64A19', // Deep Coral Background
                backgroundGradientFrom: '#FF7043', // Sunset Orange
                backgroundGradientTo: '#E64A19', // Deep Coral
                
                // 🟢 Proper Bar Color Fix
                fillShadowGradient: '#FFC107', // Golden Yellow bars
                fillShadowGradientOpacity: 1, // Ensure bars are fully colored
                
                // 🔹 Fix for missing `color()` function
                color: (opacity = 1) => `rgba(245, 245, 220, ${opacity})`, // Soft Beige for grid/labels
                
                labelColor: (opacity = 1) => `rgba(245, 245, 220, ${opacity})`, // Soft Beige Labels
                propsForVerticalLabels: {
                    fontSize: 22, // Bigger emoji size
                },
                barPercentage: 0.6, // Controls bar width
                decimalPlaces: 0, // No decimals for count
            }}
            verticalLabelRotation={0} // Keep emojis horizontal
        />
    );
}
