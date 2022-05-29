import React, { Node } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Request } from '../utils/Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, fetchUpdateContact } from '../stores/contactsThunk';
import DataInput from '../components/DataInput';
import DetailContact from './DetailContact';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const ContactListView = ({ navigation }): Node => {
  const { loading, contacts } = useSelector(state => state.contacts);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [photo, setPhoto] = React.useState('');

  const [idSelected, setIdSelected] = React.useState();
  const [show, setShow] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [detailVisible, setDetailVisible] = React.useState(false);
  const dispatch = useDispatch();

  function getContactList() {
    try {
      let request: Request = {
        data: {},
        endpoint: '/contact',
        method: 'GET',
        params: {},
        timeout: 30000,
      };
      dispatch(fetchContacts(request));
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getContactList();
  }, []);

  function saveEditData() {
    try {
      let request: Request = {
        data: {
          firstName: firstName,
          lastName: lastName,
          age: age,
          photo: photo,
        },
        endpoint: `/contact/${idSelected}`,
        method: 'PUT',
        params: {},
        timeout: 30000,
      };
      dispatch(fetchUpdateContact(request));
      setModalVisible(false);
    } catch (e) {
      setModalVisible(false);
      console.log(e);
    }
  }

  function deleteUser() {
    try {
      let request: Request = {
        data: {},
        endpoint: `/contact/${idSelected}`,
        method: 'DELETE',
        params: {},
        timeout: 30000,
      };
      dispatch(fetchUpdateContact(request));
      setModalVisible(false);
    } catch (e) {
      setModalVisible(false);
      console.log(e);
    }
  }

  return (
    <View>
      {loading ? (
        <View
          style={{
            height: heightScreen,
            width: widthScreen,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontWeight: '500', fontSize: 32 }}>Loading</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl
              onRefresh={() => getContactList()}
              colors={['#F9F9F9', '#FFFFFF']}
              progressBackgroundColor={'#289FFF'}
            />
          }
          // disableIntervalMomentum={true}
          scrollEventThrottle={100}>
          <View style={{ height: heightScreen }}>
            {contacts.map((value, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: 100,
                    width: widthScreen * 0.85,
                    marginHorizontal: 32,
                    flexDirection: 'row',
                    flex: 1,
                    marginVertical: 8,
                    padding: 8,
                    alignItems: 'center',
                    borderWidth: 0.1,
                    borderColor: 'red',
                    backgroundColor: show === value.id ? 'gray' : 'white',
                  }}
                  onTouchStart={() => {
                    setIdSelected(value.id);
                    setShow(value.id);
                  }}>
                  <Image
                    source={{ uri: value ? value.photo : '' }}
                    style={{
                      height: widthScreen * 0.15,
                      width: widthScreen * 0.15,
                      borderRadius: 50,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 20,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '500',
                        color: 'black',
                      }}>{`${value.lastName}, ${value.firstName}`}</Text>
                    {show === value.id ? (
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          style={{
                            width: 80,
                            height: 40,
                            backgroundColor: 'black',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 8,
                          }}
                          onPress={() => setDetailVisible(true)}>
                          <Text style={{ color: 'white', fontSize: 18 }}>
                            Detail
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: 80,
                            height: 40,
                            backgroundColor: 'black',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 8,
                            marginLeft: 10,
                          }}
                          onPress={() => setModalVisible(true)}>
                          <Text style={{ color: 'white', fontSize: 18 }}>
                            Edit
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: 80,
                            height: 40,
                            backgroundColor: 'red',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 8,
                            marginLeft: 10,
                          }}
                          onPress={() => deleteUser()}>
                          <Text style={{ color: 'white', fontSize: 18 }}>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ height: heightScreen * 0.9 }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 32,
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Edit Contact
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <DataInput
              setLastName={v => setLastName(v)}
              setFirstName={v => setFirstName(v)}
              setPhoto={v => setPhoto(v)}
              setAge={v => setAge(v)}
              saveNewContact={() => saveEditData()}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailVisible}
        // style={{ height: heightScreen * 0.7 }}
        onRequestClose={() => {
          setDetailVisible(!detailVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 32,
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Detail Contact
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setDetailVisible(!detailVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <DetailContact id={idSelected} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: widthScreen * 0.9,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginVertical: 8,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ContactListView;
