import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { search_items, get_categories } from '../api/AwesomeStoreServices.js';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    get_categories().then(setCategories);
  }, []);

  // I'm not sure if this is the correct way to use the search_items function
  // always returns blank screen when I try to search lul
  useEffect(() => {
    if (searchQuery !== '') {
      search_items({ name: searchQuery, category: selectedCategory })
        .then(setSearchResults)
        .catch(console.error); // not working i hate this
    }
  }, [searchQuery, selectedCategory]);

// should the categories be the actual categories or the tags you made?
// was also having trouble using the get_categories in your services file
  function get_categories() {
    return Promise.resolve([
      { id: 1, name: 'Test' },
      { id: 2, name: 'TEst' },
      { id: 3, name: 'FoRTnit3' },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon.Button
          name="bars"
          onPress={() => setModalVisible(true)}
          backgroundColor="#00000000"
          color="#000"
        />
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => {
                  setSelectedCategory(category.id);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { flexDirection: 'row', alignItems: 'center' },
  searchbar: { flex: 2 },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
