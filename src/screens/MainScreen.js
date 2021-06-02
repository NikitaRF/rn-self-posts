import React, {useEffect} from "react";
import {View, StyleSheet, Text, Button, FlatList, ActivityIndicator} from "react-native";
import { Post } from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { HeaderButtons, Item} from "react-navigation-header-buttons";
import {loadPosts} from "../store/actions/post";
import {THEME} from "../theme";



export const MainScreen = ({ navigation }) => {
    const openPostHandler = post => {
        console.log(post)
        navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked} )
    }

    // useDispatch - функция, позволяющая нам в функциональном компоненте вызывать actions изменяющие стейт
    const dispatch = useDispatch()

    // функция useEffect с переданным в нее вторым парметром, которым является
    // пустой массив, сработает тогда, когда уже весь шаблон будет готов к работе,
    // и только 1 раз если массив пустой (или можно добавить dispatch в список зависимостей, так как он не будет изменяться
    // и useEffect все ровно будет вызван только 1 раз
    useEffect( () => {
        dispatch(loadPosts())
    }, [dispatch])

    // с помощью useSelector мы получаем состояние
    const allPosts = useSelector(state => state.post.allPosts)
    const loading = useSelector( state => state.post.loading)

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR}/>
            </View>
        )
    }

    if (allPosts.length === 0){
        return (
            <View style={styles.noItemWrapper}>
                 <Text style={styles.noItemText}>Пока нет ни одного поста</Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={allPosts}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/> }
            />
        </View>
    )
}

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Мой блог',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
        <Item title='Take Photo'
              iconName='ios-camera'
              onPress={() => navigation.push('Create')}/>
        </HeaderButtons>
        ),
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
    center: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})