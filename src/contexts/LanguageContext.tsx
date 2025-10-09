import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'zh' | 'ja' | 'ko' | 'ru' | 'ar' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Header
    'nav.features': 'Recursos',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'auth.login': 'Login',
    'auth.signup': 'Cadastrar',
    'auth.logout': 'Sair',
    'nav.dashboard': 'Dashboard',
    
    // Hero
    'hero.badge': 'Orientação Profissional com IA',
    'hero.title': 'Sua jornada para o',
    'hero.titleHighlight': ' mercado de trabalho ',
    'hero.titleEnd': 'começa aqui',
    'hero.description': 'O NexusAI é seu assistente inteligente para encontrar oportunidades, aprimorar seu currículo e conquistar a vaga dos seus sonhos.',
    'hero.getStarted': 'Começar Agora',
    'hero.demo': 'Ver Demonstração',
    'hero.stat1': 'Jovens Orientados',
    'hero.stat2': 'Taxa de Sucesso',
    'hero.stat3': 'Suporte IA',
    
    // Dashboard
    'dashboard.title': 'Painel de Controle',
    'dashboard.welcome': 'Bem-vindo de volta',
    'dashboard.resume': 'Otimizar Currículo',
    'dashboard.resumeDesc': 'Crie e otimize seu currículo profissional',
    'dashboard.interview': 'Preparação para Entrevistas',
    'dashboard.interviewDesc': 'Pratique e prepare-se para suas entrevistas',
    'dashboard.skills': 'Desenvolvimento de Habilidades',
    'dashboard.skillsDesc': 'Aprimore suas competências profissionais',
    'dashboard.backHome': 'Voltar para Início',
  },
  en: {
    'nav.features': 'Features',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Logout',
    'nav.dashboard': 'Dashboard',
    
    'hero.badge': 'AI-Powered Career Guidance',
    'hero.title': 'Your journey to the',
    'hero.titleHighlight': ' job market ',
    'hero.titleEnd': 'starts here',
    'hero.description': 'NexusAI is your intelligent assistant to find opportunities, improve your resume and land your dream job.',
    'hero.getStarted': 'Get Started',
    'hero.demo': 'View Demo',
    'hero.stat1': 'Guided Youth',
    'hero.stat2': 'Success Rate',
    'hero.stat3': 'AI Support',
    
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.resume': 'Resume Optimizer',
    'dashboard.resumeDesc': 'Create and optimize your professional resume',
    'dashboard.interview': 'Interview Preparation',
    'dashboard.interviewDesc': 'Practice and prepare for your interviews',
    'dashboard.skills': 'Skills Development',
    'dashboard.skillsDesc': 'Enhance your professional competencies',
    'dashboard.backHome': 'Back to Home',
  },
  es: {
    'nav.features': 'Características',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'auth.login': 'Iniciar sesión',
    'auth.signup': 'Registrarse',
    'auth.logout': 'Cerrar sesión',
    'nav.dashboard': 'Panel',
    
    'hero.badge': 'Orientación Profesional con IA',
    'hero.title': 'Tu viaje hacia el',
    'hero.titleHighlight': ' mercado laboral ',
    'hero.titleEnd': 'comienza aquí',
    'hero.description': 'NexusAI es tu asistente inteligente para encontrar oportunidades, mejorar tu currículum y conseguir el trabajo de tus sueños.',
    'hero.getStarted': 'Comenzar Ahora',
    'hero.demo': 'Ver Demostración',
    'hero.stat1': 'Jóvenes Orientados',
    'hero.stat2': 'Tasa de Éxito',
    'hero.stat3': 'Soporte IA',
    
    'dashboard.title': 'Panel de Control',
    'dashboard.welcome': 'Bienvenido de nuevo',
    'dashboard.resume': 'Optimizar Currículum',
    'dashboard.resumeDesc': 'Crea y optimiza tu currículum profesional',
    'dashboard.interview': 'Preparación para Entrevistas',
    'dashboard.interviewDesc': 'Practica y prepárate para tus entrevistas',
    'dashboard.skills': 'Desarrollo de Habilidades',
    'dashboard.skillsDesc': 'Mejora tus competencias profesionales',
    'dashboard.backHome': 'Volver al Inicio',
  },
  fr: {
    'nav.features': 'Fonctionnalités',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'auth.login': 'Connexion',
    'auth.signup': "S'inscrire",
    'auth.logout': 'Déconnexion',
    'nav.dashboard': 'Tableau de bord',
    
    'hero.badge': 'Orientation Professionnelle par IA',
    'hero.title': 'Votre voyage vers le',
    'hero.titleHighlight': ' marché du travail ',
    'hero.titleEnd': 'commence ici',
    'hero.description': "NexusAI est votre assistant intelligent pour trouver des opportunités, améliorer votre CV et décrocher l'emploi de vos rêves.",
    'hero.getStarted': 'Commencer',
    'hero.demo': 'Voir la Démo',
    'hero.stat1': 'Jeunes Guidés',
    'hero.stat2': 'Taux de Réussite',
    'hero.stat3': 'Support IA',
    
    'dashboard.title': 'Tableau de bord',
    'dashboard.welcome': 'Bon retour',
    'dashboard.resume': 'Optimiser le CV',
    'dashboard.resumeDesc': 'Créez et optimisez votre CV professionnel',
    'dashboard.interview': 'Préparation aux Entretiens',
    'dashboard.interviewDesc': 'Pratiquez et préparez-vous pour vos entretiens',
    'dashboard.skills': 'Développement des Compétences',
    'dashboard.skillsDesc': 'Améliorez vos compétences professionnelles',
    'dashboard.backHome': "Retour à l'Accueil",
  },
  de: {
    'nav.features': 'Funktionen',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'auth.login': 'Anmelden',
    'auth.signup': 'Registrieren',
    'auth.logout': 'Abmelden',
    'nav.dashboard': 'Dashboard',
    
    'hero.badge': 'KI-gestützte Berufsberatung',
    'hero.title': 'Ihre Reise zum',
    'hero.titleHighlight': ' Arbeitsmarkt ',
    'hero.titleEnd': 'beginnt hier',
    'hero.description': 'NexusAI ist Ihr intelligenter Assistent, um Chancen zu finden, Ihren Lebenslauf zu verbessern und Ihren Traumjob zu bekommen.',
    'hero.getStarted': 'Jetzt Starten',
    'hero.demo': 'Demo Ansehen',
    'hero.stat1': 'Begleitete Jugendliche',
    'hero.stat2': 'Erfolgsquote',
    'hero.stat3': 'KI-Support',
    
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Willkommen zurück',
    'dashboard.resume': 'Lebenslauf Optimieren',
    'dashboard.resumeDesc': 'Erstellen und optimieren Sie Ihren professionellen Lebenslauf',
    'dashboard.interview': 'Vorstellungsgesprächsvorbereitung',
    'dashboard.interviewDesc': 'Üben und bereiten Sie sich auf Ihre Vorstellungsgespräche vor',
    'dashboard.skills': 'Kompetenzentwicklung',
    'dashboard.skillsDesc': 'Verbessern Sie Ihre beruflichen Kompetenzen',
    'dashboard.backHome': 'Zurück zur Startseite',
  },
  it: {
    'nav.features': 'Caratteristiche',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatto',
    'auth.login': 'Accedi',
    'auth.signup': 'Registrati',
    'auth.logout': 'Esci',
    'nav.dashboard': 'Pannello',
    
    'hero.badge': 'Orientamento Professionale con IA',
    'hero.title': 'Il tuo viaggio verso il',
    'hero.titleHighlight': ' mercato del lavoro ',
    'hero.titleEnd': 'inizia qui',
    'hero.description': "NexusAI è il tuo assistente intelligente per trovare opportunità, migliorare il tuo curriculum e ottenere il lavoro dei tuoi sogni.",
    'hero.getStarted': 'Inizia Ora',
    'hero.demo': 'Vedi Demo',
    'hero.stat1': 'Giovani Guidati',
    'hero.stat2': 'Tasso di Successo',
    'hero.stat3': 'Supporto IA',
    
    'dashboard.title': 'Pannello di Controllo',
    'dashboard.welcome': 'Bentornato',
    'dashboard.resume': 'Ottimizza Curriculum',
    'dashboard.resumeDesc': 'Crea e ottimizza il tuo curriculum professionale',
    'dashboard.interview': 'Preparazione ai Colloqui',
    'dashboard.interviewDesc': 'Pratica e preparati per i tuoi colloqui',
    'dashboard.skills': 'Sviluppo delle Competenze',
    'dashboard.skillsDesc': 'Migliora le tue competenze professionali',
    'dashboard.backHome': "Torna all'Inizio",
  },
  zh: {
    'nav.features': '功能',
    'nav.about': '关于',
    'nav.contact': '联系',
    'auth.login': '登录',
    'auth.signup': '注册',
    'auth.logout': '退出',
    'nav.dashboard': '仪表板',
    
    'hero.badge': 'AI驱动的职业指导',
    'hero.title': '您的',
    'hero.titleHighlight': ' 职场之旅 ',
    'hero.titleEnd': '从这里开始',
    'hero.description': 'NexusAI是您的智能助手，帮助您找到机会、改善简历并获得理想的工作。',
    'hero.getStarted': '立即开始',
    'hero.demo': '查看演示',
    'hero.stat1': '指导的年轻人',
    'hero.stat2': '成功率',
    'hero.stat3': 'AI支持',
    
    'dashboard.title': '仪表板',
    'dashboard.welcome': '欢迎回来',
    'dashboard.resume': '优化简历',
    'dashboard.resumeDesc': '创建并优化您的专业简历',
    'dashboard.interview': '面试准备',
    'dashboard.interviewDesc': '练习并为您的面试做好准备',
    'dashboard.skills': '技能发展',
    'dashboard.skillsDesc': '提升您的专业能力',
    'dashboard.backHome': '返回首页',
  },
  ja: {
    'nav.features': '機能',
    'nav.about': '概要',
    'nav.contact': 'お問い合わせ',
    'auth.login': 'ログイン',
    'auth.signup': '登録',
    'auth.logout': 'ログアウト',
    'nav.dashboard': 'ダッシュボード',
    
    'hero.badge': 'AIによるキャリアガイダンス',
    'hero.title': 'あなたの',
    'hero.titleHighlight': ' 就職活動 ',
    'hero.titleEnd': 'はここから始まります',
    'hero.description': 'NexusAIは、機会を見つけ、履歴書を改善し、夢の仕事を獲得するためのインテリジェントなアシスタントです。',
    'hero.getStarted': '今すぐ始める',
    'hero.demo': 'デモを見る',
    'hero.stat1': '指導された若者',
    'hero.stat2': '成功率',
    'hero.stat3': 'AIサポート',
    
    'dashboard.title': 'ダッシュボード',
    'dashboard.welcome': 'おかえりなさい',
    'dashboard.resume': '履歴書の最適化',
    'dashboard.resumeDesc': 'プロフェッショナルな履歴書を作成し最適化',
    'dashboard.interview': '面接準備',
    'dashboard.interviewDesc': '面接の練習と準備',
    'dashboard.skills': 'スキル開発',
    'dashboard.skillsDesc': '専門的な能力を向上させる',
    'dashboard.backHome': 'ホームに戻る',
  },
  ko: {
    'nav.features': '기능',
    'nav.about': '소개',
    'nav.contact': '연락처',
    'auth.login': '로그인',
    'auth.signup': '가입',
    'auth.logout': '로그아웃',
    'nav.dashboard': '대시보드',
    
    'hero.badge': 'AI 기반 커리어 가이던스',
    'hero.title': '당신의',
    'hero.titleHighlight': ' 취업 여정 ',
    'hero.titleEnd': '이 여기서 시작됩니다',
    'hero.description': 'NexusAI는 기회를 찾고, 이력서를 개선하며, 꿈의 직장을 얻기 위한 지능형 도우미입니다.',
    'hero.getStarted': '시작하기',
    'hero.demo': '데모 보기',
    'hero.stat1': '지도된 청년',
    'hero.stat2': '성공률',
    'hero.stat3': 'AI 지원',
    
    'dashboard.title': '대시보드',
    'dashboard.welcome': '다시 오신 것을 환영합니다',
    'dashboard.resume': '이력서 최적화',
    'dashboard.resumeDesc': '전문 이력서 작성 및 최적화',
    'dashboard.interview': '면접 준비',
    'dashboard.interviewDesc': '면접 연습 및 준비',
    'dashboard.skills': '스킬 개발',
    'dashboard.skillsDesc': '전문 역량 향상',
    'dashboard.backHome': '홈으로 돌아가기',
  },
  ru: {
    'nav.features': 'Функции',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'auth.login': 'Войти',
    'auth.signup': 'Регистрация',
    'auth.logout': 'Выйти',
    'nav.dashboard': 'Панель',
    
    'hero.badge': 'Карьерное руководство с ИИ',
    'hero.title': 'Ваше путешествие к',
    'hero.titleHighlight': ' рынку труда ',
    'hero.titleEnd': 'начинается здесь',
    'hero.description': 'NexusAI - ваш интеллектуальный помощник для поиска возможностей, улучшения резюме и получения работы мечты.',
    'hero.getStarted': 'Начать сейчас',
    'hero.demo': 'Смотреть демо',
    'hero.stat1': 'Наставленная молодежь',
    'hero.stat2': 'Процент успеха',
    'hero.stat3': 'Поддержка ИИ',
    
    'dashboard.title': 'Панель управления',
    'dashboard.welcome': 'Добро пожаловать',
    'dashboard.resume': 'Оптимизация резюме',
    'dashboard.resumeDesc': 'Создайте и оптимизируйте свое профессиональное резюме',
    'dashboard.interview': 'Подготовка к собеседованию',
    'dashboard.interviewDesc': 'Практикуйтесь и готовьтесь к собеседованиям',
    'dashboard.skills': 'Развитие навыков',
    'dashboard.skillsDesc': 'Улучшите свои профессиональные компетенции',
    'dashboard.backHome': 'Вернуться на главную',
  },
  ar: {
    'nav.features': 'الميزات',
    'nav.about': 'عن',
    'nav.contact': 'اتصل',
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'التسجيل',
    'auth.logout': 'تسجيل الخروج',
    'nav.dashboard': 'لوحة التحكم',
    
    'hero.badge': 'التوجيه المهني بالذكاء الاصطناعي',
    'hero.title': 'رحلتك إلى',
    'hero.titleHighlight': ' سوق العمل ',
    'hero.titleEnd': 'تبدأ هنا',
    'hero.description': 'NexusAI هو مساعدك الذكي للعثور على الفرص وتحسين سيرتك الذاتية والحصول على وظيفة أحلامك.',
    'hero.getStarted': 'ابدأ الآن',
    'hero.demo': 'عرض التجريبي',
    'hero.stat1': 'الشباب الموجهين',
    'hero.stat2': 'معدل النجاح',
    'hero.stat3': 'دعم الذكاء الاصطناعي',
    
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحبا بعودتك',
    'dashboard.resume': 'تحسين السيرة الذاتية',
    'dashboard.resumeDesc': 'إنشاء وتحسين سيرتك الذاتية المهنية',
    'dashboard.interview': 'الإعداد للمقابلات',
    'dashboard.interviewDesc': 'ممارسة والاستعداد لمقابلاتك',
    'dashboard.skills': 'تطوير المهارات',
    'dashboard.skillsDesc': 'تعزيز كفاءاتك المهنية',
    'dashboard.backHome': 'العودة إلى الصفحة الرئيسية',
  },
  hi: {
    'nav.features': 'विशेषताएं',
    'nav.about': 'के बारे में',
    'nav.contact': 'संपर्क',
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.logout': 'लॉगआउट',
    'nav.dashboard': 'डैशबोर्ड',
    
    'hero.badge': 'AI-संचालित करियर मार्गदर्शन',
    'hero.title': 'आपकी यात्रा',
    'hero.titleHighlight': ' नौकरी बाजार ',
    'hero.titleEnd': 'यहाँ से शुरू होती है',
    'hero.description': 'NexusAI आपका बुद्धिमान सहायक है अवसर खोजने, अपना रिज्यूमे सुधारने और अपनी सपनों की नौकरी पाने के लिए।',
    'hero.getStarted': 'अभी शुरू करें',
    'hero.demo': 'डेमो देखें',
    'hero.stat1': 'मार्गदर्शित युवा',
    'hero.stat2': 'सफलता दर',
    'hero.stat3': 'AI सहायता',
    
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.resume': 'रिज्यूमे अनुकूलन',
    'dashboard.resumeDesc': 'अपना पेशेवर रिज्यूमे बनाएं और अनुकूलित करें',
    'dashboard.interview': 'साक्षात्कार की तैयारी',
    'dashboard.interviewDesc': 'अपने साक्षात्कार के लिए अभ्यास और तैयारी करें',
    'dashboard.skills': 'कौशल विकास',
    'dashboard.skillsDesc': 'अपनी पेशेवर क्षमताओं को बढ़ाएं',
    'dashboard.backHome': 'होम पर वापस जाएं',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    // Set direction for RTL languages
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};