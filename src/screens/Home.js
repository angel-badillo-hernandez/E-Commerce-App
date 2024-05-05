import React from 'react';
import { View, Linking, Image } from 'react-native'; // Import Image
import { Layout, Button, Text, Section, SectionContent, useTheme } from 'react-native-rapi-ui';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
        }}
      >
        {/* Add Image component here to display the GIF */}
        <Image
          source={{ uri: 'https://thehonoredone.live:8085/static/store.gif' }}
          style={{ width: 350, height: 300, marginBottom: 30 }} // Adjust size as needed
          resizeMode="contain"
        />
        <Section>
          <SectionContent>
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
    </Layout>
  );
}