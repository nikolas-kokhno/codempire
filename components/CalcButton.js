import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const CalcButton = ({ value, backgroundColor, style, onPress }) => {
    return(
        <TouchableOpacity style={[styles.constainer]} onPress={onPress}>
            <Text style={
                [styles.text, {backgroundColor: backgroundColor}, {...style}]}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    constainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },  
    text: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: '700',
        padding: 20,
        borderRadius: 50,
        width: 80,
        height: 80,
        margin: 5,
        alignItems: 'center',
        textAlign: 'center'
    }
});