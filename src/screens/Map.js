import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Button, Layout, Text, useTheme } from 'react-native-rapi-ui';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location'
import { AppBar, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { UserData, UserLocation, User, get_all_user_data } from '../api/AwesomeStoreServices'

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const [myLocation, setMyLocation] = useState(null);
  const [otherUserMarkers, setOtherUsersMarkers] = useState([]);
  const [modalIsVisible, setModalVisible] = useState(false);

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Please grant the application GPS location permission.');
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    setMyLocation(location);
  };

  const getOtherUsersMarkers = () => {
    get_all_user_data().then((user_data) => {
      let markers = userDataToMarkers(user_data);
      setOtherUsersMarkers(markers);
    }).catch((reason) => { alert(reason); })
  }


  const userDataToMarkers = (users_data) => {
    let temp = users_data;
    let markers = users_data.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          title={`${item.first_name} ${item.last_name}`}
          description={`Last seen at ${new Date(item.timestamp).toLocaleString()}`}
          onPress={(event) => {
            alert("Fortnite");
          }}
        />
      );
    });

    return markers;
  }

  useEffect(() => {
    getLocationPermission();
    getOtherUsersMarkers();
  }, []);





  return (
    <Layout>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={isDarkmode ? mapDarkStyle : markLightStyle}
          zoomControlEnabled={true}
          scrollEnabled={true}
          showsMyLocationButton={true}
          showsUserLocation={true}
          showsScale={true}
          initialRegion={{
            latitude: 39.8282,
            longitude: -98.5795,
            latitudeDelta: 20,
            longitudeDelta: 20,
          }}>
          {otherUserMarkers}
        </MapView>
        <AppBar variant='bottom' color='white' leading={props => (
          <IconButton icon={props => <Icon name="refresh" {...props} />} {...props} onPress={getOtherUsersMarkers} />
        )} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapDarkStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];

const markLightStyle = [];