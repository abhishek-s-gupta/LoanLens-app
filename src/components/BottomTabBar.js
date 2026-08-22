import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDocumentContext } from '../context/DocumentContext';

export const BottomTabBar = ({ activeTab, onSelectTab }) => {
  const { theme } = useDocumentContext();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.tabBarBg,
          borderTopColor: theme.tabBarBorder,
        },
      ]}
    >
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => onSelectTab('home')}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home' : 'home-outline'}
          size={22}
          color={activeTab === 'home' ? theme.tabActive : theme.tabInactive}
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color: activeTab === 'home' ? theme.tabActive : theme.tabInactive,
            },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* History Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => onSelectTab('history')}
      >
        <MaterialCommunityIcons
          name={activeTab === 'history' ? 'history' : 'history'}
          size={23}
          color={activeTab === 'history' ? theme.tabActive : theme.tabInactive}
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color: activeTab === 'history' ? theme.tabActive : theme.tabInactive,
            },
          ]}
        >
          History
        </Text>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        activeOpacity={0.7}
        onPress={() => onSelectTab('profile')}
      >
        <Ionicons
          name={activeTab === 'profile' ? 'person' : 'person-outline'}
          size={21}
          color={activeTab === 'profile' ? theme.tabActive : theme.tabInactive}
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color: activeTab === 'profile' ? theme.tabActive : theme.tabInactive,
            },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 76 : 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 16 : 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
});
