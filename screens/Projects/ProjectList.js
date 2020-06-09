import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { PROJECTLIST } from "../../data/dummy-data";
// import ProjectCategoryGridTile from '../../components/ProjectGridTile';
import { SafeAreaView } from 'react-navigation';





const ProjectListScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    console.log('project lis');
    // console.log(PROJECTLIST);



    const selectedProjects = PROJECTLIST.filter(
        pro => pro.categoryId === catId
    );
    

    const renderItem =(itemdata)=>{
        console.log('here we og again:',itemdata.item);
    }


    return (
        <SafeAreaView>
       <Text>projectdetail</Text>
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

export default ProjectListScreen;