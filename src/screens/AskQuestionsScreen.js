import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { QuestionItem } from '../components/QuestionItem';
import { useDocumentContext } from '../context/DocumentContext';

export const AskQuestionsScreen = () => {
  const {
    theme,
    activeDocument,
    navigateToScreen,
    checkedQuestions,
    toggleQuestion,
    showToast,
  } = useDocumentContext();

  const handleCopyQuestion = (questionText) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(questionText);
    }
    showToast('Question copied to clipboard');
  };

  const handleExportPDF = () => {
    showToast('Exporting summary PDF...');
    setTimeout(() => {
      Alert.alert(
        'Export Complete',
        `The negotiation checklist for "${activeDocument.title}" has been saved to your downloads.`,
        [{ text: 'OK' }]
      );
    }, 600);
  };

  const handleShareAdvice = async () => {
    const questionsText = activeDocument.questions
      ?.map((q, idx) => `${idx + 1}. ${q.question} (${q.clauseTag})`)
      .join('\n');

    const shareContent = `LoanLens Negotiation Checklist for ${activeDocument.title}:\n\n${questionsText}\n\nGenerated with LoanLens AI.`;

    try {
      if (Platform.OS !== 'web') {
        await Share.share({
          message: shareContent,
          title: `LoanLens Checklist - ${activeDocument.title}`,
        });
      } else {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(shareContent);
        }
        showToast('Checklist copied to clipboard');
      }
    } catch (error) {
      showToast('Checklist ready to share');
    }
  };

  const handleMenuPress = () => {
    Alert.alert(
      'Checklist Options',
      'Manage your negotiation questions',
      [
        {
          text: 'Select All Questions',
          onPress: () => {
            activeDocument.questions?.forEach((q) => {
              if (!checkedQuestions[q.id]) toggleQuestion(q.id);
            });
            showToast('All items selected');
          },
        },
        {
          text: 'Clear All Selections',
          onPress: () => {
            activeDocument.questions?.forEach((q) => {
              if (checkedQuestions[q.id]) toggleQuestion(q.id);
            });
            showToast('Selections cleared');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const totalQuestions = activeDocument.questions?.length || 4;

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
      <Header
        title="Ask Before You Sign"
        showBack={true}
        onBack={() => navigateToScreen('EXPLAIN')}
        rightType="menu"
        onRightPress={handleMenuPress}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Checklist Banner */}
        <View style={styles.aiChecklistCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="bulb-outline" size={24} color="#3B857A" />
          </View>
          <View style={styles.aiChecklistTextCol}>
            <Text style={styles.aiChecklistBadge}>AI-GENERATED CHECKLIST</Text>
            <Text style={styles.aiChecklistDescription}>
              We've identified 3 critical areas that require clarification from your lender.
            </Text>
          </View>
        </View>

        {/* Questions Header Row */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Questions to Ask</Text>
          <View style={[styles.itemsBadge, { backgroundColor: theme.isDark ? '#202A38' : '#E2E8F0', borderColor: theme.cardBorder }]}>
            <Text style={[styles.itemsBadgeText, { color: theme.textSecondary }]}>{totalQuestions} Items</Text>
          </View>
        </View>

        {/* Questions List */}
        {activeDocument.questions?.map((item) => (
          <QuestionItem
            key={item.id}
            item={item}
            isChecked={!!checkedQuestions[item.id]}
            onToggle={() => toggleQuestion(item.id)}
            onCopy={() => handleCopyQuestion(item.question)}
          />
        ))}

        {/* Take Action Section */}
        <Text style={[styles.actionSectionTitle, { color: theme.textPrimary }]}>Take Action</Text>
        <View style={styles.actionButtonsRow}>
          {/* Export PDF Button */}
          <TouchableOpacity
            style={[styles.actionPillButton, { backgroundColor: theme.darkButtonBg, borderColor: theme.darkButtonBorder }]}
            onPress={handleExportPDF}
            activeOpacity={0.8}
          >
            <Feather name="download" size={16} color={theme.textPrimary} style={{ marginRight: 6 }} />
            <Text style={[styles.actionPillText, { color: theme.textPrimary }]}>Export PDF</Text>
          </TouchableOpacity>

          {/* Share Advice Button */}
          <TouchableOpacity
            style={[styles.actionPillButton, { backgroundColor: theme.darkButtonBg, borderColor: theme.darkButtonBorder }]}
            onPress={handleShareAdvice}
            activeOpacity={0.8}
          >
            <Feather name="send" size={16} color={theme.textPrimary} style={{ marginRight: 6 }} />
            <Text style={[styles.actionPillText, { color: theme.textPrimary }]}>Share Advice</Text>
          </TouchableOpacity>
        </View>

        {/* Info Callout Card */}
        <View style={[styles.infoCalloutCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          <Ionicons name="information-circle" size={22} color={theme.textSecondary} style={styles.infoIcon} />
          <Text style={[styles.infoCalloutText, { color: theme.textSecondary }]}>
            Use these questions to negotiate or clarify terms. A transparent lender will have no issue providing clear answers.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.background, borderTopColor: theme.cardBorder }]}>
        <TouchableOpacity
          style={[styles.backResultsButton, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}
          activeOpacity={0.85}
          onPress={() => navigateToScreen('EXPLAIN')}
        >
          <Feather name="arrow-left" size={16} color={theme.textPrimary} style={{ marginRight: 6 }} />
          <Text style={[styles.backResultsText, { color: theme.textPrimary }]}>Back to Results</Text>
        </TouchableOpacity>
      </View>
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
  aiChecklistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#D7EDE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  aiChecklistTextCol: {
    flex: 1,
  },
  aiChecklistBadge: {
    color: '#64748B',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  aiChecklistDescription: {
    color: '#0B0F17',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  itemsBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  itemsBadgeText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  actionSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionPillButton: {
    flex: 0.48,
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionPillText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  infoCalloutCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 1,
  },
  infoCalloutText: {
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  backResultsButton: {
    borderRadius: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  backResultsText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
