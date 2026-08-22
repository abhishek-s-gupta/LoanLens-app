import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { useDocumentContext } from '../context/DocumentContext';

export const ProfileScreen = () => {
  const {
    theme,
    themeMode,
    setThemeMode,
    userProfile,
    updateUserProfile,
    securitySettings,
    toggleSecuritySetting,
    aiSettings,
    updateAiSetting,
    clearDocumentCache,
    showToast,
  } = useDocumentContext();

  // Edit Profile Modal State
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editPhone, setEditPhone] = useState(userProfile.phone);

  // Model Picker Modal State
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [levelModalVisible, setLevelModalVisible] = useState(false);

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      Alert.alert('Required', 'Please enter your name');
      return;
    }
    updateUserProfile({
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    });
    setEditModalVisible(false);
  };

  const handleClearCacheConfirm = () => {
    Alert.alert(
      'Clear Stored Documents',
      'This will remove cached OCR scans from local device storage. Encrypted backups remain safe.',
      [
        {
          text: 'Clear Cache',
          style: 'destructive',
          onPress: () => {
            clearDocumentCache();
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const modelsList = [
    {
      id: 'finbert-v3',
      name: 'LoanLens FinBERT v3.1 (High Precision)',
      desc: 'Deep legal and financial clause extraction with risk flagging.',
    },
    {
      id: 'finbert-turbo',
      name: 'LoanLens Turbo v2.0 (Fast)',
      desc: 'Optimized for quick summaries and instant question checklists.',
    },
  ];

  const levelsList = [
    {
      id: 'plain-8th',
      name: 'Plain English (8th Grade)',
      desc: 'Simple, jargon-free explanations anyone can understand.',
    },
    {
      id: 'bullets',
      name: 'Bullet Point Summary',
      desc: 'Concise, high-impact key takeaways.',
    },
    {
      id: 'legal-detailed',
      name: 'Detailed Legal Breakdown',
      desc: 'In-depth analysis for attorneys and real-estate advisors.',
    },
  ];

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
      <Header
        title="Profile & Settings"
        showBack={false}
        rightType="none"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= USER PROFILE CARD ================= */}
        <View style={[styles.userCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>
              {userProfile.name ? userProfile.name.slice(0, 2).toUpperCase() : 'AB'}
            </Text>
          </View>

          <View style={styles.userInfoCol}>
            <View style={styles.userNameRow}>
              <Text style={[styles.userName, { color: theme.textPrimary }]}>
                {userProfile.name}
              </Text>
              <TouchableOpacity
                style={styles.editProfileSmallBtn}
                onPress={() => {
                  setEditName(userProfile.name);
                  setEditEmail(userProfile.email);
                  setEditPhone(userProfile.phone);
                  setEditModalVisible(true);
                }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather name="edit-2" size={14} color="#5CB6A5" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
              {userProfile.email}
            </Text>

            <View style={styles.planBadge}>
              <Ionicons name="sparkles" size={11} color="#5CB6A5" style={{ marginRight: 4 }} />
              <Text style={styles.planBadgeText}>
                {userProfile.plan} • {userProfile.scansLimit} Analyses
              </Text>
            </View>
          </View>
        </View>

        {/* ================= THEME & APPEARANCE (DARK MODE) ================= */}
        <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
          Appearance & Theme
        </Text>
        <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          <Text style={[styles.themeSelectorLabel, { color: theme.textSecondary }]}>
            Color Theme
          </Text>

          {/* 3-Way Segmented Theme Selector */}
          <View style={styles.themeSegmentsRow}>
            {/* Dark Mode */}
            <TouchableOpacity
              style={[
                styles.themeSegmentBtn,
                themeMode === 'dark' && styles.themeSegmentActive,
              ]}
              onPress={() => {
                setThemeMode('dark');
                showToast('Dark theme activated 🌙');
              }}
              activeOpacity={0.8}
            >
              <Ionicons
                name="moon"
                size={16}
                color={themeMode === 'dark' ? '#FFFFFF' : '#8E9BAE'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.themeSegmentText,
                  themeMode === 'dark' && styles.themeSegmentTextActive,
                ]}
              >
                Dark
              </Text>
            </TouchableOpacity>

            {/* Light Mode */}
            <TouchableOpacity
              style={[
                styles.themeSegmentBtn,
                themeMode === 'light' && styles.themeSegmentActiveLight,
              ]}
              onPress={() => {
                setThemeMode('light');
                showToast('Light theme activated ☀️');
              }}
              activeOpacity={0.8}
            >
              <Ionicons
                name="sunny"
                size={16}
                color={themeMode === 'light' ? '#0F172A' : '#8E9BAE'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.themeSegmentText,
                  themeMode === 'light' && styles.themeSegmentTextActiveLight,
                ]}
              >
                Light
              </Text>
            </TouchableOpacity>

            {/* System Mode */}
            <TouchableOpacity
              style={[
                styles.themeSegmentBtn,
                themeMode === 'system' && styles.themeSegmentActive,
              ]}
              onPress={() => {
                setThemeMode('system');
                showToast('System theme activated ⚙️');
              }}
              activeOpacity={0.8}
            >
              <Ionicons
                name="settings-outline"
                size={15}
                color={themeMode === 'system' ? '#FFFFFF' : '#8E9BAE'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.themeSegmentText,
                  themeMode === 'system' && styles.themeSegmentTextActive,
                ]}
              >
                Auto
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= SECURITY & PRIVACY ================= */}
        <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
          Security & Privacy
        </Text>
        <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          {/* End to End Encryption */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextCol}>
              <View style={styles.settingTitleRow}>
                <Ionicons name="lock-closed-outline" size={16} color={theme.textPrimary} style={{ marginRight: 6 }} />
                <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
                  256-bit Encryption
                </Text>
              </View>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                All contract uploads are encrypted on-device
              </Text>
            </View>
            <Switch
              value={securitySettings.encryption}
              onValueChange={() => toggleSecuritySetting('encryption')}
              trackColor={{ false: '#334155', true: '#3B9384' }}
              thumbColor={securitySettings.encryption ? '#FFFFFF' : '#94A3B8'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          {/* Auto-Wipe */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextCol}>
              <View style={styles.settingTitleRow}>
                <Ionicons name="time-outline" size={16} color={theme.textPrimary} style={{ marginRight: 6 }} />
                <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
                  Auto-Wipe Scans
                </Text>
              </View>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                Purge processed contract data after 30 days
              </Text>
            </View>
            <Switch
              value={securitySettings.autoWipe30Days}
              onValueChange={() => toggleSecuritySetting('autoWipe30Days')}
              trackColor={{ false: '#334155', true: '#3B9384' }}
              thumbColor={securitySettings.autoWipe30Days ? '#FFFFFF' : '#94A3B8'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          {/* Biometric App Lock */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextCol}>
              <View style={styles.settingTitleRow}>
                <Ionicons name="finger-print-outline" size={16} color={theme.textPrimary} style={{ marginRight: 6 }} />
                <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
                  Biometric App Lock
                </Text>
              </View>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                Require Fingerprint/FaceID to open LoanLens
              </Text>
            </View>
            <Switch
              value={securitySettings.biometricLock}
              onValueChange={() => toggleSecuritySetting('biometricLock')}
              trackColor={{ false: '#334155', true: '#3B9384' }}
              thumbColor={securitySettings.biometricLock ? '#FFFFFF' : '#94A3B8'}
            />
          </View>
        </View>

        {/* ================= AI ANALYSIS ENGINE PREFERENCES ================= */}
        <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
          AI Analysis Engine
        </Text>
        <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          {/* Model Selection */}
          <TouchableOpacity
            style={styles.settingTouchRow}
            onPress={() => setModelModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.settingTextCol}>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
                AI Model
              </Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>
                {aiSettings.model}
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          {/* Translation Level */}
          <TouchableOpacity
            style={styles.settingTouchRow}
            onPress={() => setLevelModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.settingTextCol}>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
                Jargon Simplification Level
              </Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                {aiSettings.simplificationLevel}
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          {/* Auto Generate Negotiation Questions */}
          <View style={styles.settingRow}>
            <View style={styles.settingTextCol}>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
                Auto-Generate Negotiation Questions
              </Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                Create lender inquiry checklist automatically
              </Text>
            </View>
            <Switch
              value={aiSettings.autoQuestions}
              onValueChange={(val) => updateAiSetting('autoQuestions', val)}
              trackColor={{ false: '#334155', true: '#3B9384' }}
              thumbColor={aiSettings.autoQuestions ? '#FFFFFF' : '#94A3B8'}
            />
          </View>
        </View>

        {/* ================= STORAGE & CACHE ================= */}
        <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
          Storage & Cache
        </Text>
        <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          <TouchableOpacity
            style={styles.settingTouchRow}
            onPress={handleClearCacheConfirm}
            activeOpacity={0.7}
          >
            <View style={styles.settingTextCol}>
              <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
                Cached Scans & Temp OCR
              </Text>
              <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>
                {userProfile.scansUsed} documents scanned (4.8 MB local memory)
              </Text>
            </View>
            <Text style={styles.clearBtnText}>Clear Cache</Text>
          </TouchableOpacity>
        </View>

        {/* ================= HELP & POLICIES ================= */}
        <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>
          Support & Legal
        </Text>
        <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          <TouchableOpacity
            style={styles.settingTouchRow}
            onPress={() => showToast('LoanLens Legal Guidelines v1.0')}
            activeOpacity={0.7}
          >
            <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
              How LoanLens Evaluates Risk
            </Text>
            <Feather name="chevron-right" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          <TouchableOpacity
            style={styles.settingTouchRow}
            onPress={() => showToast('Zero data sold or shared')}
            activeOpacity={0.7}
          >
            <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
              Privacy Policy & Data Rights
            </Text>
            <Feather name="chevron-right" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          <TouchableOpacity
            style={styles.settingTouchRow}
            onPress={() => showToast('Support: help@loanlens.ai')}
            activeOpacity={0.7}
          >
            <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>
              Contact Loan Support
            </Text>
            <Feather name="chevron-right" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Footer Version Info */}
        <View style={styles.versionFooter}>
          <Text style={[styles.versionText, { color: theme.textMuted }]}>
            LoanLens v1.0.0 (SDK 52)
          </Text>
          <Text style={[styles.copyrightText, { color: theme.textMuted }]}>
            Protected by 256-bit AES Encryption • Zero Data Sold
          </Text>
        </View>
      </ScrollView>

      {/* ================= EDIT PROFILE MODAL ================= */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.editModalCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                Edit Profile
              </Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={22} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: theme.textSecondary }]}>Full Name</Text>
              <TextInput
                style={[styles.formInput, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.textPrimary }]}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter full name"
                placeholderTextColor="#64748B"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: theme.textSecondary }]}>Email Address</Text>
              <TextInput
                style={[styles.formInput, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.textPrimary }]}
                value={editEmail}
                onChangeText={setEditEmail}
                keyboardType="email-address"
                placeholder="Enter email"
                placeholderTextColor="#64748B"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: theme.textSecondary }]}>Phone Number</Text>
              <TextInput
                style={[styles.formInput, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.textPrimary }]}
                value={editPhone}
                onChangeText={setEditPhone}
                keyboardType="phone-pad"
                placeholder="Enter phone number"
                placeholderTextColor="#64748B"
              />
            </View>

            <TouchableOpacity
              style={styles.saveProfileBtn}
              onPress={handleSaveProfile}
              activeOpacity={0.88}
            >
              <Text style={styles.saveProfileBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODEL PICKER MODAL ================= */}
      <Modal
        visible={modelModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.editModalCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                Select AI Model
              </Text>
              <TouchableOpacity onPress={() => setModelModalVisible(false)}>
                <Ionicons name="close" size={22} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            {modelsList.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.pickerOptionCard,
                  { borderColor: aiSettings.model === m.name ? '#3B9384' : theme.cardBorder },
                ]}
                onPress={() => {
                  updateAiSetting('model', m.name);
                  setModelModalVisible(false);
                }}
              >
                <View style={styles.pickerTextCol}>
                  <Text style={[styles.pickerOptionTitle, { color: theme.textPrimary }]}>
                    {m.name}
                  </Text>
                  <Text style={[styles.pickerOptionDesc, { color: theme.textSecondary }]}>
                    {m.desc}
                  </Text>
                </View>
                {aiSettings.model === m.name && (
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* ================= LEVEL PICKER MODAL ================= */}
      <Modal
        visible={levelModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLevelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.editModalCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                Simplification Level
              </Text>
              <TouchableOpacity onPress={() => setLevelModalVisible(false)}>
                <Ionicons name="close" size={22} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            {levelsList.map((l) => (
              <TouchableOpacity
                key={l.id}
                style={[
                  styles.pickerOptionCard,
                  { borderColor: aiSettings.simplificationLevel === l.name ? '#3B9384' : theme.cardBorder },
                ]}
                onPress={() => {
                  updateAiSetting('simplificationLevel', l.name);
                  setLevelModalVisible(false);
                }}
              >
                <View style={styles.pickerTextCol}>
                  <Text style={[styles.pickerOptionTitle, { color: theme.textPrimary }]}>
                    {l.name}
                  </Text>
                  <Text style={[styles.pickerOptionDesc, { color: theme.textSecondary }]}>
                    {l.desc}
                  </Text>
                </View>
                {aiSettings.simplificationLevel === l.name && (
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    paddingTop: 14,
    paddingBottom: 36,
  },
  userCard: {
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  userInfoCol: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
  },
  editProfileSmallBtn: {
    padding: 4,
  },
  userEmail: {
    fontSize: 12.5,
    marginBottom: 6,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#132826',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(78, 154, 140, 0.3)',
  },
  planBadgeText: {
    color: '#5CB6A5',
    fontSize: 10.5,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 14.5,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 6,
  },
  settingsGroup: {
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
  },
  themeSelectorLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 10,
  },
  themeSegmentsRow: {
    flexDirection: 'row',
    backgroundColor: '#131822',
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
  },
  themeSegmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  themeSegmentActive: {
    backgroundColor: '#243042',
  },
  themeSegmentActiveLight: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  themeSegmentText: {
    color: '#8E9BAE',
    fontSize: 12.5,
    fontWeight: '600',
  },
  themeSegmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  themeSegmentTextActiveLight: {
    color: '#0F172A',
    fontWeight: '700',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingTouchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 11.5,
    lineHeight: 16,
  },
  divider: {
    height: 1,
  },
  clearBtnText: {
    color: '#EF4444',
    fontSize: 12.5,
    fontWeight: '700',
  },
  versionFooter: {
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 12,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  copyrightText: {
    fontSize: 11,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  editModalCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  formGroup: {
    marginBottom: 14,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  formInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
  },
  saveProfileBtn: {
    backgroundColor: '#1E3A8A',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  saveProfileBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  pickerOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
    backgroundColor: '#161D28',
  },
  pickerTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  pickerOptionTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  pickerOptionDesc: {
    fontSize: 11.5,
  },
});
