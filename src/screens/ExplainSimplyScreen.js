import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { ClauseCard } from '../components/ClauseCard';
import { HelpModal } from '../components/HelpModal';
import { useDocumentContext } from '../context/DocumentContext';

export const ExplainSimplyScreen = () => {
  const { theme, activeDocument, navigateToScreen } = useDocumentContext();
  const [helpVisible, setHelpVisible] = useState(false);

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
      <Header
        title="Explain It Simply"
        showBack={true}
        onBack={() => navigateToScreen('ANALYZE')}
        rightType="help"
        onRightPress={() => setHelpVisible(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>No Jargon, Just Clarity</Text>
          <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
            We've translated the legal clauses into plain English so you can make informed financial decisions without the headache.
          </Text>
        </View>

        {/* Clause Cards List */}
        {activeDocument.clauses?.map((clause) => (
          <ClauseCard key={clause.id} clause={clause} />
        ))}

        {/* LoanLens Insight Callout Card */}
        {activeDocument.insight && (
          <View style={[styles.insightCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <View style={styles.insightHeaderRow}>
              <Ionicons name="bulb-outline" size={20} color={theme.textPrimary} style={styles.bulbIcon} />
              <Text style={[styles.insightTitle, { color: theme.textPrimary }]}>{activeDocument.insight.title}</Text>
            </View>
            <Text style={[styles.insightBody, { color: theme.textSecondary }]}>{activeDocument.insight.text}</Text>
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.background, borderTopColor: theme.cardBorder }]}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.whiteButtonBg }]}
          activeOpacity={0.88}
          onPress={() => navigateToScreen('QUESTIONS')}
        >
          <Text style={[styles.actionButtonText, { color: theme.whiteButtonText }]}>View Questions to Ask</Text>
          <Feather name="arrow-right" size={17} color={theme.whiteButtonText} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      <HelpModal visible={helpVisible} onClose={() => setHelpVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  heroSection: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 23,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: '400',
  },
  insightCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  insightHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulbIcon: {
    marginRight: 8,
  },
  insightTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  insightBody: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  actionButton: {
    borderRadius: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 14.5,
    fontWeight: '700',
  },
});
