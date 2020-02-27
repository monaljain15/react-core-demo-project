import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

import * as Permission from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import profileImage from '../../../assets/camera.jpg';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfilePic } from "./../../store/actions/index";

class Setting extends Component {

    state = {
        pickedImage: profileImage,
    };

    constructor(props) {
        super(props);
        this.setState({pickedImage: this.props.pickedImage === '' ? profileImage : this.props.pickedImage});
        Permission.askAsync(Permission.CAMERA);
        Permission.askAsync(Permission.CAMERA_ROLL);
    }

    imageOptions = () => {
        Alert.alert(
          "Pick Image",
          "",
          [
            {
              text: 'Camera',
              onPress: () => {this.pickImageHandler("camera")}
            },
            {
              text: 'Gallery',
              onPress: () => {this.pickImageHandler("gallery")}
            },
          ],
          {cancelable: false},
        );
    };

    pickImageHandler = (type) => {
        if (type === "camera") {
          ImagePicker.launchCameraAsync().then((res) => {
            this.setState({
              pickedImage: {
                uri: res.uri,
              },
            });
            this.props.getProfilePic(this.state.pickedImage);
          })
        } else {
          ImagePicker.launchImageLibraryAsync().then((res) => {
            this.setState({
              pickedImage: {
                uri: res.uri,
              },
            });
            this.props.getProfilePic(this.state.pickedImage);
          });
        }
    };

    setLocation = () => {
      this.props.navigation.push('Location');
    }
    
    feedsList = () => {
      this.props.navigation.push('Feeds');
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.picContainer}>
                    <View style={styles.placeHolder}>
                        <TouchableOpacity onPress={this.imageOptions}>
                            <Image source={this.state.pickedImage} style={styles.previewImage} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                  <Text style={styles.profileText}>{this.props.user.firstName} {this.props.user.lastName}</Text>
                  <Text style={styles.profileText}>{this.props.user.email}</Text>
                </View>
                <View style={styles.settingConatiner}>
                  <TouchableOpacity onPress={this.setLocation}>
                    <View style={styles.settingSubContainer}>
                      <Text style={styles.settingMenu}>Location</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.feedsList}>
                    <View style={styles.settingSubContainer}>
                      <Text style={styles.settingMenu}>Feeds</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#fbb346',
    },
    picContainer: {
        flex: 0.5,
        width: '100%',
        alignItems: 'center',
    },
    placeHolder: {
        borderRadius: 400,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 300,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 400,
    },
    profileContainer: {
      flex: 0.1,
      alignContent: 'center',
    },
    profileText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: '#521751',
      paddingBottom: 5,
    },
    settingConatiner: {
      flex: 0.4,
      paddingTop: 20,
    },
    settingSubContainer: {
      backgroundColor: "#521751",
      marginBottom: 10,
      width: Dimensions.get('window').width - 10,
      // height: "30%",
    },
    settingMenu: {
      color: "#3feaea",
      fontWeight: "bold",
      fontSize: 20,
      lineHeight: 50,
      paddingLeft: 10
    }
});

const mapStateToProps = (state) => {
  return { 
    pickedImage: state.auth.pickedImage,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProfilePic
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);