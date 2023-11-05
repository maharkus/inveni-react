import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';

export default function SplashScreen(){
    const animationRef = useRef<LottieView>(null);
  
    useEffect(() => {
        animationRef.current?.reset();
        setTimeout(() => {
            animationRef.current?.play();
        }, 100)
        console.log('playing');
    }, []);
  
    return (
        <View style={{
            width: "100%",
            height: "100%",
            backgroundColor: 'fff',
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}> 
            <View style={{
                width: "50%",
                height: "100%",
                flex: 1,
            }}>
                <LottieView
                    ref={animationRef}
                    source={require('../assets/splash/inveniLoader.json')}
                    style={{flex:1}}
                    loop
                    onAnimationFinish={() => {
                        console.log('Animation finished loading');
                    }}
                />
            </View>
        </View>
    );
};
  





