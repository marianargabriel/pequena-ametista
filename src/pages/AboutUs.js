<<<<<<< Updated upstream
import { Text, View } from 'react-native';
import React from 'react';

import styles from "../styles";

export default function AboutUs({ navigation }) {

    return (
        <Text>Hello, this is about us page!</Text>
    );
}
=======
import React from 'react';
import { View, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';

export default function AboutUs() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text>Hello, world! This is page of about us.</Text>
            </View>
        </Layout>
    );
};
>>>>>>> Stashed changes
