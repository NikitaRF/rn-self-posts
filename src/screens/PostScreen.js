import React, {useEffect} from "react";
import { View, StyleSheet, Text, Image, Button, ScrollView, Alert } from "react-native";
import { DATA } from "../data";
import { THEME } from '../theme'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";

export const PostScreen = ({navigation}) => {
    const postId = navigation.getParam('postId')
    const post = DATA.find( p => p.id === postId)

    // useEffect(() => {
    //     navigation.setParams({ booked: post.booked })
    // }, [])

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
                    text: "Удалить", style:'destructive', onPress: () => console.log("OK Pressed")
                }
            ],
            {cancelable: false}
        );

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
    const iconName = booked ? 'ios-star' : 'ios-star-outline'

    return {
        headerTitle: 'Пост ' + new Date(postDate).toLocaleDateString(),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
                <Item title='Booked'
                      iconName={iconName}
                      onPress={() => console.log('Booked add')}/>
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