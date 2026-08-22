# 🔍 LoanLens — AI Financial & Legal Contract Analyzer

LoanLens is a modern, high-fidelity dark-mode React Native (Expo) mobile application designed to scan, translate, and unpack complex loan agreements, insurance contracts, credit card policies, and legal clauses into plain English.

---

## 📱 Features & Screens

1. **📄 Analyze Document Screen (`AnalyzeDocumentScreen`)**
   - Upload PDF or Photo contract files.
   - Paste contract text with sample presets (*HDFC Home Loan*, *Car Insurance*, *Credit Card Terms*, *Sanction Letter*).
   - Instant 1-tap AI Analysis with `✦ Analyze with LoanLens`.
   - Security guarantee banner (*End-to-End 256-bit Encrypted*).
   - 2x2 Feature overview: *Hidden Charges*, *Risky Clauses*, *Smart Questions*, and *Simple Words*.

2. **⚡ AI Analysis Scanning Screen (`AIAnalysisScreen`)**
   - Animated glowing circular scanning ring with pulse animation.
   - Dynamic real-time scanner headlines (*Reading document*, *Evaluating risk*, *Finalizing plain English summary*).
   - Live 5-stage status checklist tracking every step of the legal analysis.

3. **💡 Explain It Simply Screen (`ExplainSimplyScreen`)**
   - Plain English translations of dense legal jargon (*"No Jargon, Just Clarity"*).
   - Structured clause cards with category badges:
     - `LATE PAYMENT CLAUSE`: 24% p.a. compound penalty explained as 2%/month additional interest.
     - `AUTO-RENEWAL`: 12-month auto-extension notice period explained clearly.
     - `PROCESSING FEE`: Non-refundable upfront deduction breakdown.
   - **LoanLens Insight**: Negotiation advisory tips for contract renegotiation.

4. **📋 Ask Before You Sign Screen (`AskQuestionsScreen`)**
   - AI-generated negotiation checklist for borrowers.
   - Interactive question checklist with checkmark toggles and copy-to-clipboard functionality.
   - `📥 Export PDF` and `✈ Share Advice` actions.
   - Lawyer-approved clarity advice banner.

5. **📊 Analysis History Dashboard (`HistoryScreen`)**
   - Document metrics: Total Analyzed (12 Documents) and Average Risk Score (64/100).
   - Real-time search and risk severity filter (High Risk, Moderate Risk, Low Risk).
   - Click any document to view its specific breakdown and questions.
   - Bottom Tab Navigation (`Home`, `History`, `Profile`).

6. **⚙️ Profile & Security Screen (`ProfileScreen`)**
   - Account overview with Pro Plan status.
   - Security toggles for End-to-End Encryption and 30-day Auto-Wipe.
   - Model selection: *LoanLens FinBERT v3.1*.
   - Local document cache manager.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- Expo CLI (`npm install -g expo-cli` or using `npx expo`)

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run the App
- **Web Browser**:
  ```bash
  npm run web
  ```
- **Android Emulator / Device**:
  ```bash
  npm run android
  ```
- **iOS Simulator / Device**:
  ```bash
  npm run ios
  ```
- **Expo Go (Scan QR code on your physical phone)**:
  ```bash
  npx expo start
  ```

---

## 📁 Project Structure

```
loanlens-app/
├── App.js                         # Root navigation & state container
├── app.json                       # Expo dark-mode app configuration
├── package.json                   # Dependencies & build scripts
├── README.md                      # Documentation
└── src/
    ├── components/
    │   ├── BottomTabBar.js        # Home / History / Profile 3-tab navigation
    │   ├── ClauseCard.js          # Legal clause + plain English translation card
    │   ├── Header.js              # Top navigation bar with actions & icons
    │   ├── HelpModal.js           # Security & methodology explainer modal
    │   ├── QuestionItem.js        # Interactive checklist item with copy & check actions
    │   ├── Stepper.js             # Upload / Analyze / Results progress stepper
    │   └── Toast.js               # Global action feedback toast
    ├── context/
    │   └── DocumentContext.js     # State provider for scan engine, active docs & history
    ├── data/
    │   └── mockDocuments.js       # Structured legal clauses, risk scores & templates
    ├── screens/
    │   ├── AIAnalysisScreen.js      # Scanning progress & animated circular ring
    │   ├── AnalyzeDocumentScreen.js # Upload & contract text input
    │   ├── AskQuestionsScreen.js    # AI negotiation checklist & export
    │   ├── ExplainSimplyScreen.js   # Clause breakdown & plain English translations
    │   ├── HistoryScreen.js         # Analysis history dashboard & risk scores
    │   └── ProfileScreen.js         # Security, privacy settings & cache manager
    └── theme/
        └── colors.js              # Dark mode fintech color tokens & typography
```
