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
} from 'react-native';
import MoodBarChart from './MoodBarChart';
import DatePickerField from './DatePickerField';
import LastWeekMoods from './LastWeekMoods'; // ✅ Import the new component
const moodImages = {
  'Very Sad': require('./assets/very_sad.png'),
  'Sad': require('./assets/sad.png'),
  'Neutral': require('./assets/neutral.png'),
  'Happy': require('./assets/happy.png'),
  'Very Happy': require('./assets/very_happy.png'),
  'Angry': require('./assets/angry.png'),
  'Excited': require('./assets/excited.png'),
};
const date = [1]; //temp fix
// Define Mood Arrays
const firstRowMoods = ['Sad', 'Neutral', 'Happy', 'Very Sad', 'Very Happy'];
const secondRowMoods = ['Angry', 'Excited'];

export default function App() {
  // State to manage:
  const [date, setDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSave = () => {
    const currentDate = date.toLocaleDateString('en-CA'); // ✅ Always uses local time
const newEntry = { date: currentDate, mood: selectedMood, note };

    // Check if there's already an entry
    const existingEntryIndex = entries.findIndex((entry) => entry.date === currentDate);

    if (existingEntryIndex !== -1) {
        // Replace the old entry with new data
        const updatedEntries = [...entries];
        updatedEntries[existingEntryIndex] = newEntry;
        setEntries(updatedEntries);
    } else {
        // Otherwise add a new entry
        setEntries([...entries, newEntry]);
    }
};


  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>My Mood Tracker</Text>

        {/* --- BAR CHART --- */}
        <View style={styles.chartContainer}>
          <MoodBarChart entries={entries} />
        </View>

        {/* --- DATE PICKER --- */}
        <View style={styles.dateContainer}>
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
                style={selectedMood === mood ? styles.moodIconSelected : styles.moodIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* --- MOOD ROW 2 --- */}
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
                style={selectedMood === mood ? styles.moodIconSelected : styles.moodIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* --- NOTE INPUT --- */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Write Here:</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="How are you feeling?"
            placeholderTextColor="#212121"
          />
        </View>

        {/* --- SAVE BUTTON --- */}
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Log Your Mood!</Text>
          </TouchableOpacity>
        </View>



        {/* Last Week Moods Component */}
        <LastWeekMoods entries={entries} />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
    backgroundColor: '#FFAB91', // Soft Peach
  },
  header: {
    padding: 20,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#212121', // Dark Charcoal
  },
  chartContainer: {
    padding: 10,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  moodItem: {
    backgroundColor: '#E64A19', // Deep Coral
    borderRadius: 15,
    padding: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  moodIconSelected: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  selectedMoodItem: {
    backgroundColor: '#9C27B0', // Warm Lavender
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F5F5DC', // Soft Beige
    borderRadius: 10,
    padding: 10,
  },
  noteLabel: {
    fontSize: 16,
    color: '#212121', // Dark Charcoal
    marginRight: 10,
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  saveButton: {
    backgroundColor: '#FF7043', // Sunset Orange
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#F5F5DC', // Soft Beige
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#212121',
  },
  historyContainer: {
    marginTop: 10,
    height: 150,
  },
  entryItem: {
    backgroundColor: '#FFC107', // Golden Yellow
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  historyText: {
    color: '#212121',
    fontSize: 16,
  },
});

