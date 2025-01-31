import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

// We'll map textual mood strings to the same index as these emojis
// Order: sad, neutral, happy, very sad, very happy, angry, excited
const MOOD_EMOJIS = ['😢', '😐', '😊', '😭', '🤩', '😡', '🤪'];

// We'll also define the textual mood strings in the same order
const MOOD_ORDER = ['Sad', 'Neutral', 'Happy', 'Very Sad', 'Very Happy', 'Angry', 'Excited'];

export default function MoodBarChart({ entries }) {
    // 1) Count each mood in entries
    // First, create a count object by mood string
    const counts = {
        'Sad': 0,
        'Neutral': 0,
        'Happy': 0,
        'Very Sad': 0,
        'Very Happy': 0,
        'Angry': 0,
        'Excited': 0
    };

    // Go through each entry, increment the correct mood count
    entries.forEach((entry) => {
        if (counts.hasOwnProperty(entry.mood)) {
            counts[entry.mood] += 1;
        }
    });

    // 2) Build an array of counts in the same order as MOOD_ORDER
    // E.g., [countOf(Sad), countOf(Neutral), countOf(Happy), ...]
    const dataValues = MOOD_ORDER.map(mood => counts[mood]);

    // 3) Now create chartData with the emoji labels and the numeric data
    const chartData = {
        labels: MOOD_EMOJIS,        // The emojis we want under each bar
        datasets: [
            {
                data: dataValues,       // The counts array
            },
        ],
    };

    // 4) Render the bar chart
    const screenWidth = Dimensions.get('window').width;

    return (
        <BarChart
            data={chartData}
            width={screenWidth * 0.9}
            height={220}
            fromZero
            style={{ marginRight: 20 }} 
            showBarTops
            chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // bars color
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // label color
                propsForVerticalLabels: {
                    fontSize: 20, // if you want bigger emoji
                },

            }}
            verticalLabelRotation={0} // 0, 30, or 45, etc.
        />
    );
}
