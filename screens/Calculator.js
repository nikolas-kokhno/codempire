import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalcButton } from '../components/CalcButton';
import { Display } from '../components/Display';
import { 
    CLICK_CREAR, 
    CLICK_CONVERT, 
    CLICK_NUMBER, 
    CLICK_OPERATOR, 
    CLICK_RESULT, 
    CLICK_PROCENT
} from '../store/types';

export const Calculator = () => {
    const [state, setState] = React.useState('0');
    const [register, setRegister] = React.useState('0');

    const setValue = (value, state) => {
        if (state === '0') {
            return `${value}`
        } else {
            return `${state}` + `${value}`;
        }
    }

    const setOperator = (operator, state) => {
        if (state.slice(-1) === '+' || state.slice(-1) === '-' || state.slice(-1) === '/' || state.slice(-1) === '*') {
            setState(state.toString().slice(0, -1) + operator);
        } else {
            setState(state.toString() + operator);
        }

        return state;
    }

    const clearValue = () => {
        setState('0');
    }

    const convertValue = (state) => {
        let convertState = state.replace(/(\d+)$/, "($1*-1)");
        setState(convertState);
    }

    const procentRes = (state) => {
        if (state.slice(-1) === '+' 
            || state.slice(-1) === '-' 
            || state.slice(-1) === '/' 
            || state.slice(-1) === '*') 
        {
            setState(state.toString().slice(0, -1));
            console.log(state)
        }

        setState(eval(state.toString() + '/100').toString());
    }

    const clearRegister = () => {
        setRegister('0');
        console.log('Register value: 0');
    }

    const setRegisterValue = () => {
        setState(register.toString());
        console.log('Register value: ', register);
    }

    const minusRegister = (state, register) => {
        let res = eval(`${register}-${state}`);
        setRegister(res.toString());
        console.log('Register value: ', register);
    }

    const plusRegister = (state, register) => {
        let res = eval(`${state}+${register}`);
        setRegister(res.toString());
        console.log('Register value: ', register);
    }

    const calculate = (state) => {
        let value = state.toString();

        if (value.slice(-1) === '+' || value.slice(-1) === '-' || value.slice(-1) === '/' || value.slice(-1) === '*') {
            value = value.slice(0, -1);
            setState(eval(value).toString());
        } else {
            setState(eval(state).toString());
        }
    }

    const pressButton = (type, value, state) => {
        switch(type) {
            case CLICK_NUMBER:
                return setValue(value, state)
            case CLICK_CREAR:
                return clearValue()
            case CLICK_RESULT:
                return calculate(state)
            case CLICK_OPERATOR:
                return setOperator(value, state)
            case CLICK_CONVERT:
                return convertValue(state)
            case CLICK_PROCENT:
                return procentRes(state)
            default:
                return state;
        }
    }
    
    const click = (type, value) => {
        setState(state => pressButton(type, value, state));
    }

    console.log(state);

    return(
        <View style={styles.container}>
            <View style={styles.display}>
                <Display value={state} registerValue={register} />
            </View>
            
            <View style={styles.buttons}>
                <View style={styles.row}>
                    <CalcButton value={'AC'} backgroundColor={'#a5a5a5'} onPress={() => click(CLICK_CREAR)} />
                    <CalcButton value={'±'} backgroundColor={'#a5a5a5'} onPress={() => click(CLICK_CONVERT)} />
                    <CalcButton value={'%'} backgroundColor={'#a5a5a5'} onPress={() => click(CLICK_PROCENT)} />
                    <CalcButton value={'÷'} backgroundColor={'#f99a2d'} onPress={() => click(CLICK_OPERATOR, '/')} />
                </View>

                <View style={styles.row}>
                    <CalcButton value={'mc'} backgroundColor={'#333333'} onPress={() => clearRegister()} />
                    <CalcButton value={'mr'} backgroundColor={'#333333'} onPress={() => setRegisterValue(state)} />
                    <CalcButton value={'m-'} backgroundColor={'#333333'} onPress={() => minusRegister(state, register)}/>
                    <CalcButton value={'m+'} backgroundColor={'#f99a2d'} onPress={() => plusRegister(state, register)} />
                </View>

                <View style={styles.row}>
                    <CalcButton value={'7'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '7')} />
                    <CalcButton value={'8'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '8')} />
                    <CalcButton value={'9'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '9')} />
                    <CalcButton value={'x'} backgroundColor={'#f99a2d'} onPress={() => click(CLICK_OPERATOR, '*')} />
                </View>

                <View style={styles.row}>
                    <CalcButton value={'4'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '4')} />
                    <CalcButton value={'5'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '5')} />
                    <CalcButton value={'6'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '6')} />
                    <CalcButton value={'-'} backgroundColor={'#f99a2d'} onPress={() => click(CLICK_OPERATOR, '-')} />
                </View>

                <View style={styles.row}>
                    <CalcButton value={'1'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '1')} />
                    <CalcButton value={'2'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '2')} />
                    <CalcButton value={'3'} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '3')} />
                    <CalcButton value={'+'} backgroundColor={'#f99a2d'} onPress={() => click(CLICK_OPERATOR, '+')} />
                </View>

                <View style={styles.row}>
                    <CalcButton value={'0'} backgroundColor={'#333333'} style={{width: 190}} onPress={() => click(CLICK_NUMBER, '0')} />
                    <CalcButton value={','} backgroundColor={'#333333'} onPress={() => click(CLICK_NUMBER, '.')} />
                    <CalcButton value={'='} backgroundColor={'#f99a2d'} onPress={() => click(CLICK_RESULT)} />
                </View>
            </View>

        </View>
    )   
}

const styles = StyleSheet.create({
    display: { flex: 1, justifyContent: 'flex-end' },
    container: { flex: 1, backgroundColor: '#000000', color: '#ffffff'},
    buttons: { marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between'}
});