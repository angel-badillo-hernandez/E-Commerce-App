import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-rapi-ui';
import search_items from '../api/AwesomeStoreServices.js';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { isDarkmode } = useTheme();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    const results = await search_items({ name: query });
    setSearchResults(results);
    // Add search logic here
  };

  const handleItemClick = (item) => {
    // Add item click logic here
    console.log(`Clicked on ${item}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkmode ? 'black' : 'white' }]}>
        <View style={[styles.searchBar, { borderColor: isDarkmode ? 'white' : 'gray' }]}>
          <Icon
            name="search"
            size={20}
            color={isDarkmode ? 'white' : 'gray'}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={handleSearch}
            value={searchQuery}
            blurOnSubmit
            placeholderTextColor={isDarkmode ? 'white' : 'gray'}
          />
        </View>
        <ScrollView horizontal style={[styles.scrollList, { height: 0 }]}>
          {/* Replace this with your list items */}
          <TouchableOpacity onPress={() => handleItemClick('Item 1')}>
            <View style={styles.listItem}>
              <Text style={{ color: isDarkmode ? 'white' : 'black' }}>Item 1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleItemClick('Item 2')}>
            <View style={styles.listItem}>
              <Text style={{ color: isDarkmode ? 'white' : 'black' }}>Item 2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleItemClick('Item 3')}>
            <View style={styles.listItem}>
              <Text style={{ color: isDarkmode ? 'white' : 'black' }}>Item 3</Text>
            </View>
          </TouchableOpacity>
          {/* Add the rest of your screen components here */}
        </ScrollView>
        <View style={styles.separator} />
        <ScrollView style={styles.resultsList}>
          {searchResults.map((result, index) => (
            <TouchableOpacity key={index} onPress={() => handleItemClick(result)}>
              <View style={styles.listItem}>
                <Text style={{ color: isDarkmode ? 'white' : 'black' }}>{result}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1.5,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  scrollList: {
    paddingLeft: 10,
  },
  touchableItem: {
    alignItems: 'center',
  },
  listItem: {
    marginRight: 10,
    padding: 4,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 10,
    marginTop: 10,
  },
  resultsList: {
    marginTop: 10,
  },
});
