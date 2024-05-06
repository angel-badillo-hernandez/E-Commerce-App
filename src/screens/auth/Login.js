import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image } from 'react-native';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import {login} from '../../api/AwesomeStoreServices'
import { useIsFocused } from '@react-navigation/native';

export default function ({ navigation }) {
  const isFocused = useIsFocused();
  const { isDarkmode, setTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setUsername('');
      setPassword('');
    }
  }, [isFocused]);

  async function tryLogin() {
    setLoading(true);
    await login(username, password).then((response)=>{
      // If login is not successful, show alert
      if (!response.success)
      {
        throw Error(`Login failed. ${response.detail}.`)
      }
      // If successful, go to Search screen? no lol go home bruh
      else{
        navigation.navigate('MainTabs')
      }
      setLoading(false);
    }).catch(function (
      error
    ) {
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
              source={require('../../../assets/login.png')}
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
              style={{
                alignSelf: 'center',
                padding: 30,
              }}
              size="h3"
            >
              Login
            </Text>
            <Text>Username</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your username"
              value={username}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(text) => setUsername(text)}
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
              text={loading ? 'Loading' : 'Continue'}
              onPress={() => {
                tryLogin();
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
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'center',
              }}
            >
              
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
