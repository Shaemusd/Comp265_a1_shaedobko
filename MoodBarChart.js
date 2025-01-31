import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

// Define the moods that you want in the chart (in a fixed order)
const MOODS = ['Angry', 'Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy', 'Excited',''];

// A helper to count how many times each mood appears in the entries.
const getMoodCounts = (entries) => {
    // Create a count object initialized to 0 for each mood (HI PEOPLE)
    const counts = {
        'Very Sad': 0,
        'Sad': 0,
        'Neutral': 0,
        'Happy': 0,
        'Very Happy': 0,
        'Angry': 0,
        'Excited': 0,
        '': 0,
    };
    entries.forEach((entry) => {
        if (counts.hasOwnProperty(entry.mood)) {
            counts[entry.mood] += 1; 
        }
    });
    return counts;
};

export default function MoodBarChart({ entries }) {
    // Compute how many times each mood was selected
    const moodCounts = getMoodCounts(entries);

    // We'll map MOODS to their counts to produce data for the chart
    const dataValues = MOODS.map((mood) => moodCounts[mood]);

    // The chart expects data in this shape:
    const chartData = {
        labels: MOODS,
        datasets: [
            {
                data: dataValues,
            },
        ],
    };

    // Get the screen width to size the chart
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.chartContainer}>
            <BarChart
            style={{ marginRight: 16 }}
                data={chartData}
                width={screenWidth}
                height={250}
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,

                    // X-axis label styling
                    propsForVerticalLabels: {
                        fontSize: 12,
                        fill: 'blue', // or '#333'
                        fontWeight: '600',
                    },
                    // Y-axis label styling
                    propsForHorizontalLabels: {
                        fontSize: 12,
                        fill: 'red',
                        fontWeight: '600',
                    },
                }}
                fromZero
                showBarTops
                verticalLabelRotation={-45}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    chartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
});
