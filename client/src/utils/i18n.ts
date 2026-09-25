import { LanguageCode } from '../types/studentos';

export interface Translations {
  appName: string;
  tagline: string;
  welcomeGuest: string;
  welcomeBack: string;
  signInSignUp: string;
  signOut: string;
  guideTutorial: string;
  backToDashboard: string;
  resetAllData: string;
  streak: string;
  checkIn: string;
  careerGoal: string;
  skillsCompleted: string;
  savings: string;
  scholarshipsFound: string;
  allToolsTitle: string;
  allToolsSubtitle: string;
  selectLanguage: string;
  
  // Tabs
  home: string;
  gpaCalc: string;
  deadlines: string;
  timetable: string;
  resumeCv: string;
  courseFinder: string;
  moneyTracker: string;
  studyAssistant: string;
  scholarships: string;
  docTools: string;
  careerRoadmap: string;
  aiAssistant: string;
  captionGen: string;

  // Onboarding Tutorial
  tutorialTitle: string;
  tutorialStep1Title: string;
  tutorialStep1Desc: string;
  tutorialStep2Title: string;
  tutorialStep2Desc: string;
  tutorialStep3Title: string;
  tutorialStep3Desc: string;
  tutorialStep4Title: string;
  tutorialStep4Desc: string;
  getStartedBtn: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: 'Studently',
    tagline: 'Your student life, organized.',
    welcomeGuest: 'Welcome to Studently! 👋',
    welcomeBack: 'Welcome back,',
    signInSignUp: 'Sign In / Sign Up',
    signOut: 'Sign Out',
    guideTutorial: '📖 App Guide',
    backToDashboard: '← Back to Home Dashboard',
    resetAllData: '🔄 Reset All Data',
    streak: 'Days Streak',
    checkIn: '+1 Check-in',
    careerGoal: 'Target Career Goal',
    skillsCompleted: 'Skills Completed',
    savings: 'Total Savings',
    scholarshipsFound: 'Scholarships Found',
    allToolsTitle: '🛠️ All-in-One Student Ecosystem (12 Tools)',
    allToolsSubtitle: 'Select any mini-tool below to manage study, GPA, money, documents, and career roadmaps.',
    selectLanguage: 'Select Language',
    
    home: 'Home',
    gpaCalc: 'GPA Calc',
    deadlines: 'Deadlines',
    timetable: 'Timetable',
    resumeCv: 'Resume CV',
    courseFinder: 'Course Finder',
    moneyTracker: 'Money Tracker',
    studyAssistant: 'Study Assistant',
    scholarships: 'Scholarships',
    docTools: 'Doc Tools',
    careerRoadmap: 'Career Roadmap',
    aiAssistant: 'AI Assistant',
    captionGen: 'Caption Gen',

