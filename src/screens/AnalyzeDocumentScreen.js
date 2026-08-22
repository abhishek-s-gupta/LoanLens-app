import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import { Header } from '../components/Header';
import { HelpModal } from '../components/HelpModal';
import { HOW_IT_HELPS_ITEMS, SAMPLE_DOCUMENTS } from '../data/mockDocuments';
import { useDocumentContext } from '../context/DocumentContext';

export const AnalyzeDocumentScreen = () => {
  const {
    theme,
    pastedText,
    setPastedText,
    selectedFileName,
    setSelectedFileName,
    selectedImageUri,
    setSelectedImageUri,
    selectedFileInfo,
    setSelectedFileInfo,
    clearSelectedFile,
    clearPastedText,
    startAnalysis,
    loadSampleDocument,
    showToast,
  } = useDocumentContext();

  const [activeSegment, setActiveSegment] = useState('UPLOAD'); // 'UPLOAD' | 'PASTE'
  const [helpVisible, setHelpVisible] = useState(false);

  // Directly launches native system file/document picker
  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['*/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const isImg = file.mimeType?.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);
        
        setSelectedFileName(file.name);
        setSelectedImageUri(isImg ? file.uri : null);
        setSelectedFileInfo({
          name: file.name,
          uri: file.uri,
          size: file.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '1.8 MB',
          type: isImg ? 'image' : 'pdf',
        });
        showToast(`Selected ${file.name}`);
      }
    } catch (error) {
      console.log('Error opening native file picker:', error);
      handlePickFromGallery();
    }
  };

  // Directly launches native gallery photo picker
  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.9,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileName = asset.fileName || `document_scan_${Date.now().toString().slice(-4)}.jpg`;
        setSelectedFileName(fileName);
        setSelectedImageUri(asset.uri);
        setSelectedFileInfo({
          name: fileName,
          uri: asset.uri,
          size: asset.fileSize ? `${(asset.fileSize / (1024 * 1024)).toFixed(2)} MB` : '1.4 MB',
          type: 'image',
        });
        showToast(`Selected ${fileName}`);
      }
    } catch (err) {
      showToast('Could not open photos');
    }
  };

  // Paste from Device Clipboard
  const handlePasteFromClipboard = async () => {
    try {
      const content = await Clipboard.getStringAsync();
      if (content && content.trim().length > 0) {
        setPastedText(content);
        setActiveSegment('PASTE');
        showToast('Pasted from clipboard!');
      } else {
        showToast('Clipboard is empty');
      }
    } catch (error) {
      showToast('Could not read clipboard');
    }
  };

  // Copy current text to clipboard
  const handleCopyCurrentText = async () => {
    if (pastedText && pastedText.trim().length > 0) {
      await Clipboard.setStringAsync(pastedText);
      showToast('Text copied to clipboard');
    } else {
      showToast('No text to copy');
    }
  };

  const handleAnalyze = () => {
    if (activeSegment === 'UPLOAD' && !selectedFileName && !selectedImageUri) {
      Alert.alert(
        'No File Selected',
        'Please select a document/photo from your device or load a sample contract.',
        [
          { text: 'Browse File', onPress: handleSelectFile },
          {
            text: 'Load Sample',
            onPress: () => {
              setSelectedFileName('HDFC_Home_Loan_Agreement.pdf');
              loadSampleDocument(SAMPLE_DOCUMENTS[0]);
              showToast('Loaded sample agreement');
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
      return;
    }

    if (activeSegment === 'PASTE' && !pastedText?.trim()) {
      Alert.alert('Empty Text', 'Please paste or type agreement text to analyze.');
      return;
    }

    startAnalysis(activeSegment === 'PASTE' ? pastedText : null, selectedFileName);
  };

  const renderFeatureIcon = (item) => {
    if (item.iconType === 'ionicon') {
      return <Ionicons name={item.icon} size={22} color={item.color} />;
    }
    return <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />;
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
      <Header
        title="LoanLens"
        showBack={false}
        rightType="help"
        onRightPress={() => setHelpVisible(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Headline Block */}
        <View style={styles.heroBlock}>
          <Text style={styles.appTagline}>Samjho Jo Sign Karo</Text>
          <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>Analyze a document</Text>
          <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
            Upload a loan agreement or paste its text. LoanLens reads it, scores the risk and explains every flag in plain language.
          </Text>
        </View>

        {/* Segmented Switcher (Upload file vs Paste Text Instead) */}
        <View style={[styles.segmentContainer, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'UPLOAD' && (theme.isDark ? styles.segmentTabActiveDark : styles.segmentTabActiveLight),
            ]}
            onPress={() => setActiveSegment('UPLOAD')}
            activeOpacity={0.8}
          >
            <Feather
              name="upload"
              size={15}
              color={activeSegment === 'UPLOAD' ? theme.textPrimary : theme.textMuted}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.segmentText,
                { color: activeSegment === 'UPLOAD' ? theme.textPrimary : theme.textMuted },
                activeSegment === 'UPLOAD' && { fontWeight: '700' },
              ]}
            >
              Upload file
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'PASTE' && (theme.isDark ? styles.segmentTabActiveDark : styles.segmentTabActiveLight),
            ]}
            onPress={() => setActiveSegment('PASTE')}
            activeOpacity={0.8}
          >
            <Feather
              name="file-text"
              size={15}
              color={activeSegment === 'PASTE' ? theme.textPrimary : theme.textMuted}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.segmentText,
                { color: activeSegment === 'PASTE' ? theme.textPrimary : theme.textMuted },
                activeSegment === 'PASTE' && { fontWeight: '700' },
              ]}
            >
              Paste Text Instead
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Card based on selected segment */}
        {activeSegment === 'UPLOAD' ? (
          /* =================== UPLOAD DROPZONE CARD =================== */
          <View style={[styles.dropzoneCard, { backgroundColor: theme.cardSurface, borderColor: theme.cardBorder }]}>
            {selectedImageUri ? (
              // Selected Image Preview
              <View style={[styles.selectedFileBox, { backgroundColor: theme.isDark ? '#161D28' : '#F1F5F9' }]}>
                <Image source={{ uri: selectedImageUri }} style={styles.fileThumbnail} />
                <View style={styles.fileDetailsCol}>
                  <Text style={[styles.selectedFileNameText, { color: theme.textPrimary }]} numberOfLines={1}>
                    {selectedFileName}
                  </Text>
                  <Text style={[styles.selectedFileSizeText, { color: theme.textSecondary }]}>
                    {selectedFileInfo?.size || 'Image Ready'}
                  </Text>
                  <View style={styles.fileActionsRow}>
                    <TouchableOpacity
                      style={styles.changeBtn}
                      onPress={handleSelectFile}
                    >
                      <Text style={styles.changeBtnText}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={clearSelectedFile}
                    >
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : selectedFileName ? (
              // Selected PDF Preview
              <View style={[styles.selectedFileBox, { backgroundColor: theme.isDark ? '#161D28' : '#F1F5F9' }]}>
                <View style={styles.pdfBadge}>
                  <Ionicons name="document-text" size={28} color="#FFFFFF" />
                </View>
                <View style={styles.fileDetailsCol}>
                  <Text style={[styles.selectedFileNameText, { color: theme.textPrimary }]} numberOfLines={1}>
                    {selectedFileName}
                  </Text>
                  <Text style={[styles.selectedFileSizeText, { color: theme.textSecondary }]}>
                    {selectedFileInfo?.size || 'Document Ready'}
                  </Text>
                  <View style={styles.fileActionsRow}>
                    <TouchableOpacity
                      style={styles.changeBtn}
                      onPress={handleSelectFile}
                    >
                      <Text style={styles.changeBtnText}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={clearSelectedFile}
                    >
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              // Empty Dropzone State
              <TouchableOpacity
                style={[
                  styles.dropzoneDashedBox,
                  {
                    backgroundColor: theme.isDark ? '#131924' : '#F8FAFC',
                    borderColor: theme.isDark ? '#334155' : '#CBD5E1',
                  },
                ]}
                activeOpacity={0.7}
                onPress={handleSelectFile}
              >
                <View style={styles.uploadIconCircle}>
                  <Feather name="upload" size={22} color="#3B857A" />
                </View>

                <Text style={[styles.dropzoneTitle, { color: theme.textPrimary }]}>
                  Drag & drop your document here
                </Text>
                <Text style={[styles.dropzoneSubtitle, { color: theme.textSecondary }]}>
                  PDF, JPG or PNG · up to 15 MB
                </Text>

                <TouchableOpacity
                  style={[styles.selectFilePill, { backgroundColor: theme.isDark ? '#242F40' : '#1E293B' }]}
                  activeOpacity={0.85}
                  onPress={handleSelectFile}
                >
                  <Text style={styles.selectFilePillText}>Select File</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}

            {/* Quick Sample File Chips */}
            <View style={styles.sampleFilesRow}>
              <Text style={[styles.sampleLabel, { color: theme.textSecondary }]}>Or test with sample:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                {SAMPLE_DOCUMENTS.map((doc) => (
                  <TouchableOpacity
                    key={doc.id}
                    style={[styles.sampleChip, { backgroundColor: theme.chipBg, borderColor: theme.chipBorder }]}
                    onPress={() => {
                      setSelectedFileName(`${doc.title.replace(/\s+/g, '_')}.pdf`);
                      loadSampleDocument(doc);
                      showToast(`Loaded ${doc.title}`);
                    }}
                  >
                    <Ionicons name="document-text-outline" size={13} color={theme.chipText} style={{ marginRight: 4 }} />
                    <Text style={[styles.sampleChipText, { color: theme.chipText }]}>{doc.type}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : (
          /* =================== PASTE TEXT CARD =================== */
          <View style={[styles.pasteCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
            <View style={styles.pasteHeaderRow}>
              <Text style={[styles.pasteLabel, { color: theme.textPrimary }]}>Paste document text below</Text>
              
              <View style={styles.clipboardActionsRow}>
                <TouchableOpacity
                  style={[styles.clipActionBtn, { backgroundColor: theme.isDark ? '#2A3649' : '#E2E8F0' }]}
                  onPress={handlePasteFromClipboard}
                  activeOpacity={0.7}
                >
                  <Feather name="clipboard" size={14} color="#5CB6A5" style={{ marginRight: 4 }} />
                  <Text style={styles.clipActionText}>Paste</Text>
                </TouchableOpacity>

                {pastedText?.length > 0 && (
                  <TouchableOpacity
                    style={[styles.clipActionBtn, { backgroundColor: theme.isDark ? '#2A3649' : '#E2E8F0' }]}
                    onPress={handleCopyCurrentText}
                    activeOpacity={0.7}
                  >
                    <Feather name="copy" size={13} color={theme.textSecondary} style={{ marginRight: 4 }} />
                    <Text style={[styles.clipActionTextMuted, { color: theme.textSecondary }]}>Copy</Text>
                  </TouchableOpacity>
                )}

                {pastedText?.length > 0 && (
                  <TouchableOpacity
                    style={[styles.clipActionBtn, { backgroundColor: theme.isDark ? '#2A3649' : '#E2E8F0' }]}
                    onPress={clearPastedText}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close-circle-outline" size={15} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <TextInput
              style={[styles.textArea, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.textPrimary }]}
              multiline
              numberOfLines={7}
              placeholder="Paste loan agreement, insurance policy, credit card terms..."
              placeholderTextColor={theme.textMuted}
              value={pastedText}
              onChangeText={setPastedText}
              textAlignVertical="top"
            />

            {/* Quick Sample Presets */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetsRow}>
              {SAMPLE_DOCUMENTS.map((doc) => (
                <TouchableOpacity
                  key={doc.id}
                  style={[styles.presetChip, { backgroundColor: theme.chipBg, borderColor: theme.chipBorder }]}
                  onPress={() => {
                    loadSampleDocument(doc);
                    showToast(`Loaded ${doc.title}`);
                  }}
                >
                  <Text style={[styles.presetChipText, { color: theme.chipText }]}>{doc.title.split(' - ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Prominent Action CTA Button */}
        <TouchableOpacity
          style={[styles.analyzeButton, { backgroundColor: theme.buttonPrimaryBg }]}
          onPress={handleAnalyze}
          activeOpacity={0.88}
        >
          <Ionicons name="sparkles" size={17} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.analyzeButtonText}>Analyze with LoanLens</Text>
        </TouchableOpacity>

        {/* Security Footer Banner */}
        <View style={styles.securityRow}>
          <Ionicons name="lock-closed" size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
          <Text style={[styles.securityText, { color: theme.textMuted }]}>Your document is analyzed securely.</Text>
        </View>

        {/* How It Helps You Section */}
        <Text style={[styles.sectionHeader, { color: theme.textPrimary }]}>How it helps you</Text>
        <View style={styles.gridContainer}>
          {HOW_IT_HELPS_ITEMS.map((item) => (
            <View key={item.id} style={[styles.gridCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
              <View style={[styles.gridIconBox, { backgroundColor: item.bgColor }]}>
                {renderFeatureIcon(item)}
              </View>
              <Text style={[styles.gridTitle, { color: theme.textPrimary }]}>{item.title}</Text>
              <Text style={[styles.gridSubtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

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
    paddingTop: 12,
    paddingBottom: 36,
  },
  heroBlock: {
    marginBottom: 18,
  },
  appTagline: {
    color: '#5CB6A5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  segmentContainer: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
  },
  segmentTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  segmentTabActiveDark: {
    backgroundColor: '#243042',
  },
  segmentTabActiveLight: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
  },
  dropzoneCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  dropzoneDashedBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dropzoneTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  dropzoneSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 16,
  },
  selectFilePill: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 20,
  },
  selectFilePillText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  selectedFileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
  },
  fileThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: 12,
  },
  pdfBadge: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#3B857A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fileDetailsCol: {
    flex: 1,
  },
  selectedFileNameText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  selectedFileSizeText: {
    fontSize: 11.5,
    marginBottom: 6,
  },
  fileActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeBtn: {
    marginRight: 14,
  },
  changeBtnText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '700',
  },
  removeBtn: {},
  removeBtnText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
  },
  sampleFilesRow: {
    marginTop: 14,
  },
  sampleLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    marginBottom: 6,
  },
  chipsScroll: {
    flexDirection: 'row',
  },
  sampleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
  },
  sampleChipText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  pasteCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  pasteHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pasteLabel: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  clipboardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clipActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 6,
  },
  clipActionText: {
    color: '#5CB6A5',
    fontSize: 11.5,
    fontWeight: '700',
  },
  clipActionTextMuted: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  textArea: {
    borderRadius: 14,
    padding: 14,
    fontSize: 13.5,
    lineHeight: 20,
    minHeight: 130,
    borderWidth: 1,
  },
  presetsRow: {
    marginTop: 10,
    flexDirection: 'row',
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
    borderWidth: 1,
  },
  presetChipText: {
    fontSize: 11.5,
    fontWeight: '500',
  },
  analyzeButton: {
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  securityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  gridIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  gridTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  gridSubtitle: {
    fontSize: 11,
  },
});
