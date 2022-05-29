import React, { Node } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Request } from '../utils/Interfaces';
import { fetchSaveContact } from '../stores/contactsThunk';
import { useDispatch } from 'react-redux';
import DataInput from '../components/DataInput';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const AddNewContactView = (): Node => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [photo, setPhoto] = React.useState('');

  const dispatch = useDispatch();

  function saveNewContact() {
    try {
      let request: Request = {
        data: {
          firstName: firstName ?? '',
          lastName: lastName ?? '',
          age: age ?? '',
          photo: photo ?? '',
        },
        endpoint: '/contact',
        method: 'POST',
        params: {},
        timeout: 30000,
      };
      dispatch(fetchSaveContact(request));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View
      style={{
        height: heightScreen,
        width: widthScreen,
        padding: 32,
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: '500',
          color: 'black',
          marginTop: 20,
        }}>
        Add Contact
      </Text>
      <DataInput
        setLastName={v => setLastName(v)}
        setFirstName={v => setFirstName(v)}
        setPhoto={v => setPhoto(v)}
        setAge={v => setAge(v)}
        saveNewContact={() => saveNewContact()}
      />
    </View>
  );
};

export default AddNewContactView;
