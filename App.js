import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import MoodBarChart from './MoodBarChart';
// (Optionally) import chart or calendar libraries here
// import { SomeChart } from 'some-chart-library';
// import { Calendar } from 'react-native-calendars'; // example

export default function App() {
  // State to manage:
  const [date, setDate] = useState('2025-02-01'); // Example daate string
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  // Past entries (example):
  const [entries, setEntries] = useState([
    { date: '2025-01-30', mood: 'Happy', note: "I'm good" },
    { date: '2025-01-29', mood: 'Sad', note: 'Bad day' },
  ]);

  // Mood arrays
  const firstRowMoods = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
  const secondRowMoods = ['Angry', 'Excited'];

  const handleSave = () => {
    // On save, add an entry
    const newEntry = {
      date,
      mood: selectedMood,
      note,
    };
    setEntries([...entries, newEntry]);

    // Clear out the fields if you want
    // setSelectedMood(null);
    // setNote('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Tracker</Text>

  {/* --- BAR CHART AREA --- */}
<View style={styles.chartContainer}>
  {/* Remove this placeholder: */}
  {/* <Text style={styles.chartPlaceholder}>[ Bar Chart of Moods ]</Text> */}

  {/* Add your MoodBarChart component, passing in `entries` */}
  <MoodBarChart entries={entries} />
</View>
      {/* --- DATE PICKER --- */}
      {/* You might swap this for a real date picker or a small calendar component */}
      <View style={styles.dateContainer}>
        <Text>Date:</Text>
        <TextInput
          style={styles.dateInput}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* --- MOOD ROW 1 --- */}
      <View style={styles.moodRow}>
        {firstRowMoods.map((mood) => (
          <TouchableOpacity
            key={mood}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.moodItem,
              selectedMood === mood && styles.selectedMoodItem,
            ]}
          >
            <Text>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- MOOD ROW 2 (Angry/Excited) --- */}
      <View style={styles.moodRow}>
        {secondRowMoods.map((mood) => (
          <TouchableOpacity
            key={mood}
            onPress={() => setSelectedMood(mood)}
            style={[
              styles.moodItem,
              selectedMood === mood && styles.selectedMoodItem,
            ]}
          >
            <Text>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- NOTE INPUT --- */}
      <View style={styles.noteContainer}>
        <Text>Note:</Text>
        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={setNote}
          placeholder="How are you feeling?"
        />
      </View>

      {/* --- SAVE BUTTON --- */}
      <View style={{ marginVertical: 10 }}>
        <Button title="Save / Log Mood" onPress={handleSave} />
      </View>

      {/* --- LAST WEEK OF MOODS --- */}
      <Text style={styles.historyTitle}>LAST WEEK OF MOODS</Text>

      {/* We use ScrollView to show entries, so it can scroll if many items */}
      <ScrollView style={styles.historyContainer}>
        {entries.map((entry, index) => (
          <View key={index} style={styles.entryItem}>
            <Text>
              {index + 1}) {entry.date} - {entry.mood},{' '}
              {entry.note ? `"${entry.note}"` : ''}
            </Text>
          </View>
        ))}
        {/* You could have a button or text link to "View entire month" */}
        <Text style={{ marginTop: 10 }}>View Past Month (Calendar?)</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  // p: {
  //   fontSize: 20,
  // },
  header: {
    padding: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    padding: 10,
    
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateInput: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 120,
  },
  moodRow: {
    flexDirection: 'row',
    marginBottom: 5,
    flexWrap: 'wrap', // if you need wrapping
  },
  moodItem: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedMoodItem: {
    backgroundColor: '#cde',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  noteInput: {
    marginLeft: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  historyContainer: {
    marginTop: 10,
    height: 150, // example fixed height so it can scroll
  },
  entryItem: {
    marginBottom: 5,
  },
});
