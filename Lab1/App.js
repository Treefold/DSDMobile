import { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TextInput, Button, TouchableOpacity, Switch, FlatList} from 'react-native';

const FlatListItem = ({value}) => {
  return (
    <View style={{backgroundColor: "blue", padding: 5, margin: 10}}>
      <Text style={{color: 'white'}}>Numarul este: {value}</Text>
    </View>
  )
}

export default function App() {

  const [isSwitched, setIsSwitched] = useState(false);

  const flatListData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  const changeSwitchValue = (value) => {
    console.log("Switch value is now: ", value);
    setIsSwitched(value);
  }
  
  const onPress = () => {
    alert('You pressed me!');
  }

  const renderItem = (flatListItem) => {
    return (
      <FlatListItem value={flatListItem.item} />
    )
  }

  return (
    <ScrollView onScroll={() => {
      console.log("scroll");
    }} contentContainerStyle={styles.container}>
      <Text>
        Bine ati venit la primul
        <Text style={{color: 'red'}}> laborator!</Text>
      </Text>

      <Image style={{borderRadius: 100}} source={{
        uri: 'https://www.appstud.com/wp-content/uploads/2018/03/React-Native-Titre.png',
        height: 200,
        width: 350,
      }} />

      <TextInput keyboardType='numeric' style={styles.textInput} />

      <Button title='Press me!' onPress={onPress}/>

      <TouchableOpacity style={styles.realButton} onPress={onPress} > 
        <Text>
          Press ME!
        </Text>
      </TouchableOpacity>

      <Switch value={isSwitched} onValueChange={changeSwitchValue} />

      <FlatList data={flatListData} renderItem={renderItem} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#A0A0A0',
    padding: 5,
    marginTop: 15,
    width: 300,
  },
  realButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 150,
    height: 50,
    padding:10,
    borderRadius: 15,
  },

});
