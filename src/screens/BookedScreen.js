import React from "react";
import {useSelector} from "react-redux";
import {View, StyleSheet, Text, Button, FlatList} from "react-native";
import { Post } from "../components/Post";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { HeaderButtons, Item} from "react-navigation-header-buttons";
import {THEME} from "../theme";


export const BookedScreen = ({ navigation }) => {
    const openPostHandler = post => {
        console.log(post)
        navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked} )
    }

    const bookedPosts = useSelector(state => state.post.bookedPosts)

    if (bookedPosts.length === 0){
        return (
            <View style={styles.noItemWrapper}>
                <Text style={styles.noItemText}>Пока нет ни одного поста</Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={bookedPosts}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/> }
            />
        </View>
    )
}

BookedScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Избранное',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
            <Item title='Menu'
                  iconName='ios-menu'
                  onPress={() => navigation.toggleDrawer()}/>
        </HeaderButtons>
    ),
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    noItemWrapper: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noItemText: {
        fontFamily: 'open-regular',
        textAlign: 'center',
        color: THEME.MAIN_COLOR,
        fontSize: 18
    },
})