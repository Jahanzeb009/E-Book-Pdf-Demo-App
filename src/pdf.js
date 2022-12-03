import { View, Text, Linking, StatusBar, LayoutAnimation, DrawerLayoutAndroid, ScrollView, ToastAndroid, Vibration, LogBox, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Pdf from 'react-native-pdf';
import { Appbar, Button, IconButton, Provider, TextInput, Tooltip, TouchableRipple } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

const PdfScreen = () => {

    LogBox.ignoreAllLogs()

    let Vib = () => Vibration.vibrate(25)

    const { dark, colors } = useTheme()

    let data = [
        { name: "Home", pageNo: 1 },
        { name: "Chapter 1", pageNo: 2 },
        { name: "Heading", pageNo: 3 },
        { name: "Chapter 2", pageNo: 4 },
        { name: "Sub Heading", pageNo: 5 },
        { name: "Chapter 3", pageNo: 6 },
        { name: "Sub Heading", pageNo: 7 },
        { name: "Heading", pageNo: 8 },
        { name: "Chapter 4", pageNo: 9 },
        { name: "Heading", pageNo: 10 },
        { name: "Chapter 5", pageNo: 11 },
        { name: "Sub Heading", pageNo: 12 },
        { name: "Chapter 6", pageNo: 13 },
        { name: "Sub Heading", pageNo: 14 }
    ]

    const [pdf, setPdf] = useState({
        spn: false, //showPageNo
        tp: 0, // totalPages
        cP: 0,
        opps: false,// onePagePerScreen
        h: false, // horizontal layout
        cpn: 0, //customPageNo
        showCpn: false // custom page no textinput show or not
    })

    let pdfRef = useRef()
    let TextInputRef = useRef()

    useEffect(() => {
        if (pdf.showCpn) {
            TextInputRef.current?.forceFocus()
        }
    }, [pdf.showCpn])

    const drawer = useRef(null);

    const navigationView = () => (
        <ScrollView key={Math.random()} style={{ flex: 1, marginTop: StatusBar.currentHeight * 2, paddingHorizontal: 10 }}>

            <Text style={{ fontWeight: 'bold', fontSize: 30, marginVertical: 10, color: colors.mainText }} adjustsFontSizeToFit>Table of Content</Text>
            {data.map((v, i) => {
                return (
                    <>
                        {
                            v.name.startsWith('Chapter') ?
                                <TouchableRipple borderless rippleColor={colors.border} style={{ backgroundColor: colors.card + 20, borderWidth: 1, margin: 5, borderRadius: 10, padding: 10 }} onPress={() => { drawer.current.closeDrawer(), pdfRef.current.setPage(v.pageNo) }} >
                                    <Text style={{ fontWeight: 'bold', color: colors.mainText }}>{'\u2023'}  {v.name}</Text>
                                </TouchableRipple> : v.name.startsWith('Home') ?
                                    <TouchableRipple borderless rippleColor={colors.border} style={{ backgroundColor: colors.card + 20, borderWidth: 1, margin: 5, borderRadius: 10, padding: 10 }} onPress={() => { drawer.current.closeDrawer(), pdfRef.current.setPage(v.pageNo) }} >
                                        <Text style={{ fontWeight: 'bold', color: colors.mainText }}>{'\u2023'}  {v.name}</Text>
                                    </TouchableRipple> :
                                    <TouchableRipple borderless rippleColor={colors.border} style={{ backgroundColor: colors.card + 20, borderWidth: 1, margin: 5, borderRadius: 10, padding: 10 }} onPress={() => { drawer.current.closeDrawer(), pdfRef.current.setPage(v.pageNo) }} >
                                        <Text style={{ fontWeight: 'bold', color: colors.mainText }}>       {'\u2022'}  {v.name}</Text>
                                    </TouchableRipple>
                        }
                    </>
                )
            })}
        </ScrollView>
    )

    return (
        <Provider>
            <DrawerLayoutAndroid
                key={1}
                ref={drawer}
                drawerWidth={300}
                drawerPosition={'left'}
                drawerBackgroundColor={colors.background}
                renderNavigationView={navigationView}
                style={{ marginTop: StatusBar.currentHeight }}
            >
                <StatusBar translucent animated backgroundColor={colors.background} barStyle={dark ? 'light-content' : 'dark-content'} />

                <Appbar.Header dark style={{ backgroundColor: colors.background }}>
                    <Tooltip leaveTouchDelay={500} title="Table of content">
                        <Appbar.Action iconColor={colors.mainText} icon="order-bool-descending" onPress={() => {
                            drawer.current.openDrawer()
                            Vib()
                        }} />
                    </Tooltip>

                    <Appbar.Content color={colors.mainText} title="PDF To Mobile App" />

                    <Tooltip leaveTouchDelay={500} title="One Page Per Screen">
                        <Appbar.Action iconColor={colors.mainText} style={{ marginHorizontal: 0 }} icon={pdf.opps ? 'page-layout-body' : 'page-layout-header-footer'} onPress={() => {
                            setPdf(pre => ({ ...pre, opps: !pdf.opps }))
                            Vib()
                        }} />
                    </Tooltip>

                    <Tooltip leaveTouchDelay={500} title="Align Pages Vertically or Horizontally">
                        <Appbar.Action iconColor={colors.mainText} style={{ marginHorizontal: 0 }} icon={pdf.h ? 'swap-vertical-bold' : 'swap-horizontal-bold'} onPress={() => {
                            setPdf(pre => ({ ...pre, h: !pdf.h }))
                            Vib()
                        }} />
                    </Tooltip>

                    <Tooltip leaveTouchDelay={500} title="Go to Specific page no">
                        <Appbar.Action iconColor={colors.mainText} style={{ marginHorizontal: 0 }} icon="form-textbox" onPress={() => {
                            setPdf(pre => ({ ...pre, showCpn: !pdf.showCpn }))
                            Vib()
                        }} />
                    </Tooltip>
                </Appbar.Header>


                <View style={{ flex: 1 }}>


                    {/* show current page at bottom */}
                    <View style={{ position: 'absolute', right: 0, bottom: 20, justifyContent: 'center', backgroundColor: '#7c7c7c80', padding: 10, zIndex: 1111, borderRadius: 100, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                        <Text style={{ color: '#7c7c7c' }}>{pdf.cP}</Text>
                    </View>

                    {pdf.showCpn && <TextInput
                        ref={TextInputRef}
                        placeholder='Page #'
                        keyboardType='numeric'
                        textColor={colors.mainText}
                        style={{ backgroundColor: colors.background }}
                        activeUnderlineColor={colors.primary}
                        onChangeText={(text) => setPdf(pre => ({ ...pre, cpn: text }))}
                        onSubmitEditing={() => {
                            if (pdf.cpn > pdf.tp) {
                                ToastAndroid.show(`Entered Value exceed\nValue should be <= to ${pdf.tp}`, ToastAndroid.SHORT)
                            } else if (pdf.cpn >= 1) {
                                pdfRef.current.setPage(parseInt(pdf.cpn))
                            }
                        }}
                        right={<TextInput.Affix text={`Total pages ${pdf.tp}`} textStyle={{ color: colors.mainText }} />}
                    />}

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                        {/* goto top / bottom */}
                        {/* <Button icon={'arrow-down-circle'} onPress={() => pdfRef.current.setPage(pdf.tp)}>Goto Bottom</Button> */}

                    </View>
                    <IconButton icon={'arrow-up-circle'} style={{ position: 'absolute', bottom: 10, zIndex: 1111, alignSelf: 'center', backgroundColor: colors.border }} iconColor={colors.mainText} mode='contained' onPress={() => {
                        pdfRef.current.setPage(0)
                        Vib()
                    }} />

                    <Pdf
                        source={{ uri: 'https://drive.google.com/uc?export=download&id=19d7-Sr9ScO7XqQ3VMVJ9yTsC0BHBuK-L', cache: true }}
                        trustAllCerts={false}
                        enablePaging={pdf.opps}
                        horizontal={pdf.h}
                        ref={pdfRef}
                        // enableRTL
                        // page={10}
                        maxScale={20}
                        onLoadProgress={() => { <ActivityIndicator animating size={'large'} /> }}
                        // onScaleChanged={(scale) => Vibration.vibrate(1)}
                        onLoadComplete={(numberOfPages, filePath) => {
                            setPdf(pre => ({ ...pre, tp: numberOfPages }))
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            setPdf(pre => ({ ...pre, cP: page }))
                        }}
                        onError={(error) => { console.log(error) }}
                        onPressLink={(uri) => { Linking.openURL(uri) }}
                        style={{ flex: 1, backgroundColor: colors.background }}
                    />

                </View>
            </DrawerLayoutAndroid>
        </Provider>
    )
}

export default PdfScreen
