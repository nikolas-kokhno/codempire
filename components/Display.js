import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Display = ({ value, registerValue, setDisplayValue }) => {
    const onPress = () => {
        setDisplayValue(0);
    }

    return (
        <View style={styles.container} onPress={onPress}>
            <Text style={styles.display}>
                {value}
            </Text>
            <Text style={styles.registerValue}>
                mem: {registerValue}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    display: {
        fontSize: 45,
        color: '#ffffff',
        textAlign: 'right',
    },
    registerValue: {
        fontSize: 15,
        color: '#ffffff',
        textAlign: 'left'
    }
});