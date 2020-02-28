import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const loading = props => {

    if (props.isLoading) {
        return <View style={{ position: 'absolute', width: '100%', height: '110%', zIndex: 1}}>
            <ActivityIndicator size='large' color='#3feaea' style={{ flex: 1 }}></ActivityIndicator>
        </View>
    } else {
        return <View></View>
    }
}

export default loading;