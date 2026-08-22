import React from 'react';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { DocumentProvider, useDocumentContext } from './src/context/DocumentContext';
import { AnalyzeDocumentScreen } from './src/screens/AnalyzeDocumentScreen';
import { AIAnalysisScreen } from './src/screens/AIAnalysisScreen';
import { ExplainSimplyScreen } from './src/screens/ExplainSimplyScreen';
import { AskQuestionsScreen } from './src/screens/AskQuestionsScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { BottomTabBar } from './src/components/BottomTabBar';
import { Toast } from './src/components/Toast';

const MainNavigator = () => {
  const { theme, currentScreen, activeTab, switchTab, toastMessage } = useDocumentContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'ANALYZE':
        return <AnalyzeDocumentScreen />;
      case 'SCANNING':
        return <AIAnalysisScreen />;
      case 'EXPLAIN':
        return <ExplainSimplyScreen />;
      case 'QUESTIONS':
        return <AskQuestionsScreen />;
      case 'HISTORY':
        return <HistoryScreen />;
      case 'PROFILE':
        return <ProfileScreen />;
      default:
        return <AnalyzeDocumentScreen />;
    }
  };

  const showBottomTab = currentScreen === 'ANALYZE' || currentScreen === 'HISTORY' || currentScreen === 'PROFILE';

  return (
    <View style={[styles.appContainer, { backgroundColor: theme.background }]}>
      <ExpoStatusBar
        style={theme.isDark ? 'light' : 'dark'}
        backgroundColor={theme.background}
      />
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.screenWrapper}>
          {renderScreen()}
        </View>

        {showBottomTab && (
          <BottomTabBar activeTab={activeTab} onSelectTab={switchTab} />
        )}

        <Toast message={toastMessage} />
      </SafeAreaView>
    </View>
  );
};

export default function App() {
  return (
    <DocumentProvider>
      <MainNavigator />
    </DocumentProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenWrapper: {
    flex: 1,
  },
});
