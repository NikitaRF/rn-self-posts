import React, {useState} from "react";
import {View, StyleSheet, Text, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {AboutScreen} from "./AboutScreen";
import {THEME} from "../theme";

export const CreateScreen = ({}) => {
    const [text, setText] = useState('')

    const saveHandler = () => {
        return 1
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Создай новый пост</Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder='Введите тест поста' value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <Image style={{width: '100%', height: 200, marginBottom: 20,}}
                           source={{uri: 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg'}}/>
                    <Button title='Создать пост' color={THEME.MAIN_COLOR} onPress={saveHandler}/>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}


CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Создать пост',
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
    title: {
        fontSize: 20,
        fontFamily: 'open-regular',
        textAlign: 'center',
        marginVertical: 10,
    },
    textarea: {
        padding: 10,
        marginBottom: 10,
    }
})