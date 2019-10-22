import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    FormLabel,
    FormInput,
    FormValidationMessage,
} from 'react-native-elements';
import axios from 'axios';
import { Formik } from 'formik';

class Input extends PureComponent {
    _handleChange = (value) => {
        this.props.onChange(this.props.name, value)
    }
    _handleTouch = (value) => {
        this.props.onTouch(this.props.name, value)
    }
    render() {
        const { label, error, ...rest } = this.props;
        return (
            <View style={styles.root}>
                <FormLabel>{label}</FormLabel>
                <FormInput
                    onChangeText={this._handleChange}
                    onBlur={this._handleTouch}
                    placeholder={label}
                    {...rest}
                />
                {error && <FormValidationMessage>{error}</FormValidationMessage>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        width: '90%',
        alignSelf: 'center'
    },
})

export default Input;