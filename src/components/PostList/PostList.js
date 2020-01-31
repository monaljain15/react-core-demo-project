import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
  SafeAreaView
} from 'react-native';

import ListItem from '../ListItem/ListItem';
import Loading from '../../components/UI/Loading/Loading';

export default class PostList extends Component {

    state = {
        postsLoaded: false,
        postsData: [],
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {

        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.props.authorization}`,
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
            });
        })
    };

    postSelected = (post) => {
        Alert.alert(
            post.name,
            `Recipe preparation complexity: ${post.complexity}`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    render() {
        let content = <Loading isLoading={this.state.postsLoaded} />;

        if (this.state.postsLoaded) {
            content = (
                <SafeAreaView>
                    <FlatList
                        refreshControl={
                            <RefreshControl></RefreshControl>
                        }
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
  });