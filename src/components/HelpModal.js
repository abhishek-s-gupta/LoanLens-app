import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

export const HelpModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Ionicons name="sparkles" size={20} color={Colors.tealLight} style={styles.headerIcon} />
              <Text style={styles.title}>About LoanLens AI</Text>
            </View>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>
              LoanLens uses advanced financial NLP models to scan loan agreements, insurance contracts, and financial documents to uncover buried risks and simplify legal jargon.
            </Text>

            {/* Feature 1 */}
            <View style={styles.featureRow}>
              <View style={[styles.featureIconBox, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                <Ionicons name="cash-outline" size={20} color={Colors.success} />
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureTitle}>Hidden Charges Detection</Text>
                <Text style={styles.featureDesc}>Extracts penalty rates, upfront processing deductions, and compounding interest rules.</Text>
              </View>
            </View>

            {/* Feature 2 */}
            <View style={styles.featureRow}>
              <View style={[styles.featureIconBox, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                <Feather name="shield" size={18} color={Colors.danger} />
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureTitle}>Risky Clauses Flagging</Text>
                <Text style={styles.featureDesc}>Identifies auto-renewal lock-ins, unilateral modification terms, and early prepayment penalties.</Text>
              </View>
            </View>

            {/* Feature 3 */}
            <View style={styles.featureRow}>
              <View style={[styles.featureIconBox, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
                <Ionicons name="chatbubbles-outline" size={20} color={Colors.info} />
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureTitle}>Negotiation Checklist</Text>
                <Text style={styles.featureDesc}>Generates precise, lawyer-approved questions to ask your loan officer or insurer before signing.</Text>
              </View>
            </View>

            {/* Privacy Callout */}
            <View style={styles.privacyBox}>
              <Ionicons name="lock-closed" size={16} color={Colors.tealLight} style={{ marginRight: 8 }} />
              <Text style={styles.privacyText}>
                End-to-end encrypted. Your financial documents are never sold, indexed, or shared with third-party lenders.
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  body: {
    marginVertical: 14,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  featureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  featureTextCol: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  privacyBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(78, 154, 140, 0.12)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(78, 154, 140, 0.3)',
    marginTop: 8,
    alignItems: 'center',
  },
  privacyText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#0B0F17',
    fontSize: 14,
    fontWeight: '700',
  },
});
