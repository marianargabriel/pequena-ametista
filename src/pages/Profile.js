import React from 'react';
import { View, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';

export default function Profile() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text>Hello, world! This is page of profile.</Text>
            </View>
        </Layout>
    );
};