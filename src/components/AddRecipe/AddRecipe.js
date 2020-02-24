import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import PickImage from '../../components/PickImage/PickImage';

class AddRecipe extends Component {
    
    state = {
        name: {
          value: '',
        },
        preparationTime: {
            value: '',
          },
        serves: {
          value: '',
        },
        complexity: {
            value: '',
        },
        image: {
          value: null,
        },
        isLoading: false,
        authorizationToken: ''
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({authorizationToken: this.props.navigation.state['params']['authorizationToken']});
    }

    updateInputState = (key, value) => {
        this.setState({          
          [key]: {
          value: value,
        }});
    };

    imagePickedHandler = image => {
        this.setState({          
            image: {
            value: image,
        }});
    };

    recipeAddedHandler = () => {
        console.log("recipeAddedHandler+++++++++++++++");
        const recipeData = {
            name: this.state.name.value,
            preparationTime: this.state.preparationTime.value,
            serves: +this.state.serves.value,
            complexity: this.state.complexity.value,
        }
        fetch('http://35.160.197.175:3006/api/v1/recipe/add',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.state.authorizationToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData)
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                console.log('Error');
            }
        }).then((responseJSON) => {
            this.props.navigation.pop();
            // this.uploadImage(responseJSON.id);
        });
    };

    uploadImage = (recipeId) => {
        const photo = {
            uri: this.state.image.value,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        let formData = new FormData();
        formData.append('photo', photo);
        formData.append('recipeId',recipeId)

        fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.state.authorizationToken}`,
                'Content-Type': 'application/json',
            },
            body: formData
        }).then((responseJson) => {
            Alert.alert('Success','Recipe Added!',[
                {
                    text: 'Okay',
                    style: 'cancel',
                    onPress: () => {
                        this.props.navigation.pop()
                    }
                }
            ])
          }).catch((error) => {
            this.setState({isLoading:false})
            Alert.alert('Fail','Failed to Add Recipe!')
          });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeViewConatiner}>
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.mainContainer}>
                        <View style={styles.container}>
                            <MainText>
                                <HeadingText>Add a New Recipe!</HeadingText>
                            </MainText>
                            <PickImage
                                onImagePicked={this.imagePickedHandler}
                            />
                            <View>
                                <DefaultInput
                                placeholder="Recipe Name"
                                placeholderTextColor="#3feaea"
                                style={styles.input}
                                value={this.state.name.value}
                                onChangeText={val => this.updateInputState('name', val)}
                                />
                            </View>
                            <View>
                                <DefaultInput
                                placeholder="Preparation Time"
                                placeholderTextColor="#3feaea"
                                style={styles.input}
                                value={this.state.preparationTime.value}
                                onChangeText={val => this.updateInputState('preparationTime', val)}
                                />
                            </View>
                            <View>
                                <DefaultInput
                                placeholder="Serves"
                                placeholderTextColor="#3feaea"
                                style={styles.input}
                                value={this.state.serves.value}
                                onChangeText={val => this.updateInputState('serves', val)}
                                />
                            </View>
                            <View>
                                <DefaultInput
                                placeholder="Complexity"
                                placeholderTextColor="#3feaea"
                                style={styles.input}
                                value={this.state.complexity.value}
                                onChangeText={val => this.updateInputState('complexity', val)}
                                />
                            </View>
                            <View style={styles.button}>
                                <ButtonWithBackground
                                    color="#521751"
                                    onPress={this.recipeAddedHandler}
                                    disabled={
                                        this.state.name.value === '' ||
                                        this.state.preparationTime.value === '' ||
                                        this.state.serves.value === ''||
                                        this.state.complexity.value === ''
                                    }
                                >Add the Recipe! </ButtonWithBackground>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: '#521751',
    },
    container: {
      flex: 1,
      alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#521751',
    },
    safeViewConatiner: {
        flex: 1,
        backgroundColor: '#521751',
    },
    input: {
        width: Dimensions.get('window').width - 100,
        lineHeight: 25,
        textAlignVertical: "center",
        fontSize: 18,
        color: '#fa923f',
    },
    button: {
        paddingTop: 20,
    }
  });

export default AddRecipe;