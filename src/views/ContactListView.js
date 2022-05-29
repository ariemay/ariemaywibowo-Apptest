import React, { Node } from "react";
import {Text, View} from 'react-native';
import {api} from '../helpers/api';
import { Request } from '../utils/Interfaces';

const ContactListView = (): Node => {
    const [contacts, setContacts] = React.useState([])

    async function getContactList() {
        try {
            let request: Request = {
                data: {},
                endpoint: "/contact",
                method: "GET",
                params: {},
                timeout: 30000
            }
            await api(request, (v) => {
                console.log(v)
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        getContactList().then(() => {
            console.log("finished")
        })
    }, [])

    return (
        <View>
            <Text>ContactListView</Text>
        </View>
    )
}

export default ContactListView;
