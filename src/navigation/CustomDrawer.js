import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';

const array = ['MyAccount']
const CustomDrawer = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <DrawerItems items={array} />
            {console.log('Custom Drawer Props', props)}
        </SafeAreaView>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CustomDrawer;