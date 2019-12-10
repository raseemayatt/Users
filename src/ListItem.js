import React from "react";
import { Text, View, Button ,Image, StyleSheet, TouchableOpacity} from "react-native";
import LikeIcon from "../assets/like.png";
import UnLikeIcon from "../assets/heart.png";
import Bookmark from "../assets/bookmarked.png";
import UnMarkIcon from "../assets/bookmark.png";


function ListItem({ user, handleFavorite ,handleBookmark}) {
  return (
    <View >
     <View style={styles.containerList}>
      <View style={styles.profileContainer}>
      <Image source={{uri:user.image}} style={styles.imageProfile}/>
      <View style={styles.profileList}>
      <Text style={{fontSize: 20}}>{user.name}</Text>
      <Text>Software Developer</Text>
      </View>
      </View>
      <View style={styles.imageContainer}>
      <TouchableOpacity onPress={()=>handleBookmark(user)}>
      <Image source={user.bookmarked ? Bookmark :UnMarkIcon} style={styles.imageLike}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>handleFavorite(user)}>
      <Image source={user.liked ? LikeIcon :UnLikeIcon} style={styles.imageLike}/>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  imageLike: {
    width: 30,
    height: 30,
    marginLeft: 10,
   
  },
  imageProfile: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
   
  },
  imageContainer: {
 
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileList: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10
  },
  containerList : {
    margin: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginBottom:10,
    padding:5
  }
});