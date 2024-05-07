import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Layout, useTheme } from 'react-native-rapi-ui';

export default function Chat({ navigation }) {
  const { isDarkmode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        text: inputText,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      // Here, you would also send the message to your backend or service
    }
  };

  return (
    <Layout>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={isDarkmode ? darkStyles.messageContainer : styles.messageContainer}>
            <Text style={isDarkmode ? darkStyles.senderText : styles.senderText}>
              {item.sender === 'user' ? 'me' : item.sender}
            </Text>
            <Text style={isDarkmode ? darkStyles.messageText : styles.messageText}>
              {item.text}
            </Text>
            <Text></Text>
            <Text style={isDarkmode ? darkStyles.timeText : styles.timeText}>{`${new Date(
              item.timestamp
            ).toLocaleString()}`}</Text>
          </View>
        )}
        style={{ flex: 1, backgroundColor: isDarkmode ? '#000000' : '#ffffff' }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={isDarkmode ? '#ffffff' : '#000000'}
          style={isDarkmode ? darkStyles.input : styles.input}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={isDarkmode ? darkStyles.sendButton : styles.sendButton}
        >
          <Text style={isDarkmode ? darkStyles.sendButtonText : styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#007bff', // Example color
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center', // Centers the text vertically
    alignItems: 'center', // Centers the text horizontally
  },
  sendButtonText: {
    color: '#ffffff', // Example text color
    fontSize: 16, // Example font size
  },
  messageText: {
    color: '#000000',
  },
  senderText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  timeText: {
    color: '#000000',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

const darkStyles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    backgroundColor: '#333', // Dark background for message container
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#333', // Dark background for input
    color: '#ffffff', // Dark mode text color
  },
  sendButton: {
    backgroundColor: '#007bff', // Adjust if needed for dark mode
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#ffffff', // Adjust if needed for dark mode
    fontSize: 16,
  },
  messageText: {
    color: '#ffffff',
  },
  senderText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  timeText: {
    color: '#ffffff',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
