import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface WaitingVideoCallScreenProps { }

const WaitingVideoCallScreen = (props: WaitingVideoCallScreenProps) => {
    return (
        <View style={styles.container}>
            <Text>WaitingVideoCallScreen</Text>
        </View>
    );
};

export default WaitingVideoCallScreen;

const styles = StyleSheet.create({
    container: {}
});
