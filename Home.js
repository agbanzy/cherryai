// Home.js

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Voice from 'react-native-voice';
import axios from 'axios';

export default function Home() {
  const [transcription, setTranscription] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const message = e.value[0]; // We only take the first transcription
    setTranscription(message);
    sendToAI(message);
  };

  const sendToAI = async (message) => {
    try {
      const res = await axios.post('http://your-server-url/api/chat', { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  const startListening = async () => {
    setTranscription('');
    setResponse('');
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Start listening" onPress={startListening} />
      <Text style={styles.transcription}>Transcription: {transcription}</Text>
      <Text style={styles.response}>AI Response: {response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  transcription: {
    marginTop: 20,
    fontSize: 18,
  },
  response: {
    marginTop: 20,
    fontSize: 18,
  },
});
