import { View, Text, Linking, ActivityIndicator, Vibration, StatusBar, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useTheme } from '@react-navigation/native';
import MobileAds, { BannerAd, BannerAdSize, TestIds, useAppOpenAd } from 'react-native-google-mobile-ads';
import SplashScreen from 'react-native-splash-screen';

const Home = ({ navigation }) => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  const BannerAdID = __DEV__ ? TestIds.BANNER : 'ca-app-pub-4551497516413603/4519397221'
  const AppOpenAdID = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-4551497516413603/8420125547'

  let Vib = () => Vibration.vibrate(25)

  const { colors, dark } = useTheme()

  const [visible, setVisible] = useState(true)

  const { isLoaded, load, show } = useAppOpenAd(AppOpenAdID, {
    requestNonPersonalizedAdsOnly: true,
  });


  useEffect(() => {
    // Start loading the interstitial straight away
    load();

    if (isLoaded) {
      show()
    }
  }, [load]);

  if (isLoaded) {
    return show()
  } else {

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <StatusBar animated translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <ActivityIndicator animating={visible} size='large' color={colors.primary} style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }} />
          {visible && <Text style={{ color: colors.mainText, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>Loading Ad...</Text>}
          <BannerAd size={BannerAdSize.BANNER} unitId={BannerAdID} />
        </View>

        <View style={{ backgroundColor: colors.card, padding: 10, margin: 10, borderRadius: 10, }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: colors.mainText }} adjustsFontSizeToFit >Welcome to e-book App</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, color: colors.subMainText, marginTop: 10 }} adjustsFontSizeToFit >This is a demo app, in which
            I show my clients, how their e-book or any other pdf file will look and how they implement in app and their functionality.</Text>
        </View>
        <Button style={{ marginHorizontal: 10 }} textColor={'white'} buttonColor={'#0366d6'} onPress={() => { navigation.navigate('PdfScreen'), Vib() }}>Go to Main Screen</Button>
        <Button style={{ margin: 10 }} textColor={colors.mainText} buttonColor={colors.border} onPress={() => { Linking.openURL('mailto:dev.jahanzeb@gmail.com'), Vib() }}>Hire me</Button>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={visible} size='large' color={colors.primary} style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }} />
          {visible && <Text style={{ color: colors.mainText, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>Loading Ad...</Text>}

          <BannerAd size={BannerAdSize.BANNER} onAdLoaded={() => { setVisible(!visible) }} onAdFailedToLoad={(error) => { console.log(error) }} unitId={BannerAdID} />
        </View>

      </View>
    )
  }
}

export default Home