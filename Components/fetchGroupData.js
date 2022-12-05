
import Styles from "./Styles";
import { StyleSheet, Text, View } from "react-native";
export let groupList = [];
export var data;
export default async function fetchGroupData() {

    const groups = await fetch(
      "https://groupie-backend.herokuapp.com/getAllGroups"
    );
    groups.json().then((data) => {
        let newest = data.data.length;
        //console.log(newest);
        
      for(let i = 0; i< newest; i++)
      {
        //console.log(data.data[i]);
        groupList.unshift(data.data[i]);
       // console.log(groupList[0].groupName);
      }
      //console.log(groupList);
      return groupList;
        
    });
     
  }