import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AsyncStorage, TextInput } from 'react-native';

export default function App() {

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const [username, setUsername] = useState("");

  function saveUsernameToStore(value) {
    storeData('@username', value);
  }

  function getUsernameFromStore() {
    getData('@username').then((value) => {
      setUsername(value);
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={
          { height: 40,
            width: 250,
            borderColor: 'gray',
            borderWidth: 1 }
        }
        onChangeText={text => setUsername(text)}
        value={username} />
      <Button
        onPress={() =>
          saveUsernameToStore(username)
        }
        title="Save"
      />
      <Button
        onPress={() =>
          setUsername(getUsernameFromStore())
        }
        title="Load"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
