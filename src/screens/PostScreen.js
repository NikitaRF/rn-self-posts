import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, Image, Button, ScrollView, Alert } from "react-native";
import { THEME } from '../theme'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {toggleBooked, removePost} from "../store/actions/post";

export const PostScreen = ({navigation}) => {
    const dispatch = useDispatch()


    const postId = navigation.getParam('postId')
    const post = useSelector(state =>
        state.post.allPosts.find(post => post.id === postId))

    const booked = useSelector(state =>
        state.post.bookedPosts.some(post => post.id === postId))

    useEffect(() => {
        navigation.setParams({ booked: booked })
    }, [booked])



    const toggleHandler = useCallback(() => {
        console.log(postId)
        dispatch(toggleBooked(post))
    }, [dispatch, post])

    useEffect(() => {
        navigation.setParams({ toggleHandler: toggleHandler })
    }, [toggleHandler])

    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы уверены что хотите удалить этот пост?",
            [
                {
                    text: "Отменить",
                    style: "cancel"
                },
                {
                    text: "Удалить", style:'destructive', onPress: () => {
                        navigation.navigate('Main')
                        dispatch(removePost(postId))
                    }
                }
            ],
            {cancelable: false}
        );
    }

    if (!post){
        return null
    }

    return (
        <ScrollView >
            <Image source={{uri: post.img}} style={styles.image}/>
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
                <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler}/>
            </View>
        </ScrollView>
    )
}

PostScreen.navigationOptions = ({navigation}) => {
    const postDate = navigation.getParam('date')

    const booked = navigation.getParam('booked')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = booked ? 'ios-star' : 'ios-star-outline'

    return {
        headerTitle: 'Пост ' + new Date(postDate).toLocaleDateString(),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
                <Item title='Booked'
                      iconName={iconName}
                      onPress={toggleHandler}/>
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    textWrap: {
        padding: 10,
    },
    title: {
        fontFamily: 'open-regular'
    },
})