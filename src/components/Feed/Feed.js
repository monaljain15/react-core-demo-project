import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

import { connect } from "react-redux";

import ListItem from '../ListItem/ListItem';
import Loading from '../../components/UI/Loading/Loading';

class Feed extends Component {

    state = {
        feedsLoaded: false,
        feedsData: [],
        finalFeeds: [],
        isRefreshing: false,
        isLoading: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getFeeds(this.props.authorizationToken);
        // this.getPosts(this.props.navigation.state['params']['authorization']);
    }

    getFeeds = (authorizationToken) => {
        this.setState({isLoading: true});

        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
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
                feedsData: responseJSON,
                feedsLoaded: true,
                isRefreshing: false,
            });
            const finalFeeds = this.state.feedsData.filter(obj => obj.inCookingList === 0);
            this.setState({finalFeeds: finalFeeds, isLoading: false});
        })
    };

    feedSelected = (feed) => {
        this.props.navigation.push('Detail',{recipeId: feed.recipeId});
    }

    addFeed = (recipeId) => {
        this.setState({isLoading: true});
        fetch('http://35.160.197.175:3006/api/v1/recipe/add-to-cooking-list',
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
                'Success',
                `${responseJSON.msg}`,
                [
                  {text: 'OK',
                  onPress: () => {
                    this.getFeeds(this.props.authorizationToken);
                  }},
                ],
                {cancelable: false},
            );
        })

    }

    deleteFeed = (recipeId) => {
        this.setState({isLoading: true});
        fetch(`http://35.160.197.175:3006/api/v1/recipe/${recipeId}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.props.authorizationToken}`,
                'Content-Type': 'application/json',
            },
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
                    this.getFeeds(this.props.authorizationToken);
                  }},
                ],
                {cancelable: false},
            );
        })
    }

    onClose = () => {
        this.props.navigation.pop();
    };

    render() {
        let content = <Loading isLoading={this.state.isLoading} />;

        if (this.state.feedsLoaded) {
            content = (
                <SafeAreaView>
                    <FlatList
                        refreshControl={
                            <RefreshControl 
                            refreshing={this.state.isRefreshing} 
                            onRefresh={() => {
                                this.setState({ isRefreshing: true })
                                this.getFeeds(this.props.authorizationToken)}}></RefreshControl>
                        }
                        refreshing={this.state.isRefreshing}
                        data={this.state.finalFeeds}
                        renderItem={info => (
                            <View>
                                <ListItem
                                postName={info.item.name}
                                postPreparationTime={info.item.preparationTime}
                                postServes={info.item.serves}
                                postImage={info.item.photo}
                                onItemPressed={() => this.feedSelected(info.item)}
                                />
                                <Loading isLoading={this.state.isLoading} />
                                <TouchableOpacity style={styles.addButton} onPress={() => this.addFeed(info.item.recipeId)}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity style={styles.deleteButton} onPress={() => this.deleteFeed(info.item.recipeId)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        // keyExtractor={(info) => info.recipeId.toString()}
                    />
                    <TouchableOpacity style={styles.fabButton} onPress={this.onClose}>
                        <Image style={styles.closeIcon} source={require('../../../assets/close.png')}></Image>
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
    closeIcon: {
        height: 40,
        width: 40,
    },
    addButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 60,                                                    
        right: 10,
        height:30,
        backgroundColor:'#fff',
        borderRadius: 20,
    },
    deleteButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 20,                                                    
        right: 10,
        height:30,
        backgroundColor:'#fff',
        borderRadius: 20,
    },
    buttonText: {
        color: "#521751",
        fontWeight: "bold",
    },
  });

const mapStateToProps = (state) => {
    return { authorizationToken: state.auth.authorizationToken }
}

export default connect(mapStateToProps)(Feed);