/**
 * @format
 */

import 'react-native';
import React from 'react';
import ContactListView from '../src/views/ContactListView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Contact List renders correctly', () => {
    renderer.create(<ContactListView />);
});
