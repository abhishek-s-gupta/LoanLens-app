import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SAMPLE_DOCUMENTS } from '../data/mockDocuments';
import { DarkTheme, LightTheme } from '../theme/colors';

const DocumentContext = createContext(null);

export const DocumentProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  
  // Theme state: 'dark' | 'light' | 'system'
  const [themeMode, setThemeMode] = useState('dark');

  // Compute active theme colors
  const activeTheme =
    themeMode === 'system'
      ? systemColorScheme === 'light'
        ? LightTheme
        : DarkTheme
      : themeMode === 'light'
      ? LightTheme
      : DarkTheme;

  // Screens: 'ANALYZE' | 'SCANNING' | 'EXPLAIN' | 'QUESTIONS' | 'HISTORY' | 'PROFILE'
  const [currentScreen, setCurrentScreen] = useState('ANALYZE');
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'history' | 'profile'
  
  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: 'Abhishek',
    email: 'abhishek@loanlens.ai',
    phone: '+91 98765 43210',
    plan: 'Pro Plan',
    memberSince: 'Oct 2023',
    scansUsed: 12,
    scansLimit: 'Unlimited',
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    encryption: true,
    biometricLock: false,
    autoWipe30Days: true,
    shareAnalytics: false,
  });

  // AI Model Settings
  const [aiSettings, setAiSettings] = useState({
    model: 'LoanLens FinBERT v3.1 (High Precision)',
    simplificationLevel: 'Plain English (8th Grade)',
    autoQuestions: true,
  });

  // History & Active Document
  const [historyList, setHistoryList] = useState(SAMPLE_DOCUMENTS);
  const [activeDocument, setActiveDocument] = useState(SAMPLE_DOCUMENTS[0]);
  
  // Form input state
  const [pastedText, setPastedText] = useState(SAMPLE_DOCUMENTS[0].rawText);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [selectedFileInfo, setSelectedFileInfo] = useState(null);
  
  // AI Scanning state
  const [scanStep, setScanStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  
  // Questions checklist state
  const [checkedQuestions, setCheckedQuestions] = useState({
    q1: true,
    qc1: true,
    qcc1: true,
    qpl2: true,
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const updateUserProfile = (newInfo) => {
    setUserProfile((prev) => ({ ...prev, ...newInfo }));
    showToast('Profile updated successfully');
  };

  const toggleSecuritySetting = (key) => {
    setSecuritySettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast(`${key === 'encryption' ? '256-bit Encryption' : key === 'autoWipe30Days' ? 'Auto-Wipe' : 'Setting'} ${updated[key] ? 'Enabled' : 'Disabled'}`);
      return updated;
    });
  };

  const updateAiSetting = (key, value) => {
    setAiSettings((prev) => ({ ...prev, [key]: value }));
    showToast('AI Model preference saved');
  };

  const clearDocumentCache = () => {
    showToast('Local document cache cleared');
  };

  const toggleQuestion = (id) => {
    setCheckedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const loadSampleDocument = (doc) => {
    setActiveDocument(doc);
    setPastedText(doc.rawText);
    setSelectedFileName(null);
    setSelectedImageUri(null);
    setSelectedFileInfo(null);
  };

  const clearSelectedFile = () => {
    setSelectedFileName(null);
    setSelectedImageUri(null);
    setSelectedFileInfo(null);
  };

  const clearPastedText = () => {
    setPastedText('');
  };

  const startAnalysis = (customText = null, customFile = null) => {
    const textToAnalyze = customText !== null ? customText : pastedText;
    const fileName = customFile || selectedFileName;
    
    let matched = historyList.find(
      (d) => (textToAnalyze && d.rawText.trim() === textToAnalyze.trim()) || (fileName && d.title.toLowerCase().includes(fileName.toLowerCase()))
    );

    if (!matched) {
      const docTitle = fileName || (textToAnalyze.slice(0, 24).trim() ? textToAnalyze.slice(0, 24).trim() + '...' : 'Uploaded Contract Scan');
      matched = {
        id: 'doc-' + Date.now(),
        title: docTitle,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        riskScore: Math.floor(Math.random() * 25) + 60,
        riskLevel: 'Moderate Risk',
        riskColor: '#F59E0B',
        flagsFound: 3,
        type: fileName ? (fileName.endsWith('.pdf') ? 'PDF Document' : 'Image Scan') : 'Agreement',
        rawText: textToAnalyze || `Analyzed content from file: ${docTitle}`,
        clauses: [
          {
            id: 'dyn-c1',
            tag: 'LATE PAYMENT CLAUSE',
            tagIcon: 'alert-circle',
            tagColor: '#F59E0B',
            title: textToAnalyze.slice(0, 140) || 'In the event of a default beyond the due date, a penalty interest of 24% per annum shall be levied on the outstanding balance, compounded monthly.',
            quote: textToAnalyze.slice(0, 140) || 'in the event of a default in the payment of any installment beyond the due date, a penalty interest shall be levied monthly...',
            takeawaySnippet: 'If you miss a payment, compound penalties & extra 2% monthly apply...',
            plainEnglish: 'If you miss a payment, they charge you an extra 2% every month on top of your usual interest. It adds up fast.',
            category: 'Late Payment Clause',
          },
          {
            id: 'dyn-c2',
            tag: 'AUTO-RENEWAL',
            tagIcon: 'refresh-cw',
            tagColor: '#F59E0B',
            title: 'This agreement automatically renews for 12 months unless written termination notice is given 30 days before expiration.',
            quote: 'This agreement shall automatically renew for an additional term unless written notice is provided 30 days prior...',
            takeawaySnippet: 'The contract extends automatically for 1 year unless you notify 30 days prior...',
            plainEnglish: 'The loan automatically extends for another year unless you tell them you\'re leaving at least a month before it ends.',
            category: 'Renewal Terms',
          },
          {
            id: 'dyn-c3',
            tag: 'PROCESSING FEE',
            tagIcon: 'credit-card',
            tagColor: '#EF4444',
            title: 'A non-refundable processing fee shall be deducted at the source of disbursement irrespective of loan approval status.',
            quote: 'A non-refundable processing fee shall be deducted at the source of disbursement irrespective of final status...',
            takeawaySnippet: 'You pay a non-refundable upfront setup fee just for applying...',
            plainEnglish: 'You have to pay a setup fee just for applying. Even if the loan doesn\'t go through, you don\'t get this money back.',
            category: 'Processing Fee',
          },
        ],
        insight: {
          title: 'LoanLens Insight',
          text: 'You can often negotiate to remove \'Auto-Renewal\' clauses. It\'s a standard request that lenders usually grant if you ask firmly.',
        },
        questions: [
          {
            id: 'dyn-q1',
            question: 'Is the 24% penalty interest calculated daily or monthly?',
            clauseTag: 'Late Payment Clause',
            checked: true,
          },
          {
            id: 'dyn-q2',
            question: 'Can I opt-out of the 12-month auto-renewal?',
            clauseTag: 'Renewal Terms',
            checked: false,
          },
          {
            id: 'dyn-q3',
            question: 'Under what conditions is the 2.5% fee refundable?',
            clauseTag: 'Processing Fee',
            checked: false,
          },
          {
            id: 'dyn-q4',
            question: 'Are there any hidden administrative charges?',
            clauseTag: 'General Terms',
            checked: false,
          },
        ],
      };
      
      setHistoryList((prev) => [matched, ...prev]);
    }

    setActiveDocument(matched);
    setIsScanning(true);
    setScanStep(1);
    setCurrentScreen('SCANNING');
  };

  useEffect(() => {
    let interval;
    if (isScanning && currentScreen === 'SCANNING') {
      interval = setInterval(() => {
        setScanStep((prev) => {
          if (prev < 5) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setIsScanning(false);
              setCurrentScreen('EXPLAIN');
            }, 700);
            return 5;
          }
        });
      }, 750);
    }
    return () => clearInterval(interval);
  }, [isScanning, currentScreen]);

  const cancelScanning = () => {
    setIsScanning(false);
    setScanStep(1);
    setCurrentScreen('ANALYZE');
  };

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    if (screen === 'ANALYZE' || screen === 'EXPLAIN' || screen === 'QUESTIONS') {
      setActiveTab('home');
    } else if (screen === 'HISTORY') {
      setActiveTab('history');
    } else if (screen === 'PROFILE') {
      setActiveTab('profile');
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('ANALYZE');
    } else if (tab === 'history') {
      setCurrentScreen('HISTORY');
    } else if (tab === 'profile') {
      setCurrentScreen('PROFILE');
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        theme: activeTheme,
        themeMode,
        setThemeMode,
        userProfile,
        updateUserProfile,
        securitySettings,
        toggleSecuritySetting,
        aiSettings,
        updateAiSetting,
        clearDocumentCache,
        currentScreen,
        setCurrentScreen,
        activeTab,
        switchTab,
        navigateToScreen,
        historyList,
        activeDocument,
        setActiveDocument,
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
        scanStep,
        isScanning,
        checkedQuestions,
        toggleQuestion,
        loadSampleDocument,
        startAnalysis,
        cancelScanning,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
};
