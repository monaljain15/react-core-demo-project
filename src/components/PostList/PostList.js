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

import ListItem from '../ListItem/ListItem';
import Loading from '../../components/UI/Loading/Loading';

export default class PostList extends Component {

    state = {
        postsLoaded: false,
        postsData: [],
        isRefreshing: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPosts(this.props.navigation.state['params']['authorization']);
    }

    getPosts = (authorizationToken) => {

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
            });
        })
    };

    postSelected = (post) => {
        this.props.navigation.push('Detail',{recipeId: post.recipeId, authorizationToken: this.props.navigation.state['params']['authorization']});
    }

    newRecipe = () => {
        this.props.navigation.push('Add',{authorizationToken: this.props.navigation.state['params']['authorization']});
    }

    render() {
        let content = <Loading isLoading={this.state.postsLoaded} />;

        if (this.state.postsLoaded) {
            content = (
                <SafeAreaView>
                    <FlatList
                        refreshControl={
                            <RefreshControl 
                            refreshing={this.state.isRefreshing} 
                            onRefresh={() => {
                                this.setState({ isRefreshing: true })
                                this.getPosts()}}></RefreshControl>
                        }
                        refreshing={this.state.isRefreshing}
                        data={this.state.postsData}
                        renderItem={info => (
                            <ListItem
                            postName={info.item.name}
                            postPreparationTime={info.item.preparationTime}
                            postServes={info.item.serves}
                            postImage={info.item.photo}
                            onItemPressed={() => this.postSelected(info.item)}
                            />
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
  });