    tutorialTitle: '👋 Welcome to Studently Guide!',
    tutorialStep1Title: '1. All-in-One Student Ecosystem',
    tutorialStep1Desc: 'Studently combines 12 essential tools for student life: GPA calculations, money budgeting, study notes summarization, passport photos, and resume CV building.',
    tutorialStep2Title: '2. Track Daily Study Streaks & Goals',
    tutorialStep2Desc: 'Log your daily study habit with 1-click streak check-ins, set your target career goal, and track your completed technical skills.',
    tutorialStep3Title: '3. Calculate GPA & Build Resumes',
    tutorialStep3Desc: 'Enter your subject grades to compute SGPA/CGPA percentage, and build an ATS-friendly A4 resume ready for print or PDF download.',
    tutorialStep4Title: '4. Multi-Language & Smart AI Assistant',
    tutorialStep4Desc: 'Switch languages anytime between English, Malayalam, Arabic, Hindi, and Urdu. Use the 24/7 AI Assistant for assignment guidance!',
    getStartedBtn: 'Start Using Studently 🚀'
  },

  ml: {
    appName: 'Studently',
    tagline: 'നിങ്ങളുടെ വിദ്യാർത്ഥി ജീവിതം ക്രമീകരിക്കൂ.',
    welcomeGuest: 'Studently ലേക്ക് സ്വാഗതം! 👋',
    welcomeBack: 'തിരികെ സ്വാഗതം,',
    signInSignUp: 'സൈൻ ഇൻ / സൈൻ അപ്പ്',
    signOut: 'സൈൻ ഔട്ട്',
    guideTutorial: '📖 ഗൈഡ് / ട്യൂട്ടോറിയൽ',
    backToDashboard: '← പ്രധാന ഹോം പേജിലേക്ക് മടങ്ങുക',
    resetAllData: '🔄 എല്ലാ ഡാറ്റയും റീസെറ്റ് ചെയ്യുക',
    streak: 'ദിവസ സ്ട്രീക്ക്',
    checkIn: '+1 ചെക്ക്-ഇൻ',
    careerGoal: 'കരിയർ ലക്ഷ്യം',
    skillsCompleted: 'പൂർത്തിയാക്കിയ സ്കില്ലുകൾ',
    savings: 'ആകെ സമ്പാദ്യം',
    scholarshipsFound: 'സ്കോളർഷിപ്പുകൾ',
    allToolsTitle: '🛠️ ഓൾ-ഇൻ-വൺ സ്റ്റുഡന്റ് ടൂൾബോക്സ് (12 ടൂളുകൾ)',
    allToolsSubtitle: 'പഠനം, മാർക്കുകൾ, പണം, കരിയർ എന്നിവ നിയന്ത്രിക്കാൻ താഴെയുള്ള ടൂളുകൾ ഉപയോഗിക്കുക.',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',

    home: 'ഹോം',
    gpaCalc: 'GPA കാൽക്കുലേറ്റർ',
    deadlines: 'ഡെഡ്‌ലൈനുകൾ',
    timetable: 'ടൈംടേബിൾ',
    resumeCv: 'റെസ്യുമെ CV',
    courseFinder: 'കോഴ്‌സ് ഫൈൻഡർ',
    moneyTracker: 'മണി ട്രാക്കർ',
    studyAssistant: 'പഠന അസിസ്റ്റന്റ്',
    scholarships: 'സ്കോളർഷിപ്പ്',
    docTools: 'ഡോക് ടൂളുകൾ',
    careerRoadmap: 'കരിയർ റോഡ്‌മാപ്പ്',
    aiAssistant: 'AI അസിസ്റ്റന്റ്',
    captionGen: 'ക്യാപ്ഷൻ ബിൽഡർ',

    tutorialTitle: '👋 Studently ഉപയോഗ ക്രമം',
    tutorialStep1Title: '1. വിദ്യാർത്ഥികൾക്കുള്ള ഓൾ-ഇൻ-വൺ ആപ്പ്',
    tutorialStep1Desc: 'GPA കണക്കുകൂട്ടൽ, പണം നിയന്ത്രിക്കൽ, പഠന കുറിപ്പുകൾ ചുരുക്കൽ, പാസ്‌പോർട്ട് ഫോട്ടോ, റെസ്യുമെ നിർമ്മാണം എന്നിവ ഒരു കുടക്കീഴിൽ.',
    tutorialStep2Title: '2. ഡെയ്‌ലി സ്ട്രീക്കും ലക്ഷ്യങ്ങളും',
    tutorialStep2Desc: 'ദിവസേനയുള്ള പഠന ശീലം ചെക്ക്-ഇൻ ചെയ്യുക, നിങ്ങളുടെ കരിയർ ലക്ഷ്യവും പഠിച്ച കഴിവുകളും ട്രാക്ക് ചെയ്യുക.',
    tutorialStep3Title: '3. GPA യും റെസ്യുമെ നിർമ്മാണവും',
    tutorialStep3Desc: 'സെമസ്റ്റർ മാർക്കുകൾ നൽകി GPA/CGPA ശതമാനം കണ്ടെത്തുക. പ്രിന്റ് ചെയ്യാവുന്ന റെസ്യുമെ തയാറാക്കുക.',
    tutorialStep4Title: '4. ബഹുഭാഷാ പിന്തുണയും AI അസിസ്റ്റന്റും',
    tutorialStep4Desc: 'മലയാളം, അറബിക്, ഹിന്ദി, ഉർദു, ഇംഗ്ലീഷ് ഭാഷകളിൽ ലഭ്യമാണ്. സംശയങ്ങൾക്ക് 24/7 AI സഹായി ഉപയോഗിക്കുക!',
    getStartedBtn: 'ഉപയോഗിച്ചു തുടങ്ങാം 🚀'
  },

  ar: {
    appName: 'Studently',
    tagline: 'حياتك الطلابية، منظمة بنجاح.',
    welcomeGuest: 'مرحباً بك في Studently! 👋',
    welcomeBack: 'مرحباً بعودتك،',
    signInSignUp: 'تسجيل الدخول / إنشاء حساب',
    signOut: 'تسجيل الخروج',
    guideTutorial: '📖 دليل الاستخدام',
    backToDashboard: '← العودة إلى الصفحة الرئيسية',
    resetAllData: '🔄 إعادة ضبط البيانات',
    streak: 'أيام التتابع',
    checkIn: '+1 تسجيل يومي',
    careerGoal: 'الهدف المهني',
    skillsCompleted: 'المهارات المكتملة',
    savings: 'إجمالي المدخرات',
    scholarshipsFound: 'المنح الدراسية',
    allToolsTitle: '🛠️ بيئة الطلاب الشاملة (12 أداة)',
    allToolsSubtitle: 'اختر أي أداة لإدارة دراستك، المعدل التراكمي، الميزانية، والسيرة الذاتية.',
    selectLanguage: 'اختر اللغة',

    home: 'الرئيسية',
    gpaCalc: 'حاسبة المعدل',
    deadlines: 'المواعيد النهائية',
    timetable: 'الجدول الدراسي',
    resumeCv: 'السيرة الذاتية',
    courseFinder: 'مستكشف الدورات',
    moneyTracker: 'مدير المصاريف',
    studyAssistant: 'مساعد الدراسة',
    scholarships: 'المنح الدراسية',
    docTools: 'أدوات المستندات',
    careerRoadmap: 'خارطة المهنة',
    aiAssistant: 'المساعد الذكي',
    captionGen: 'مولد التعليقات',

    tutorialTitle: '👋 دليل تطبيق Studently الشامل',
    tutorialStep1Title: '1. بيئة طلابية متكاملة',
    tutorialStep1Desc: 'تطبيق يجمع 12 أداة أساسية: حساب المعدل التراكمي، إدارة الميزانية، تلخيص الملاحظات، وصانع السيرة الذاتية.',
    tutorialStep2Title: '2. متابعة التتابع والأهداف',
    tutorialStep2Desc: 'سجل حافز دراستك اليومي بنقرة واحدة، وحدد هدفك المهني وتابع مهاراتك المكتسبة.',
    tutorialStep3Title: '3. حساب المعدل والسيرة الذاتية',
    tutorialStep3Desc: 'أدخل درجات المواد لحساب المعدل التراكمي ونسبته، وأنشئ سيرة ذاتية احترافية جاهزة للطباعة.',
    tutorialStep4Title: '4. دعم متعدد اللغات ومساعد ذكي',
    tutorialStep4Desc: 'يدعم العربية، الإنجليزية، المليالمية، الهندية، والأوردية. استخدم المساعد الذكي للإجابة عن أسئلتك!',
    getStartedBtn: 'ابدأ الاستخدام الآن 🚀'
  },

  hi: {
    appName: 'Studently',
    tagline: 'आपकी छात्र ज़िंदगी, सुव्यवस्थित।',
    welcomeGuest: 'Studently में आपका स्वागत है! 👋',
    welcomeBack: 'वापसी पर स्वागत है,',
    signInSignUp: 'साइन इन / साइन अप',
    signOut: 'साइन आउट',
    guideTutorial: '📖 ऐप गाइड',
    backToDashboard: '← मुख्य होम पेज पर वापस जाएं',
    resetAllData: '🔄 सभी डेटा रीसेट करें',
    streak: 'दिनों की निरंतरता',
    checkIn: '+1 चेक-इन',
    careerGoal: 'करियर लक्ष्य',
    skillsCompleted: 'सीखी गई स्किल्स',
    savings: 'कुल बचत',
    scholarshipsFound: 'छात्रवृत्तियां',
    allToolsTitle: '🛠️ ऑल-इन-वन स्टूडेंट टूलबॉक्स (12 टूल्स)',
    allToolsSubtitle: 'पढ़ाई, जीपीए, बजट, दस्तावेज और करियर प्रबंधित करने के लिए नीचे दिए टूल्स चुनें।',
    selectLanguage: 'भाषा चुनें',

    home: 'होम',
    gpaCalc: 'GPA कैलकुलेटर',
    deadlines: 'डेडलाइन्स',
    timetable: 'टाइमटेबल',
    resumeCv: 'रेज्यूमे CV',
    courseFinder: 'कोर्स फाइंडर',
    moneyTracker: 'मनी ट्रैकर',
    studyAssistant: 'स्टडी असिस्टेंट',
    scholarships: 'छात्रवृत्ति',
    docTools: 'डॉक टूल्स',
    careerRoadmap: 'करियर रोडमैप',
    aiAssistant: 'AI असिस्टेंट',
    captionGen: 'कैप्शन जनरेटर',

    tutorialTitle: '👋 Studently ऐप गाइड में आपका स्वागत है!',
    tutorialStep1Title: '1. छात्रों के लिए ऑल-इन-वन ऐप',
    tutorialStep1Desc: 'जीपीए कैलकुलेशन, बजटिंग, नोट्स समरी, पासपोर्ट फोटो और रेज्यूमे बनाने के लिए 12 जरूरी टूल्स एक साथ।',
    tutorialStep2Title: '2. डेली स्टडी स्ट्राइक और लक्ष्य',
    tutorialStep2Desc: 'डेली चेक-इन के साथ पढ़ाई की आदत बनाएं, करियर लक्ष्य सेट करें और स्किल्स ट्रैक करें।',
    tutorialStep3Title: '3. GPA कैलकुलेट करें और रेज्यूमे बनाएं',
    tutorialStep3Desc: 'मार्क्स डालकर SGPA/CGPA और प्रतिशत निकालें और प्रिंट योग्य A4 रेज्यूमे तैयार करें।',
    tutorialStep4Title: '4. बहुभाषी सहायता और AI असिस्टेंट',
    tutorialStep4Desc: 'हिंदी, अंग्रेजी, मलयालम, अरबी और उर्दू में उपलब्ध। पढ़ाई और कोडिंग में सहायता के लिए AI का उपयोग करें।',
    getStartedBtn: 'शुरू करें 🚀'
  },

  ur: {
    appName: 'Studently',
    tagline: 'آپ کی طالب علم کی زندگی، منظم۔',
    welcomeGuest: 'Studently میں خوش آمدید! 👋',
    welcomeBack: 'خوش آمدید،',
    signInSignUp: 'سائن ان / سائن اپ',
    signOut: 'سائن آؤٹ',
    guideTutorial: '📖 ایپ رہنما',
    backToDashboard: '← مین ہوم پیج پر واپس جائیں',
    resetAllData: '🔄 تمام ڈیٹا ری سیٹ کریں',
    streak: 'دنوں کا تسلسل',
    checkIn: '+1 چیک ان',
    careerGoal: 'کیریئر کا ہدف',
    skillsCompleted: 'مکمل شدہ مہارتیں',
    savings: 'کل بچت',
    scholarshipsFound: 'وظائف',
    allToolsTitle: '🛠️ ال ان ون اسٹوڈنٹ ٹول باکس (12 ٹولز)',
    allToolsSubtitle: 'پڑھائی، جی پی اے، بجٹ اور سی وی بنانے کے لیے ذیل میں ٹولز منتخب کریں۔',
    selectLanguage: 'زبان منتخب کریں',

    home: 'ہوم',
    gpaCalc: 'GPA کیلکولیٹر',
    deadlines: 'ڈیڈ لائنز',
    timetable: 'ٹائم ٹیبل',
    resumeCv: 'ریزیومے CV',
    courseFinder: 'کورس فائنڈر',
    moneyTracker: 'منی ٹریکر',
    studyAssistant: 'اسٹڈی اسسٹنٹ',
    scholarships: 'اسکالرشپ',
    docTools: 'ڈاک ٹولز',
    careerRoadmap: 'کیریئر روڈ میپ',
    aiAssistant: 'AI اسسٹنٹ',
    captionGen: 'کیپشن جنریٹر',

    tutorialTitle: '👋 Studently گائیڈ میں خوش آمدید!',
    tutorialStep1Title: '1. تمام طلباء کے لیے مکمل ایپ',
    tutorialStep1Desc: 'جی پی اے کیلکولیشن، بجٹ ٹریکر، نوٹس خلاصہ، پاسپورٹ تصویر اور سی وی بنانے کے 12 بہترین ٹولز۔',
    tutorialStep2Title: '2. روزانہ کا تسلسل اور اہداف',
    tutorialStep2Desc: 'روزانہ چیک ان سے پڑھائی کا تسلسل برقرار رکھیں اور اپنے کیریئر اہداف ٹریک کریں۔',
    tutorialStep3Title: '3. GPA اور سی وی بنانا',
    tutorialStep3Desc: 'نمبر درج کر کے CGPA اور فیصد حاصل کریں اور بہترین A4 سی وی پرنٹ کریں۔',
    tutorialStep4Title: '4. متعدد زبانیں اور AI اسسٹنٹ',
    tutorialStep4Desc: 'اردو، عربی، انگریزی، ملیالم اور ہندی میں دستیاب۔ کسی بھی سوال کے لیے AI اسسٹنٹ استعمال کریں۔',
    getStartedBtn: 'ابھی شروع کریں 🚀'
  }
};
