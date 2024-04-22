import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { ActivityIndicator, Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { search_items, get_categories } from '../api/AwesomeStoreServices.js';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = async (category) => {
    const items = await search_items({ category });
    setSearchResults(items);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>${item.price}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: item.img_url }} />
    </Card>
  );

  useEffect(() => {
    get_categories().then(setCategories);
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      setIsLoading(true);
      search_items({ name: searchQuery, category: selectedCategory })
        .then(setSearchResults)
        .catch(console.error);
      setIsLoading(false);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory]);

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
          onChangeText={(query) => {
            setSearchQuery(query);
            if (query === '') {
              setSearchResults([]);
            }
          }}
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
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {categories.map((category, index) => (
                <TouchableOpacity key={index} onPress={() => handleCategoryClick(category)}>
                  <Text style={styles.modalText}>{category}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>x</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
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
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 11,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'black',
  },
});
