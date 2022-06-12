import React from 'react';
import { Share, View, Text } from 'react-native';
import { ButtonText, StyledButton } from './../components/styles';
import { Entypo } from '@expo/vector-icons'; 

const ShareComponent = ({ shareMessage, shareButtonText, ...props}) => {
  const onShare = () => {
    try {
      Share.share({
        message: shareMessage || 'Just a share',
      }).then( () => {} )
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View>
      <StyledButton onPress={onShare}>
        <ButtonText>
          <Entypo name="share" size={24} color="white"/>
          <Text> {shareButtonText || "Share!"} </Text>
        </ButtonText>
      </StyledButton>
    </View>
  );
};

export default ShareComponent;