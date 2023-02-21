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
