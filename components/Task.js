import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import commonStyles from "./commonStyles";
import { FontAwesome } from '@expo/vector-icons';
import moment from "moment";
import 'moment/locale/pt-br';

export default props => {

    const doneOrNotStyle = props.doneAt !== null ? 
    { textDecorationLine: 'line-through'} : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
            onPress={() => props.toggleTask(props.id)}
            >
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formatedDate}</Text>
            </View>
        </View>
    )
}

function getCheckView(doneAt) {
    if(doneAt !== null) {
    return (
        <View style={styles.done}>
            <FontAwesome name="check" size={20} color='#FFF' />
        </View>
    )
} else {
    <View style={styles.pending}></View>
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        justifyContent: 'center',
        alignItems: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12

    }
})