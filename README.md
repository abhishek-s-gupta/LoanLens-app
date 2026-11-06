# ✦ LoanLens
### Understand Every Clause. Protect Every Decision.

<p align="center">
  <strong>AI-Powered Financial & Legal Contract Analyzer</strong>
</p>

<p align="center">
  Turning complex financial agreements into simple, transparent, and actionable insights.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Framework-Expo-000020?style=for-the-badge&logo=expo" />
  <img src="https://img.shields.io/badge/AI-Powered-8B5CF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Hackathon%20Project-22C55E?style=for-the-badge" />
</p>

---

## 🚀 About LoanLens

**LoanLens** is an AI-powered financial and legal document analyzer designed to make complicated agreements understandable for everyone.

Loan agreements, insurance policies, credit card terms, and financial contracts often contain hidden charges, confusing legal terminology, and conditions that borrowers may overlook.

LoanLens bridges this gap by transforming complex contract language into easy-to-understand explanations, identifying potentially risky clauses, and generating smart questions users should consider before signing.

**Our mission is simple: Make financial decisions more transparent, one clause at a time.**

---

## ✨ Key Features

### 📄 1. Smart Document Analysis
- Upload PDF documents and contract images.
- Paste contract text directly.
- Choose from sample document templates.
- One-tap AI-powered contract analysis.
- Supports different financial and legal document categories.

### ⚡ 2. Intelligent AI Scanning
- Animated document scanning experience.
- Dynamic analysis progress indicators.
- Multi-stage document evaluation.
- Clause identification and risk assessment.

### 💡 3. Explain It Simply
**No Jargon. Just Clarity.**

Convert complicated legal terminology into simple, understandable language.

| Contract Clause | What LoanLens Explains |
|---|---|
| Late Payment Penalty | Understand additional interest and penalties. |
| Auto-Renewal | Discover renewal conditions and notice periods. |
| Processing Fees | Understand upfront deductions and refund conditions. |

**LoanLens Insight:** Get practical points to consider when discussing contract terms with a lender or service provider.

### 📋 4. Ask Before You Sign
- AI-generated questions to ask before signing.
- Interactive checklist with completion tracking.
- Copy individual questions.
- Export advice as PDF.
- Share important contract insights.

### 📊 5. Analysis History
- View previously analyzed documents.
- Track document risk scores.
- Search analysis history.
- Filter documents by risk category.
- Revisit previous clause explanations.

### ⚙️ 6. Profile & Security
- User profile and subscription overview.
- Security and privacy settings.
- Document cache management.
- Configurable data-retention preferences.
- AI model information.

---

## 🧠 How LoanLens Works

<p align="center">
  <strong>Upload → Analyze → Understand → Evaluate → Decide</strong>
</p>

| Step | Process | Description |
|---|---|---|
| 01 | 📤 Upload | Upload a contract or paste its text. |
| 02 | 🔍 Analyze | Process the document and identify relevant clauses. |
| 03 | 🧠 Understand | Translate complex terms into plain English. |
| 04 | ⚠️ Evaluate | Highlight potential risks and important conditions. |
| 05 | 💬 Prepare | Generate questions to discuss before signing. |

---

## 📱 Application Screens

LoanLens features a modern dark-mode fintech interface designed for clarity, accessibility, and ease of navigation.

| Screen | Description |
|---|---|
| Analyze Document | Upload documents and start analysis. |
| AI Analysis | Animated scanning and progress tracking. |
| Explain Simply | Plain-English clause explanations. |
| Ask Before You Sign | Interactive borrower checklist. |
| History | Previous analyses and risk metrics. |
| Profile | Account, security, and application settings. |

> **Screenshots:** Add actual application screenshots in the `screenshots/` directory and link them here.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile development |
| Expo | Development and application tooling |
| JavaScript | Application logic |
| React Context API | Global state management |
| React Native Animated | UI animations |
| Expo Document Picker | Document selection |
| Expo Image Picker | Image selection |
| Expo Clipboard | Copy-to-clipboard functionality |

---

## 📂 Project Structure

```text
loanlens-app/
│
├── App.js
├── app.json
├── package.json
├── README.md
│
└── src/
    ├── components/
    │   ├── BottomTabBar.js
    │   ├── ClauseCard.js
    │   ├── Header.js
    │   ├── HelpModal.js
    │   ├── QuestionItem.js
    │   ├── Stepper.js
    │   └── Toast.js
    │
    ├── context/
    │   └── DocumentContext.js
    │
    ├── data/
    │   └── mockDocuments.js
    │
    ├── screens/
    │   ├── AIAnalysisScreen.js
    │   ├── AnalyzeDocumentScreen.js
    │   ├── AskQuestionsScreen.js
    │   ├── ExplainSimplyScreen.js
    │   ├── HistoryScreen.js
    │   └── ProfileScreen.js
    │
    └── theme/
        └── colors.js
```

---

## ⚙️ Getting Started

Follow these steps to run LoanLens locally.

### Prerequisites

- Node.js v18 or higher
- npm
- Expo CLI / Expo tooling
- Android Emulator, iOS Simulator, or Expo Go

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/LoanLens.git
```

### 2. Navigate to the Project

```bash
cd LoanLens
```

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 4. Start the Application

```bash
npx expo start
```

### Run on Specific Platforms

```bash
# Web
npm run web

# Android
npm run android

# iOS
npm run ios
```

---

## 🔐 Security & Privacy

LoanLens is designed with privacy and responsible document handling in mind.

Key design considerations include:

- Secure handling of uploaded document content.
- Clear data-retention preferences.
- User control over locally cached documents.
- Transparency around document analysis.

**Important:** Security labels and encryption claims should only be enabled when the corresponding protections are actually implemented and verified. AI-generated explanations are informational and should not replace professional legal or financial advice.

---

## 🎯 Problem We Solve

Financial agreements are often difficult to understand without specialized knowledge.

This can make it challenging to identify:

- Unexpected charges and deductions.
- Late payment penalties.
- Automatic renewal conditions.
- Unfavorable contractual obligations.
- Important terms hidden in lengthy documents.

### Our Solution

LoanLens makes contract understanding more accessible by combining AI-assisted analysis with a user-friendly interface.

Instead of spending hours interpreting complicated legal documents, users can quickly identify important clauses, understand their meaning, and prepare questions before making decisions.

---

## 🏆 Hackathon Project

LoanLens was developed as a hackathon project focused on applying Artificial Intelligence to a real-world financial literacy problem.

### Project Objectives

- Improve financial document accessibility.
- Simplify complex legal terminology.
- Promote informed financial decisions.
- Demonstrate practical AI-assisted document analysis.
- Build an intuitive cross-platform mobile experience.

---

## 🔮 Future Enhancements

- [ ] Advanced OCR for scanned contracts.
- [ ] Multilingual contract explanations.
- [ ] Real-time AI-powered document analysis.
- [ ] Advanced clause comparison.
- [ ] Downloadable detailed analysis reports.
- [ ] More financial document categories.
- [ ] Improved risk assessment and personalized insights.

---

## ⚠️ Disclaimer

LoanLens provides AI-assisted informational insights for educational purposes. It does not provide certified legal, financial, or investment advice. Users should consult qualified professionals before making important contractual or financial decisions.

---

<p align="center">
  <strong>✦ LoanLens</strong>
  <br/>
  Making Every Contract Easier to Understand.
  <br/><br/>
  Built with ❤️ for a smarter financial future.
</p>
