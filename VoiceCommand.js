// VoiceCommand.js

import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import Voice from 'react-native-voice';
import { generateText } from './OpenAI';

const VoiceCommand = () => {
  const [result, setResult] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onStartButtonPress = () => {
    Voice.start('en-US');
  };

  const onStopButtonPress = () => {
    Voice.stop();
  };

  const onSpeechResults = (e) => {
    // We're just using the first result here, a full implementation could include all results
    setResult(e.value[0]);
    generateResponse(e.value[0]);
  };

  const generateResponse = async (input) => {
    const response = await generateText(input);
    console.log(response);
    // You should handle the response from OpenAI here. This could involve setting the state and displaying it in your UI.
  };

  return (
    <Button
      title="Press and Hold to Speak"
      onPressIn={onStartButtonPress}
      onPressOut={onStopButtonPress}
    />
  );
};

export default VoiceCommand;
