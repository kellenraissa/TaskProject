import React, {Component} from 'react'
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'

export default class TaskList extends Component {
  render() {
    return (
      <View  style={styles.container }>
        <ImageBackground  source={require('@/assets/images/today.jpg')} style={styles.background }>

        </ImageBackground>
        <View style={styles.taskList }>

          <Text>tASKlist</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  background: {
    flex: 3,
    height: '100%',
    width: '100%'
  },
  taskList: {
    flex: 7
  }
})