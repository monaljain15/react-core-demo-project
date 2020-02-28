import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView
} from 'react-native';

import { connect } from "react-redux";

import ListItem from '../ListItem/ListItem';
import Loading from '../../components/UI/Loading/Loading';

class PostList extends Component {

    state = {
        postsLoaded: false,
        postsData: [],
        isRefreshing: false,
        isLoading: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPosts(this.props.authorizationToken);
        // this.getPosts(this.props.navigation.state['params']['authorization']);
    }

    getPosts = (authorizationToken) => {
        this.setState({isLoading: true});

        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
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
                postsData: responseJSON,
                postsLoaded: true,
                isRefreshing: false,
                isLoading: false,
            });
        })
    };

    postSelected = (post) => {
        this.props.navigation.push('Detail',{recipeId: post.recipeId});
    }

    newRecipe = () => {
        this.props.navigation.push('Add');
    }

    deleteRecipe = (recipeId) => {
        this.setState({isLoading: true});
        fetch('http://35.160.197.175:3006/api/v1/recipe/rm-from-cooking-list',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.props.authorizationToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({recipeId: recipeId})
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
            }
        }).then((responseJSON) => {
            this.setState({isLoading: false});
            Alert.alert(
                'Delete',
                `${responseJSON.msg}!`,
                [
                  {text: 'OK',
                  onPress: () => {
                    this.getPosts(this.props.authorizationToken);
                  }},
                ],
                {cancelable: false},
            );
        })
    }

    render() {
        let content = <Loading isLoading={this.state.isLoading} />;

        if (this.state.postsLoaded) {
            content = (
                <SafeAreaView>
                    <FlatList
                        refreshControl={
                            <RefreshControl 
                            refreshing={this.state.isRefreshing} 
                            onRefresh={() => {
                                this.setState({ isRefreshing: true })
                                this.getPosts(this.props.authorizationToken)}}></RefreshControl>
                        }
                        refreshing={this.state.isRefreshing}
                        data={this.state.postsData}
                        renderItem={info => (
                            <View>
                                <ListItem
                                postName={info.item.name}
                                postPreparationTime={info.item.preparationTime}
                                postServes={info.item.serves}
                                postImage={info.item.photo}
                                onItemPressed={() => this.postSelected(info.item)}
                                />
                                <Loading isLoading={this.state.isLoading} />
                                <TouchableOpacity style={styles.deleteButton} onPress={() => this.deleteRecipe(info.item.recipeId)}>
                                    <Image style={styles.deleteIcon} source={require('../../../assets/delete-icon.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        )}
                        // keyExtractor={(info) => info.recipeId.toString()}
                    />
                    <TouchableOpacity style={styles.fabButton} onPress={this.newRecipe}>
                        <Image style={styles.addIcon} source={require('../../../assets/add-icon.png')}></Image>
                    </TouchableOpacity>
                </SafeAreaView>
            );
        }

        return(
            <View style={styles.container}>
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
      backgroundColor: '#fbb346',
    },
    fabButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        height:70,
        backgroundColor:'#fff',
        borderRadius:100,
    },
    addIcon: {
        height: 40,
        width: 40,
    },
    deleteButton: {
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 40,                                                    
        right: 10,
        height:30,
    },
    deleteIcon: {
        height: 27,
        width: 27,
        tintColor: "#fff",
    }
  });

const mapStateToProps = (state) => {
    return { authorizationToken: state.auth.authorizationToken }
}

export default connect(mapStateToProps)(PostList);