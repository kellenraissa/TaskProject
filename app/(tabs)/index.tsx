import React, {Component} from 'react'
import { View, Text, FlatList, ImageBackground, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../../components/commonStyles'

import Task from '../../components/Task'

export default class TaskList extends Component {

  state = {
    tasks: [{
      id: Math.random(),
      desc: 'Comprar Livro de React Native',
      estimatedAt: new Date(),
      doneAt: new Date()
    },
    {
      id: Math.random(),
      desc: 'Ler Livro de React Native',
      estimatedAt: new Date(),
      doneAt: null
    },
  ]
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return (
      <View  style={styles.container }>
        <ImageBackground  source={require('@/assets/images/today.jpg')} style={styles.background }>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>  
            <Text style={styles.subtitle}>{today}</Text>  
          </View>  
        </ImageBackground>
        <View style={styles.taskList }>
          <FlatList data={this.state.tasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => <Task {...item}/>}/>
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
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20

  }
})