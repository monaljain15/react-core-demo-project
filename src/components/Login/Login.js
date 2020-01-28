import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../../assets/img55.jpg';

export default class Login extends Component {
  state = {
      email: {
        value: '',
      },
      password: {
        value: '',
      },
  };

  constructor(props) {
    super(props);
  }

  updateInputState = (key, value) => {
    this.setState({          
      [key]: {
      value: value,
    }});
  };

  authHandler = () => {
    const authData = {
      email: this.state.email.value,
      password: this.state.password.value,
    };

    fetch('http://192.168.1.91:3000/api/v1/user/sign-in',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData),
    }).then((response) => {
        if (response.status == 200) {
            return response.json()
        } else {
            
        }
    }).then((responseJSON) => {
        console.log(responseJSON);
        Alert.alert('Login Successful');
    })
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container} behavior="padding">
            <MainText>
                <HeadingText>Mini Berries</HeadingText>
            </MainText>
            <MainText>
                <HeadingText style={styles.subHeading}>Lets indulge into Dessert Delicacies</HeadingText>
            </MainText>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-Mail Address"
                style={styles.input}
                value={this.state.email.value}
                onChangeText={val => this.updateInputState('email', val)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View>
                <View>
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={this.state.password.value}
                    onChangeText={val => this.updateInputState('password', val)}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
            <ButtonWithBackground
                color="#521751"
                onPress={this.authHandler}
                disabled={
                this.state.email.value === '' ||
                this.state.password.value === ''
            }>
                Submit
            </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    flex: 1,
  },
  inputContainer: {
    width: '80%',
    paddingTop: 20,
  },
  input: {
    borderColor: '#bbb',
    backgroundColor: '#eee',
  },
  subHeading: {
    fontSize: 18,
    color: '#3feaea',
  }
});
