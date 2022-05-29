import React, { Node } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Request } from '../utils/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificUser } from '../stores/contactsThunk';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const DetailContact = ({ id }): Node => {
  const { loading, detailContact } = useSelector(state => state.contacts);

  const dispatch = useDispatch();

  function getDetailData() {
    try {
      let request: Request = {
        data: {},
        endpoint: '/contact/' + id,
        method: 'GET',
        params: {},
        timeout: 30000,
      };
      dispatch(fetchSpecificUser(request));
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getDetailData();
  }, [id]);

  React.useEffect(() => {
    console.log(detailContact);
  }, [detailContact]);

  return (
    <View
      style={{
        height: heightScreen / 2,
        width: widthScreen,
        padding: 32,
        alignItems: 'center',
      }}>
      <Image
        source={{ uri: detailContact.photo }}
        style={{ width: widthScreen * 0.9, height: heightScreen / 3 }}
        resizeMode={'cover'}
      />
      <Text
        style={{
          fontSize: 32,
          color: 'black',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        {detailContact.firstName + ' ' + detailContact.lastName}
      </Text>
      <Text
        style={{
          fontSize: 32,
          color: 'black',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        {detailContact.age + ' Tahun'}
      </Text>
    </View>
  );
};

export default DetailContact;
