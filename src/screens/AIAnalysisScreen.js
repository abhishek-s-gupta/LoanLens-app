import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { SCANNING_STEPS } from '../data/mockDocuments';
import { useDocumentContext } from '../context/DocumentContext';

export const AIAnalysisScreen = () => {
  const { theme, scanStep, cancelScanning } = useDocumentContext();

  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const spinAnim = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnim.start();

    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.08,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnim.start();

    return () => {
      spinAnim.stop();
      pulseAnim.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getDynamicHeadline = () => {
    switch (scanStep) {
      case 1:
        return 'Reading your document...';
      case 2:
        return 'Identifying financial clauses...';
      case 3:
        return 'Checking charges and penalties...';
      case 4:
        return 'Evaluating risk & exposure...';
      case 5:
        return 'Finalizing plain English summary...';
      default:
        return 'Reading your document...';
    }
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
      <Header
        title="AI Analysis"
        showBack={false}
        rightType="close"
        onRightPress={cancelScanning}
      />

      <View style={styles.content}>
        {/* Animated Circular Progress Indicator */}
        <View style={styles.circleWrapper}>
          <View style={[styles.circleOuterTrack, { backgroundColor: theme.isDark ? '#161D28' : '#E2E8F0', borderColor: theme.cardBorder }]}>
            <Animated.View
              style={[
                styles.circleArc,
                {
                  transform: [{ rotate: spin }],
                  borderTopColor: theme.isDark ? '#FFFFFF' : '#0F172A',
                },
              ]}
            />
            {/* Center Sparkle Badge */}
            <Animated.View
              style={[
                styles.circleCenterBadge,
                {
                  transform: [{ scale: pulseValue }],
                  backgroundColor: theme.isDark ? '#202938' : '#FFFFFF',
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Ionicons name="sparkles" size={28} color={theme.isDark ? '#FFFFFF' : '#0F172A'} />
            </Animated.View>
          </View>
        </View>

        {/* Dynamic Scan Headline & Subhead */}
        <Text style={[styles.headline, { color: theme.textPrimary }]}>{getDynamicHeadline()}</Text>
        <Text style={[styles.subhead, { color: theme.textSecondary }]}>LoanLens is identifying hidden risks</Text>

        {/* 5-Step Live Checklist Card */}
        <View style={[styles.checklistCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          {SCANNING_STEPS.map((step) => {
            const isCompleted = step.id < scanStep;
            const isCurrent = step.id === scanStep;
            const isPending = step.id > scanStep;

            return (
              <View key={step.id} style={styles.stepRow}>
                {/* Status Indicator */}
                <View style={styles.statusBox}>
                  {isCompleted && (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    </View>
                  )}
                  {isCurrent && (
                    <View style={[styles.spinnerBadge, { backgroundColor: theme.isDark ? '#1E3A8A' : '#3B82F6' }]}>
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    </View>
                  )}
                  {isPending && (
                    <View style={[styles.pendingCircle, { borderColor: theme.textMuted }]} />
                  )}
                </View>

                {/* Step Text Label */}
                <Text
                  style={[
                    styles.stepLabel,
                    isCompleted && { color: theme.textSecondary, fontWeight: '500' },
                    isCurrent && { color: theme.textPrimary, fontWeight: '700' },
                    isPending && { color: theme.textMuted, fontWeight: '400' },
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Bottom Encrypted Badge */}
        <View style={styles.footerShieldBox}>
          <View style={[styles.footerShieldPill, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <MaterialCommunityIcons name="shield-check" size={16} color={theme.textSecondary} style={{ marginRight: 6 }} />
            <Text style={[styles.footerShieldText, { color: theme.textSecondary }]}>End-to-end encrypted analysis</Text>
          </View>
          <Text style={[styles.footerDisclaimer, { color: theme.textMuted }]}>Your data is never shared with third parties.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 24,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  circleOuterTrack: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    position: 'relative',
  },
  circleArc: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 4,
    borderColor: 'transparent',
    borderRightColor: 'rgba(255, 255, 255, 0.4)',
  },
  circleCenterBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  headline: {
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  subhead: {
    fontSize: 13.5,
    textAlign: 'center',
    marginBottom: 28,
  },
  checklistCard: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statusBox: {
    width: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  completedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
  },
  stepLabel: {
    fontSize: 14,
  },
  footerShieldBox: {
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  footerShieldPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
  },
  footerShieldText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerDisclaimer: {
    fontSize: 11,
    fontWeight: '600',
  },
});
