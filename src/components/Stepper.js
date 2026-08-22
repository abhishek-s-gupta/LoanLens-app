import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

export const Stepper = ({ currentStep = 1 }) => {
  // currentStep: 1 (Upload), 2 (Analyze), 3 (Results)
  return (
    <View style={styles.container}>
      {/* Step 1 */}
      <View style={styles.stepItem}>
        <View
          style={[
            styles.dot,
            currentStep >= 1 ? styles.dotActive : styles.dotInactive,
          ]}
        />
        <Text
          style={[
            styles.stepLabel,
            currentStep >= 1 ? styles.labelActive : styles.labelInactive,
          ]}
        >
          Upload
        </Text>
      </View>

      {/* Connecting Line 1-2 */}
      <View
        style={[
          styles.line,
          currentStep >= 2 ? styles.lineActive : styles.lineInactive,
        ]}
      />

      {/* Step 2 */}
      <View style={styles.stepItem}>
        <View
          style={[
            styles.dot,
            currentStep >= 2 ? styles.dotActive : styles.dotInactive,
          ]}
        />
        <Text
          style={[
            styles.stepLabel,
            currentStep >= 2 ? styles.labelActive : styles.labelInactive,
          ]}
        >
          Analyze
        </Text>
      </View>

      {/* Connecting Line 2-3 */}
      <View
        style={[
          styles.line,
          currentStep >= 3 ? styles.lineActive : styles.lineInactive,
        ]}
      />

      {/* Step 3 */}
      <View style={styles.stepItem}>
        <View
          style={[
            styles.dot,
            currentStep >= 3 ? styles.dotActive : styles.dotInactive,
          ]}
        />
        <Text
          style={[
            styles.stepLabel,
            currentStep >= 3 ? styles.labelActive : styles.labelInactive,
          ]}
        >
          Results
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: Colors.background,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    backgroundColor: '#374151',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  labelActive: {
    color: '#FFFFFF',
  },
  labelInactive: {
    color: '#6B7280',
  },
  line: {
    flex: 1,
    height: 1,
    marginHorizontal: 12,
  },
  lineActive: {
    backgroundColor: '#4B5563',
  },
  lineInactive: {
    backgroundColor: '#262E3B',
  },
});
