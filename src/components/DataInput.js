import React, { Node } from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  setFirstName: () => {},
  setLastName: () => {},
  setAge: () => {},
  setPhoto: () => {},
  saveNewContact: () => {},
};

const DataInput = (props: Props): Node => {
  return (
    <View
      style={{
        marginTop: 20,
        width: '100%',
        height: Dimensions.get('window').height / 2,
        alignItems: 'flex-start',
      }}>
      <Text
        style={{
          fontWeight: '400',
          fontSize: 16,
          color: 'black',
          marginTop: 16,
          marginBottom: 8,
        }}>
        First Name
      </Text>
      <TextInput
        style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 8 }}
        placeholder={'Please input firstname'}
        onChangeText={v => props.setFirstName(v)}
      />
      <Text
        style={{
          fontWeight: '400',
          fontSize: 16,
          color: 'black',
          marginTop: 16,
          marginBottom: 8,
        }}>
        Last Name
      </Text>
      <TextInput
        style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 8 }}
        placeholder={'Please input lastname'}
        onChangeText={v => props.setLastName(v)}
      />
      <Text
        style={{
          fontWeight: '400',
          fontSize: 16,
          color: 'black',
          marginTop: 16,
          marginBottom: 8,
        }}>
        Age
      </Text>
      <TextInput
        style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 8 }}
        placeholder={'Please input your age'}
        onChangeText={v => props.setAge(v)}
      />
      <Text
        style={{
          fontWeight: '400',
          fontSize: 16,
          color: 'black',
          marginTop: 16,
          marginBottom: 8,
        }}>
        Photo
      </Text>
      <TextInput
        style={{ width: '100%', height: 50, borderWidth: 1, borderRadius: 8 }}
        placeholder={'Please input your photo url'}
        onChangeText={v => props.setPhoto(v)}
      />
      <TouchableOpacity
        style={{
          height: 50,
          width: 100,
          marginTop: 80,
          alignSelf: 'center',
          borderRadius: 16,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          props.saveNewContact();
        }}>
        <Text style={{ fontWeight: '500', fontSize: 16, color: 'white' }}>
          SUBMIT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DataInput;
