import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableScale, LinearGradient } from 'react-native';
import { ListItem } from 'react-native-elements'

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
        this.categoryTitle = props.navigation.getParam('title');
        this.state = {
            projectList: [],
        };
    }
    componentDidMount() {
        let items = [];
        firebase.firestore().collection('Projects').where('category', '==', this.categoryTitle)
            .get().then((e) => {

                // console.log(typeOf(items));
                e.forEach(doc => {
                    // console.log(doc.data());
                    items.push(doc.data());
                    //  console.log('-----------',items);
                    this.setState({
                        projectList: items,
                    })
                    this.forceUpdate();

                });

            }).catch(error => {
                console.log(error);

            })

        console.log('--', this.state.projectList);
    }



    render() {
        let categoryTitle = this.props.navigation.getParam('title');
        // console.log(this.state.projectList);
        return (

            <SafeAreaView style={styles.container} >
                <View >
                    <View style={styles.heading}><Text style={styles.headingText}>{categoryTitle}</Text></View>

                    <FlatList
                        data={this.state.projectList}
                        renderItem={(itemdata) => <View>

                            <ListItem
                                style={styles.listItem}
                                Component={TouchableScale}
                                onPress={()=>{
                                    console.log('we pressed')
                                    this.props.navigation.navigate('ProjectDetail',{
                                        project:itemdata.item
                                    })
                                }
                                }
                                friction={90} //
                                tension={100} // These props are passed to the parent component (here TouchableScale)
                                activeScale={0.95} //
                                linearGradientProps={{
                                    colors: ['#FF9800', '#F44336'],
                                    start: { x: 1, y: 0 },
                                    end: { x: 0.2, y: 0 },
                                }}
                                ViewComponent={LinearGradient} // Only if no expo
                                leftAvatar={{ rounded: true, source: { uri: itemdata.item.iconUrl } }}
                                title={itemdata.item.title}
                                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                subtitleStyle={{ color: 'white' }}
                                subtitle={itemdata.item.address}
                                chevron={{ color: 'white' }}
                            />
                        </View>}
                        keyExtractor={item => item.id}
                    />
                </View>



            </SafeAreaView>

        );
    }



}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 18,
        // fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'blue',
    },
    listItem: {
        marginHorizontal: 5,
        justifyContent: 'center',
        marginVertical: 1,
    }
});

export default withFirebaseHOC(ProjectListScreen);