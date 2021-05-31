import React from "react";
import {View, StyleSheet, Text, Button, FlatList} from "react-native";
import { DATA } from "../data";
import { Post } from "../components/Post";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { HeaderButtons, Item} from "react-navigation-header-buttons";


export const MainScreen = ({ navigation }) => {
    const openPostHandler = post => {
        console.log(post)
        navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked} )
    }
    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DATA}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/> }
            />
        </View>
    )
}

MainScreen.navigationOptions = {
    headerTitle: 'Мой блог',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
        <Item title='Take Photo'
              iconName='ios-camera'
              onPress={() => console.log('Press photo')}/>
        </HeaderButtons>
        ),
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
        <Item title='Menu'
              iconName='ios-menu'
              onPress={() => console.log('Press menu')}/>
        </HeaderButtons>
        ),
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
})