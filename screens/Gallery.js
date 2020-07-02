import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { withFirebaseHOC } from '../config/Firebase';

const {width, height} = Dimensions.get('window')


class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageuri: '',
      imagecaption: '',
      ModalVisibleStatus: false,
      loading:true,
    };
  }

  ShowModalFunction(visible, imageURL, imagecaption) {
    //handler to handle the click on image of Grid
    //and close button on modal
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL,
      imagecaption: imagecaption,
    });
  }

  componentDidMount() {
    var that = this;
    const link = 'https://nssgallery.herokuapp.com/galleries?_sort=createdAt:DESC'
    fetch(link)
    .then(res=>res.json())
    .then(data => {
        let items = data.map((item, index) => {
        return { id: item._id, src: item.Images.url, caption :item.caption};
        });
        that.setState({
        dataSource: items,
        loading:false,
      });
    })
    .catch(()=>{alert('Encountered Network Error!')})
  }

  render() {
    if(this.state.loading){
        return(<ActivityIndicator style={styles.activityIndicatorWrapper} animating={true} size ='large'/>)
    }
    else  if (this.state.ModalVisibleStatus) {
      return (
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(!this.state.ModalVisibleStatus, '', '');
          }}>
          <View style={styles.modelStyle}>
          <FontAwesomeIcon
                icon={faWindowClose}
                size={50}
                color='white'
                onPress={() => {
                    this.ShowModalFunction(!this.state.ModalVisibleStatus, '', '');
                  }}
                style={styles.CloseModal}
              />
            <Text style={styles.caption}>{this.state.imagecaption}</Text>
            <Image
              style={styles.fullImageStyle}
              source={{ uri: this.state.imageuri }}
              resizeMode='contain'
            />
          </View>
        </Modal>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <TouchableOpacity
                  key={item.id}
                  style={{ flex: 1 }}
                  onPress={() => {
                    this.ShowModalFunction(true, item.src, item.caption);
                  }}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.src,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  activityIndicatorWrapper:{
      top:height*(0.4),
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  image: {
    height: 120,
    width: '100%',
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height:height*(0.90) ,
    width:width*(0.95) ,
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',
  },
  caption:{
    color:'white',
    fontSize:25,
    top:70,
    textAlign:'center'
  },
  CloseModal:{
    top:30,
  }
});

export default withFirebaseHOC(Gallery)