import React, {useEffect,useState,useRef} from "react";
import {View,Text, FlatList,StyleSheet, Button, TouchableOpacity, ScrollView} from 'react-native';
import axios from "axios";



const App = ()=>{
  const [data , setData] = useState<any>([])
  const [currentData , setCurrentData] = useState();
  let page = useRef<number>(1)

  const getData= async()=>{
    try{
      const request = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page.current}`);
      setData((pre)=>{
        return [...pre, request.data.hits];
      });
    } catch(err){
      console.log(err)
    }
    
  };
 

  useEffect(()=>{
    getData();
    setInterval(()=>{
      page.current = page.current + 1;
      getData();
    },10000)
  },[])

 const newsList = ({item})=>{
  return(
    <View>
      <FlatList
      onEndReached={()=>{}}
      data={item}
      renderItem={currentList}
      
      />
    </View>
  );
 };

 const currentList = ({item}) =>{
  return(
    <TouchableOpacity onPress={()=> setCurrentData(item)} style={styles.container}>
      <Text style={styles.title}>Title: {item.title}</Text>
      <Text>Author: {item.author}</Text>
      <Text>URL: {item.url}</Text>
      <Text>Created at: {item.created_at}</Text>
    </TouchableOpacity>
  );
 };

 return currentData === undefined ? (
  <View>
    <FlatList data = {data} renderItem = {newsList}/>
    <View>
      <Text>{page.current}</Text>
    </View>
  </View>
 )
 :
 (
  <ScrollView>

    <Text>{JSON.stringify(currentData)}</Text>
    <View style= {styles.button}>
    <Button 
    title='close' 
    
    onPress={({})=>setCurrentData(undefined)} />

    </View>
    
    
  </ScrollView>
 )

 }

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    paddingHorizontal:16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 30,
    flexWrap: 'wrap',
  },
  title:{
    fontWeight:'bold',
   
  },
  button:{
    alignItems: 'center',
    marginTop: 15,
  }
})
 

export default App;