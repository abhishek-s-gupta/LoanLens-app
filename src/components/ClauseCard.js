import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDocumentContext } from '../context/DocumentContext';

export const ClauseCard = ({ clause }) => {
  const { theme } = useDocumentContext();

  const renderTagIcon = () => {
    switch (clause.tagIcon) {
      case 'alert-circle':
      case 'alert-triangle':
        return <Ionicons name="warning" size={14} color={clause.tagColor || theme.warning} />;
      case 'refresh-cw':
        return <Ionicons name="sync" size={14} color={clause.tagColor || theme.warning} />;
      case 'credit-card':
      case 'dollar-sign':
        return <MaterialCommunityIcons name="credit-card-outline" size={14} color={clause.tagColor || theme.danger} />;
      case 'lock':
        return <Ionicons name="lock-closed" size={14} color={clause.tagColor || theme.warning} />;
      default:
        return <Ionicons name="alert-circle" size={14} color={clause.tagColor || theme.warning} />;
    }
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
      {/* Badge Header Row */}
      <View style={styles.badgeRow}>
        <View style={[styles.badge, { backgroundColor: theme.isDark ? '#2A3547' : '#E2E8F0' }]}>
          <Text style={[styles.badgeText, { color: theme.textPrimary }]}>{clause.tag}</Text>
        </View>
        <View style={styles.iconContainer}>
          {renderTagIcon()}
        </View>
      </View>

      {/* Main Legal Excerpt Title */}
      <Text style={[styles.legalTitle, { color: theme.textPrimary }]}>{clause.title}</Text>

      {/* Nested Dark Quote Box */}
      <View style={[styles.quoteBox, { backgroundColor: theme.quoteBackground, borderLeftColor: theme.quoteBorder }]}>
        <Text style={[styles.quoteText, { color: theme.textSecondary }]}>{clause.quote}</Text>
      </View>

      {/* Green Check Takeaway Headline */}
      <View style={styles.takeawayRow}>
        <Ionicons name="checkmark-circle-outline" size={18} color="#5CB6A5" style={styles.checkIcon} />
        <Text style={styles.takeawayText} numberOfLines={1}>
          {clause.takeawaySnippet}
        </Text>
      </View>

      {/* Plain English Translation Paragraph */}
      <Text style={[styles.plainEnglishText, { color: theme.textPrimary }]}>{clause.plainEnglish}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 12,
  },
  quoteBox: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderLeftWidth: 2,
  },
  quoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    marginRight: 6,
  },
  takeawayText: {
    color: '#5CB6A5',
    fontSize: 12.5,
    fontWeight: '600',
    flex: 1,
  },
  plainEnglishText: {
    fontSize: 14.5,
    lineHeight: 21,
    fontWeight: '500',
  },
});
