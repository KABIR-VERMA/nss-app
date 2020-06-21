import React from 'react';
import {StyleSheet , Text,  View} from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons';


export default function Header({navigation, title, drawer}) {
    var isdrawer=drawer;
    return(
        <View style={styles.header}>
            {isdrawer && <MaterialIcons name='menu' size={28} onPress={navigation.openDrawer} style={styles.icon}/>}
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    );    
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon:{
        position:'absolute',
        left :16,
    },
});