import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import { login, register } from '../../api/AwesomeStoreServices';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function tryRegister() {
    setLoading(true);

    // Show alert if any fields are empty
    if (!firstName) {
      alert('Please enter your first name.');
      setLoading(false);
      return;
    }
    if (!lastName) {
      alert('Please enter your last name.');
      setLoading(false);
      return;
    }
    if (!username) {
      alert('Please enter your username.');
      setLoading(false);
      return;
    }
    if (!email) {
      alert('Please enter your email address.');
      setLoading(false);
      return;
    }
    if (!password) {
      alert('Please enter your password.');
      setLoading(false);
      return;
    }
    // Try to register
    await register(firstName, lastName, username, email, password)
      .then((response) => {
        // If registration is not successful, show alert
        if (!response.success) {
          throw Error(`Registration failed. ${response.detail}.`);
        }
        // If successful, go to Search screen?
        else {
          navigation.navigate('Search');
        }
        setLoading(false);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        setLoading(false);
        alert(errorMessage);
      });
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isDarkmode ? '#17171E' : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require('../../../assets/register.png')}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: 'center',
                padding: 30,
              }}
            >
              Register
            </Text>
            <Text>First Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your first name"
              value={firstName}
              autoCapitalize="words"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(text) => setFirstName(text)}
            />
            <Text style={{ marginTop: 15 }}>Last Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your last name"
              value={lastName}
              autoCapitalize="words"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(text) => setLastName(text)}
            />
            <Text style={{ marginTop: 15 }}>Username</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your last name"
              value={username}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(text) => setUsername(text)}
            />
            <Text style={{ marginTop: 15 }}>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your email address"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              text={loading ? 'Loading' : 'Create an account'}
              onPress={() => {
                tryRegister();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                justifyContent: 'center',
              }}
            >
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme('light') : setTheme('dark');
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? '☀️ light theme' : '🌑 dark theme'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
