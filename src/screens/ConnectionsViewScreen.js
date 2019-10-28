import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function ConnectionsViewScreen(props) {
  return (
    <View>
      <View style={styles.tabs}>
        <Text
          style={[styles.tab, tabs.engagement ? styles.selected : null]}
          onPress={() => {
            setTabs({
              engagement: true,
              docs: false,
            });
          }}
        >
          Engagement
        </Text>
        <Text
          style={[styles.tab, tabs.participants ? styles.selected : null]}
          onPress={() => {
            setTabs({
              engagement: false,
              docs: true,
            });
          }}
        >
          Docs
        </Text>
      </View>
      {
    tabs.engagement ? <Engagement caseData={caseData} /> : null
  }
  {
    tabs.participants ? <Participants caseData={caseData} /> : null
  }
  
    </View>
    );
}
