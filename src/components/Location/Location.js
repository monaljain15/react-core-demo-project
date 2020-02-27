import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class Location extends Component {

  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      focusedLocation: {
        latitude: 23.025836,
        longitude: 72.503349,
        latitudeDelta: 0.012,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.012, 
      },
      locationChosen: false,
    });
  };

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        locationChosen: true,
      };
    });
  };

  onClose = () => {
    this.props.navigation.pop();
  };


  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} title='Solution Analysts' identifier='1' />;
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <MapView
                initialRegion={this.state.focusedLocation}
                region={
                    !this.state.locationChosen ? this.state.focusedLocation : null
                }
                style={styles.map}
                onPress={this.pickLocationHandler}
                ref={ref => (this.map = ref)}>
                <Polyline
                    strokeWidth={3}
                    strokeColor='blue'
                    coordinates={
                        [
                            {
                                latitude: 23.025734,
                                longitude: 72.503349
                            },
                            {
                                latitude: this.state.focusedLocation.latitude,
                                longitude: this.state.focusedLocation.longitude,
                            }
                        ]
                    }
                >

                </Polyline>
                {marker}
                </MapView>
                <View style={styles.buttonContainer}>
                    <ButtonWithBackground
                        color="#521751"
                        onPress={this.onClose}
                    >
                        Close
                    </ButtonWithBackground>
                </View>
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  map: {
    width: '98%',
    height: '94%',
  },
  buttonContainer: {
    // flex: 0.1,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Location;
