import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

const animationStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const LoadingComponent = () => {
    const AnimationSize = 100.0;
    const progress = useSharedValue(1);
    const scale = useSharedValue(2);
    
    const handleRotation = (progress) => {
        'worklet';
        return `${progress.value * 2 * Math.PI}rad`;
    };

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
        opacity: progress.value,
        borderRadius: (progress.value * AnimationSize) / 2,
        transform: [{ scale: scale.value }, { rotate: handleRotation(progress) }],
        };
    }, []);

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), -1, true);
        scale.value = withRepeat(withSpring(1), -1, true);
    }, []);

    return (
        <View style={animationStyle.container}>
        <Animated.View
            style={[
                { height: AnimationSize, width: AnimationSize, backgroundColor: 'blue' },
                reanimatedStyle,
            ]}
        />
        </View>
    );
};

export default LoadingComponent;