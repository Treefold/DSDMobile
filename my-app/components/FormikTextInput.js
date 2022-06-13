import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { Colors, LeftIcon, RightIcon, StyledInputLabel, StyledTextInput } from './styles';

const { brand, darkLight } = Colors;

const FormikTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity> 
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} /> 
                </RightIcon>   
            )}
        </View>
    );
};

export default FormikTextInput;