import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  //Platform,
} from 'react-native';
import MoodBarChart from './MoodBarChart';
import DatePickerField from './DatePickerField';
const moodImages = {
  'Very Sad': require('./assets/very_sad.png'),
  'Sad': require('./assets/sad.png'),
  'Neutral': require('./assets/neutral.png'),
  'Happy': require('./assets/happy.png'),
  'Very Happy': require('./assets/very_happy.png'),
  'Angry': require('./assets/angry.png'),
  'Excited': require('./assets/excited.png'),
};

// (Optionally) import chart or calendar libraries here
// import { SomeChart } from 'some-chart-library';
// import { Calendar } from 'react-native-calendars'; // example

export default function App() {
  // State to manage:
  const [date, setDate] = useState(new Date())
    ; const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  // Past entries (example):
  const [entries, setEntries] = useState([
  ]);

  // Mood arrays
  const firstRowMoods = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
  const secondRowMoods = ['Angry', 'Excited'];

  const handleSave = () => {
    const currentDate = date.toISOString().split('T')[0];
    const newEntry = { date: currentDate, mood: selectedMood, note };

    // Check if there's already an entry
    const existingEntryIndex = entries.findIndex((entry) => entry.date === currentDate);

    if (existingEntryIndex !== -1) {
      // Replace the old entry with new data
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = newEntry;
      setEntries(updatedEntries);

      alert(`You Replaced ${currentDate}'s Mood.`);
    } else {
      // Otherwise add a new entry
      setEntries([...entries, newEntry]);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Mood Tracker</Text>

        {/* --- BAR CHART AREA --- */}
        <View style={styles.chartContainer}>
          {/* Remove this placeholder: */}
          {/* <Text style={styles.chartPlaceholder}>[ Bar Chart of Moods ]</Text> */}

          {/* Add your MoodBarChart component, passing in `entries` */}
          <MoodBarChart entries={entries} />


        </View>
        {/* --- DATE PICKER (New) --- */}
        <View style={styles.dateContainer}>
          {/* Our new component to pick dates */}
          <DatePickerField date={date} onChangeDate={setDate} />
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
              <Image
                source={moodImages[mood]}
                style={styles.moodIcon}
              />
              {/* Optionally, you could still show text below the icon */}
              {/* <Text>{mood}</Text> */}
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
              <Image
                source={moodImages[mood]}
                style={styles.moodIcon}
              />
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
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  

  moodIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain', // or 'cover', etc.
  },

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
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',  // or 'center', or 'space-around'
    alignItems: 'center',
    marginBottom: 10,
  },
  moodItem: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    margin: 5,            // little margin around each item
    justifyContent: 'center',
    alignItems: 'center',
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
