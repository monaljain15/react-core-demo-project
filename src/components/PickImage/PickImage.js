import React, {Component} from 'react';
import {View, Image, Button, StyleSheet, Alert} from 'react-native';
import * as Permission from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

class PickImage extends Component {

  constructor() {
    super();
    Permission.askAsync(Permission.CAMERA);
    Permission.askAsync(Permission.CAMERA_ROLL);
  } 
  state = {
    pickedImage: null,
  };

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
  }

  pickImageHandler = (type) => {
    if (type === "camera") {
      ImagePicker.launchCameraAsync().then((res) => {
        this.setState({
          pickedImage: {
            uri: res.uri,
          },
        });
        this.props.onImagePicked({uri: res.uri});
      })
    } else {
      ImagePicker.launchImageLibraryAsync().then((res) => {
        this.setState({
          pickedImage: {
            uri: res.uri,
          },
        });
        this.props.onImagePicked({uri: res.uri});
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeHolder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button
            title="Pick Image"
            color="#3feaea"
            onPress={this.imageOptions}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  placeHolder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 250,
  },
  button: {
    margin: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

export default PickImage;
