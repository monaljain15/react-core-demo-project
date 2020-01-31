import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  Dimensions,
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../../assets/img55.jpg';
import PostList from '../PostList/PostList';
import Loading from '../../components/UI/Loading/Loading';

export default class Login extends Component {
  state = {
      email: {
        value: '',
      },
      password: {
        value: '',
      },
      authorization: '',
      isLogin: false,
      isLoading: false,
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
    this.setState({isLoading: true});
    const authData = {
      email: this.state.email.value,
      password: this.state.password.value,
    };

    fetch('http://35.160.197.175:3006/api/v1/user/login',
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
        this.setState({isLoading: false});
        this.setState({
          authorization: responseJSON.token,
          isLogin: true,
        });
        Alert.alert(
          'Login',
          'Login Successful',
          [
            {text: 'OK',
            onPress: () => {
              this.setState({
                isLogin: true,
              });
            }},
          ],
          {cancelable: false},
      );
    }).catch((err) => {
      this.setState({isLoading: false});
    });
  };

  render() {
    let content = (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container} behavior="padding">
            <MainText>
                <HeadingText>Mini Berries</HeadingText>
            </MainText>
            <MainText>
                <HeadingText style={styles.subHeading}>Lets indulge into Dessert Delicacies</HeadingText>
            </MainText>
            <Loading isLoading={this.state.isLoading} />
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-Mail Address"
                placeholderTextColor="#3feaea" 
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
                    placeholderTextColor="#3feaea"
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

    if (this.state.isLogin) {
      content = <PostList authorization={this.state.authorization} />;
    }

    return (
      <View>
        {content}
      </View>
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
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: Dimensions.get('window').width - 100,
    paddingTop: 20,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 2,
    backgroundColor: 'transparent',
    borderBottomColor: '#fa923f',
    color: '#3feaea',
    fontSize: 16,
    fontWeight: 'bold'
  },
  subHeading: {
    fontSize: 18,
    color: '#3feaea',
  }
});
