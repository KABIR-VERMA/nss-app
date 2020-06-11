import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Item } from 'react-native';
import firebase from "firebase";
import { withFirebaseHOC } from "../../config/Firebase";
import { render } from 'react-dom';
// import { render } from 'react-dom';

// import { PROJECTLIST } from "../../data/dummy-data";
// import ProjectCategoryGridTile from '../../components/ProjectGridTile';
// import { SafeAreaView } from 'react-navigation';




class ProjectListScreen extends Component {
    //    constructor(props){
    //     let categoryTitle = props.navigation.getParam('title');
    //    }
    // const [projectList,setList]=useState([])


    // categoryTitle = props.navigation.getParam('title');

    //  firebase.firestore().collection('Projects').where('category','==',categoryTitle).get().then((e)=>{
    //     let items=[]

    //     e.forEach((doc)=>{
    //         // console.log(typeof(doc.data()));
    //         let ele={};
    //         ele=doc.data()
    //         items.push(ele);

    //         // projectList.push(ele);
    //     })
    //     setList(items);
    //     setList([...projectList,setList]);
    // });
    // console.log(projectList);
    constructor(props) {
        super();
        this.categoryTitle=props.navigation.getParam('title');
        this.state = {
            projectList: [],
        };
    }
    componentDidMount() {
        let items = [];
        firebase.firestore().collection('Projects').where('category','==',this.categoryTitle)
            .get().then((e) => {

                // console.log(typeOf(items));
                e.forEach(doc => {

                   
                    // console.log(doc.data());
                    items.push(doc.data());
                    //  console.log('-----------',items);

                });

            }).catch(error => {
                console.log(error);

            })
        this.setState({
            projectList: items,
        })




        // let result = await new Promise((resolve, reject) => {
        //     // console.log(db);
        //     var items = [];
        //     firebase.firestore().collection('Projects')
        //         .get().then((e) => {

        //             // console.log(typeOf(items));
        //             e.forEach(doc => {
        //                 console.log(doc.data());
        //                 items.push(doc.data());
        //                 // console.log('-----------',items);

        //             });
        //             resolve([...items]);
        //         }).catch(error => {
        //             console.log(error);
        //             reject([]);
        //         })
        // });
        // console.log(result);
        // this.setState({ projectList: result })
        // console.log(this.projectList);

    }
    


    render() {
        let categoryTitle = this.props.navigation.getParam('title');
        // console.log(this.state.projectList);
        return (

            <SafeAreaView style={styles.container}>
                <Text>{categoryTitle}</Text>
                <FlatList
                    data={this.state.projectList}
                    renderItem={({ item }) =><Text>hello</Text>}
                    keyExtractor={item => item.id}
                />

            </SafeAreaView>

        );
    }
    


}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default withFirebaseHOC(ProjectListScreen);