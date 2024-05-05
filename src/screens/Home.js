import React from 'react';
import { View, Linking, Image } from 'react-native'; // Import Image
import { Title } from 'react-native-paper';
import { Layout, Button, Section, SectionContent, useTheme } from 'react-native-rapi-ui';
import { Text, StyleSheet, ImageBackground } from 'react-native';
import { Spacer } from '@react-native-material/core';

const FancyTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>

      <ImageBackground source={require('../../assets/store.gif')} style={styles.backgroundImage}>
        <View
          style={styles.overlay}
        >
          <Section>
            <SectionContent>
              <FancyTitle title="Awesome Store" />
              <Button
                style={{ marginTop: 10 }}
                text="Search"
                status="info"
                onPress={() => {
                  navigation.navigate('Search');
                }}
              />
              <Button
                text={isDarkmode ? 'Light Mode' : 'Dark Mode'}
                status={isDarkmode ? 'success' : 'warning'}
                onPress={() => {
                  if (isDarkmode) {
                    setTheme('light');
                  } else {
                    setTheme('dark');
                  }
                }}
                style={{
                  marginTop: 10,
                }}
              />
            </SectionContent>
          </Section>
        </View>
      </ImageBackground>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff', // You can change the background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    fontSize: 30,
    color: '#fff', // You can change the text color
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    // You can add more styles such as shadow, gradient, etc. to make it fancier
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // optional overlay to make text more readable
    justifyContent: 'center',
    alignItems: 'center',
  }
});