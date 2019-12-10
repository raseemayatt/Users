import React from 'react';
import { StyleSheet, View } from 'react-native';

import List from './src/List';
import FirestoreContextProvider from './src/FirestoreContext';

export default function App() {
  return (
    <FirestoreContextProvider>
      <View style={styles.container}>
        <List />
      </View>
    </FirestoreContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
