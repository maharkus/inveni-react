import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { customColors, styles } from '../styles/styles';

export default function SplashScreen(){
    
    //Lottie init
    const animationRef = useRef<LottieView>(null);
    useEffect(() => {
        animationRef.current?.reset();
        setTimeout(() => {
            animationRef.current?.play();
        }, 100)
    }, []);
  
    return (
        <View style={[styles.center, { height: "100%", backgroundColor: customColors.light }]}> 
            <View style={{width: "50%", height: "100%", flex: 1}}>
                <LottieView
                    ref={animationRef}
                    source={require('../assets/splash/inveniLoaderV3.json')}
                    style={{flex:1}}
                    loop
                />
            </View>
        </View>
    );
};
  





