import React from "react";

import {View,Text, StyleSheet} from "react-native"

function Header ({title}){
    

    return(
        <View style={styles.header}>
            <Text style={{color: '#fff', fontSize: 20, marginLeft: 10}}>{title}</Text>
            </View>
    )

}

export default Header;

const styles = StyleSheet.create({
    header: {
      padding: 8,
      backgroundColor: '#135',
      marginTop: 25,
      color: '#fff',
      fontSize: 20
     
    },
});