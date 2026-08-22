import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useDocumentContext } from '../context/DocumentContext';

export const QuestionItem = ({ item, isChecked, onToggle, onCopy }) => {
  const { theme } = useDocumentContext();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isChecked
            ? theme.isDark
              ? '#1B262F'
              : '#E6F4F1'
            : theme.cardBackground,
          borderColor: isChecked ? '#3B9384' : theme.cardBorder,
        },
      ]}
      activeOpacity={0.85}
      onPress={onToggle}
    >
      <View style={styles.contentRow}>
        {/* Checkbox Icon */}
        <TouchableOpacity
          style={styles.checkboxTouch}
          onPress={onToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {isChecked ? (
            <View style={styles.checkCircleActive}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
          ) : (
            <View
              style={[
                styles.checkCircleInactive,
                { borderColor: theme.isDark ? '#475569' : '#CBD5E1' },
              ]}
            />
          )}
        </TouchableOpacity>

        {/* Text Area */}
        <View style={styles.textContainer}>
          <Text style={[styles.questionText, { color: theme.textPrimary }]}>
            {item.question}
          </Text>

          {/* Subtag Pill */}
          <View style={styles.tagRow}>
            {isChecked ? (
              <Ionicons name="checkmark" size={13} color="#5CB6A5" style={{ marginRight: 4 }} />
            ) : (
              <Ionicons name="document-text-outline" size={13} color={theme.textSecondary} style={{ marginRight: 4 }} />
            )}
            <Text
              style={[
                styles.tagText,
                { color: isChecked ? '#5CB6A5' : theme.textSecondary },
              ]}
            >
              {item.clauseTag}
            </Text>
          </View>
        </View>

        {/* Copy Button */}
        <TouchableOpacity
          style={styles.copyButton}
          onPress={onCopy}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          activeOpacity={0.6}
        >
          <Feather name="copy" size={17} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxTouch: {
    marginRight: 14,
    marginTop: 2,
  },
  checkCircleActive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleInactive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  questionText: {
    fontSize: 14.5,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  copyButton: {
    padding: 4,
    marginLeft: 4,
    marginTop: 2,
  },
});
