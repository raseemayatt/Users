import React, { useContext, useEffect, useState } from "react";
import { View, Button, StyleSheet, ScrollView ,TextInput, Image} from "react-native";

import { COLLECTIONS } from "./constants";
import { FirestoreContext } from "./FirestoreContext";
import ListItem from "./ListItem";
import  Header  from "./Header";
import Search from "../assets/searchuser.png"

function List() {
  const dbh = useContext(FirestoreContext);

  const [users, setUsers] = useState([]);
  const [value, setValueonChangeText]= useState("");
  const [titleText, setTitle]= useState("Users");


  useEffect(() => {
    if(dbh) {
      dbh.collection(COLLECTIONS.users).get()
        .then((querySnapshot) => {
          const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
          setUsers(users);
        })
    }
  }, [dbh]);

  const getUsers = () => {
    setTitle("Users");
    dbh.collection(COLLECTIONS.users).get()
      .then((querySnapshot) => {
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(users);
      })
  }

  const onChangeText= (value)=>{
    
    setValueonChangeText(value)
        
          if(value.length<1)
            getUsers();
         else
         {
          const filteredData=users.filter(i=>i.name.toUpperCase().includes(value.toUpperCase()));
          setUsers(filteredData)
         }
  }

  const getFavorites = () => {
    setTitle("Favourite Users");
    dbh.collection(COLLECTIONS.users).where("liked", "==", true).get()
      .then((querySnapshot) => {
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(users);
      })
  }

  const getBookmarkedUsers = () => {
    setTitle("Bookmarked Users");
    dbh.collection(COLLECTIONS.users).where("bookmarked", "==", true).get()
      .then((querySnapshot) => {
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(users);
      })
  }

  const handleFavorite = (selectedUser) => {
    setUsers(prevUsers => prevUsers.map((userInstance) => {
      // If user id same as selected user id
      if (userInstance.id === selectedUser.id) {

        // update database
        const selectedUser = dbh.collection(COLLECTIONS.users).doc(userInstance.id);
        selectedUser.update({
          liked: !userInstance.liked,
        });

        // update local instance
        return {
          ...userInstance,
          liked: !userInstance.liked,
        }
      }
      return userInstance;
    }));
  }

  const handleBookmark = (selectedUser) =>{
      setUsers(prevUsers => prevUsers.map((userInstance)=>{

         // If user id same as selected user id
      if (userInstance.id === selectedUser.id) {

        // update database
        const selectedUser = dbh.collection(COLLECTIONS.users).doc(userInstance.id);
        selectedUser.update({
          bookmarked: !userInstance.bookmarked,
        });

        // update local instance
        return {
          ...userInstance,
          bookmarked: !userInstance.bookmarked,
        }
      }
      return userInstance;
    }));
      

  }

  return (
    <View style={styles.container}>
      <Header title={titleText}/>
     <View  style={{ height: 50, borderColor: 'gray', borderWidth: 1 ,paddingLeft:15, flexDirection: 'row'}}> 
     <Image source={Search} style={{ height: 20, width: 20, alignSelf: "center"}}/>
      <TextInput
     style={{ marginLeft:10}}
      onChangeText={text => onChangeText(text)}
      placeholder="Search User"
      value={value}
      />
      </View>
        <ScrollView>
      {users.map((user) => (
        <ListItem
          user={user}
          key={user.id}
          handleFavorite={handleFavorite} 
          handleBookmark={handleBookmark} 
        />
      ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
      <Button title="Users" onPress={getUsers} />
      <Button title="Favorite Users" onPress={getFavorites} />
      <Button title="Bookmarked Users" onPress={getBookmarkedUsers} />
      </View>
    </View>
  );
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
   
  },
  buttonContainer: {
    flexDirection: 'row',
  justifyContent: 'space-between'
   
  },
});