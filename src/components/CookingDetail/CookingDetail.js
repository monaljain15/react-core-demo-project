import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import backgroundImage from '../../../assets/img59.jpeg';
import Loading from '../../components/UI/Loading/Loading';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

import { connect } from "react-redux";


class CookingDetail extends Component {

    state = {
        recipeDetail: {},
        recipeLoaded: false,
    };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getRecipeDetail(this.props.navigation.state['params']['recipeId'], this.props.authorizationToken);
  }

  getRecipeDetail = (recipeId, authorizationToken) => {

    fetch(`http://35.160.197.175:3006/api/v1/recipe/${recipeId}/details`,
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authorizationToken}`,
        },
    }).then((response) => {
        if (response.status == 200) {
            return response.json()
        } else {
            
        }
    }).then((responseJSON) => {
        this.setState({
            recipeDetail: responseJSON,
            recipeLoaded: true,
        });
    })
  };

  onClose = () => {
    this.props.navigation.pop();
  };

  render() {
    let content = <Loading isLoading={this.state.recipeLoaded} />;
    let ingredientView = <View></View>;
    let instructionView = <View></View>;

    if (this.state.recipeLoaded) {
        if (this.state.recipeDetail.ingredients.length > 0) {
          let ingredientsArray = this.state.recipeDetail.ingredients;
            ingredientView = (
              <View>
                <Text style={styles.recipeInfo}>
                  Ingredients: {ingredientsArray.map(item =>
                (
                  <Text style={styles.recipeMsg}><Text style={styles.seperator}>*</Text> { item.ingredient } </Text>
                )
                )}
                </Text>
              </View>
            );
        }
    }

    if (this.state.recipeLoaded) {
      if (this.state.recipeDetail.instructions.length > 0) {
        let instructionsArray = this.state.recipeDetail.instructions;
          instructionView = (
            <View>
              <Text style={styles.recipeInfo}>
                Instructions: {instructionsArray.map(item =>
              (
                <Text style={styles.recipeMsg}>{ item.instruction }.</Text>
              )
              )}
              </Text>
            </View>
          );
      }
  }

    if (this.state.recipeLoaded) {
        content = (
            <SafeAreaView>
                <View style={styles.mainContainer}>
                    <View
                    style={styles.container}>
                        <View style={styles.recipeDetailContainer}>
                            <View style={styles.subContainer}>
                                <Image
                                    source={this.state.recipeDetail.photo ? {uri: this.state.recipeDetail.photo} : backgroundImage}
                                    style={styles.recipeImage}
                                />
                            </View>
                        </View>
                        <View style={styles.subNameContainer}>
                            <View>
                                <Text style={styles.recipeName}>
                                    {this.state.recipeDetail.name}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View>
                                <Text style={styles.recipeInfo}>        
                                    Complexity: <Text style={styles.recipeMsg}>{this.state.recipeDetail.complexity}</Text>
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.recipeInfo}>        
                                    Preparation Time: <Text style={styles.recipeMsg}>{this.state.recipeDetail.preparationTime}</Text>
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.recipeInfo}>        
                                    Serves: <Text style={styles.recipeMsg}>{this.state.recipeDetail.serves}</Text>
                                </Text>
                            </View>
                            {ingredientView}
                            {instructionView}
                        </View>
                        <View style={styles.buttonContainer}>
                            <ButtonWithBackground
                                color="#521751"
                                onPress={this.onClose}
                            >
                                Close
                            </ButtonWithBackground>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return(
        <View style={styles.detailContainer}>
            {content}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    height: "100%",
    width: "100%",
    backgroundColor: '#fa923f',
  },
  container: {
    margin: 22,
    flex: 1,
  },
  subContainer: {
    flex: 2,
  },
  recipeDetailContainer: {
    flex: 0.4
  },
  subNameContainer: {
    flex: 0.1
  },
  infoContainer: {
    flex: 0.4,
    paddingTop: 10,
  },
  buttonContainer: {
    flex: 0.1,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  recipeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    margin: 12,
    color: '#521751',
    // fontSize: 38,
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',
  },
  recipeInfo: {
    fontWeight: 'bold',
    fontSize: 18,
    // margin: 12,
    color: '#521751',
  },
  recipeMsg: {
    fontWeight: 'bold',
    fontSize: 18,
    // margin: 12,
    color: '#3feaea',
  },
  seperator: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  }
});

const mapStateToProps = (state) => {
  return { authorizationToken: state.auth.authorizationToken }
}

export default connect(mapStateToProps)(CookingDetail);
