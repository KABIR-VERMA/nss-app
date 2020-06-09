import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextComponent, Button } from 'react-native';
import PROJECTCATEGORIES from '../../data/dummy-data';
import { log } from 'react-native-reanimated';
import ProjectCategoryGridTile from '../../components/ProjectGridTile';
// import CategoryGridTile from "../../components/ProjectGridTile";


const CategoryScreen = props => {

  console.log(typeof (PROJECTCATEGORIES));
  // ----------category is list of categories--------------

  console.log('we r here 2');
  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item.id}
        data={PROJECTCATEGORIES}
        renderItem={itemData => {
          return (
            <ProjectCategoryGridTile
              title={itemData.item.title}
              color='#ffcc99'
              onSelect={() => {
                props.navigation.navigate('Project', { screen: 'ProjectList', });
              }}

            />
            // <View style={styles.screen}><Text>{itemData.item.title}</Text></View>
          );
        }}
        numColumns={2} />
      <Button
        title="BAck to home screen"
        onPress={() => {
          props.navigation.navigate('Home');
        }}
        titleStyle={{
          color: "#F57C00"
        }}
        type="clear"
      />
    </SafeAreaView>



  );



}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CategoryScreen;