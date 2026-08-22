import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { useDocumentContext } from '../context/DocumentContext';

export const HistoryScreen = () => {
  const {
    theme,
    historyList,
    setActiveDocument,
    navigateToScreen,
    showToast,
  } = useDocumentContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredDocs = historyList.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'ALL' || doc.riskLevel === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSelectDoc = (doc) => {
    setActiveDocument(doc);
    navigateToScreen('EXPLAIN');
    showToast(`Viewing ${doc.title}`);
  };

  const getRiskDotColor = (level) => {
    switch (level) {
      case 'High Risk':
        return '#EF4444';
      case 'Moderate Risk':
        return '#F59E0B';
      case 'Low Risk':
        return '#10B981';
      default:
        return '#F59E0B';
    }
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
      <Header
        title="Analysis History"
        showBack={true}
        onBack={() => navigateToScreen('ANALYZE')}
        rightType="filter"
        onRightPress={() => {
          setSelectedFilter((prev) => (prev === 'ALL' ? 'High Risk' : prev === 'High Risk' ? 'Moderate Risk' : 'ALL'));
        }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Summary Stats Row */}
        <View style={styles.statsRow}>
          {/* Total Analyzed Card */}
          <View style={[styles.statsCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <Text style={[styles.statsLabel, { color: theme.textSecondary }]}>Total Analyzed</Text>
            <View style={styles.statsValueRow}>
              <Text style={[styles.statsBigNumber, { color: theme.textPrimary }]}>12</Text>
              <Text style={[styles.statsUnit, { color: theme.textSecondary }]}>Documents</Text>
            </View>
          </View>

          {/* Avg Risk Score Card */}
          <View style={[styles.statsCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <Text style={[styles.statsLabel, { color: theme.textSecondary }]}>Avg. Risk Score</Text>
            <View style={styles.statsValueRow}>
              <Text style={[styles.statsBigNumber, { color: theme.textPrimary }]}>64</Text>
              <Text style={[styles.statsScoreUnit, { color: theme.textSecondary }]}>/ 100</Text>
            </View>
          </View>
        </View>

        {/* Filter / Search Bar */}
        <View style={styles.searchRow}>
          <View style={[styles.searchBox, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
            <Feather name="search" size={16} color={theme.textMuted} style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.searchInput, { color: theme.textPrimary }]}
              placeholder="Search past analyses..."
              placeholderTextColor={theme.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color={theme.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* History Document Cards List */}
        {filteredDocs.map((doc) => (
          <TouchableOpacity
            key={doc.id}
            style={[styles.docCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}
            activeOpacity={0.8}
            onPress={() => handleSelectDoc(doc)}
          >
            {/* Header: Title & Score Badge */}
            <View style={styles.docHeaderRow}>
              <Text style={[styles.docTitle, { color: theme.textPrimary }]} numberOfLines={1}>
                {doc.title}
              </Text>
              <View style={[styles.scoreBadge, { backgroundColor: theme.isDark ? '#131822' : '#F1F5F9', borderColor: theme.cardBorder }]}>
                <Text style={[styles.scoreBadgeText, { color: theme.textPrimary }]}>{doc.riskScore}/100</Text>
              </View>
            </View>

            {/* Date */}
            <Text style={[styles.docDate, { color: theme.textMuted }]}>{doc.date}</Text>

            {/* Footer Row: Risk Dot & Flags Count */}
            <View style={styles.docFooterRow}>
              <View style={styles.riskStatusRow}>
                <View
                  style={[
                    styles.riskDot,
                    { backgroundColor: getRiskDotColor(doc.riskLevel) },
                  ]}
                />
                <Text style={[styles.riskStatusText, { color: theme.textSecondary }]}>{doc.riskLevel}</Text>
              </View>

              <View style={styles.flagsRow}>
                <Ionicons name="warning" size={13} color={theme.textMuted} style={{ marginRight: 4 }} />
                <Text style={[styles.flagsText, { color: theme.textMuted }]}>{doc.flagsFound} Flags Found</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Bottom Archive Footer */}
        <View style={styles.archiveFooter}>
          <Feather name="archive" size={28} color={theme.isDark ? '#334155' : '#CBD5E1'} style={{ marginBottom: 8 }} />
          <Text style={[styles.archiveFooterText, { color: theme.textMuted }]}>Showing all past analyses</Text>
        </View>
      </ScrollView>
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsCard: {
    flex: 0.48,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },
  statsLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  statsValueRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  statsBigNumber: {
    fontSize: 22,
    fontWeight: '800',
  },
  statsUnit: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: -2,
  },
  statsScoreUnit: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: -2,
  },
  searchRow: {
    marginBottom: 16,
  },
  searchBox: {
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  docCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  docHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  docTitle: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '700',
    marginRight: 8,
  },
  scoreBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  docDate: {
    fontSize: 11.5,
    marginBottom: 14,
  },
  docFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  riskStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  riskStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  flagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagsText: {
    fontSize: 11.5,
    fontWeight: '500',
  },
  archiveFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    marginTop: 8,
  },
  archiveFooterText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
