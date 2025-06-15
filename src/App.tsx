import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { LanguageList } from "./components/LanguageList";
import { LanguageDetail } from "./components/LanguageDetail";
import { ChatBot } from "./components/ChatBot";

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'languages' | 'detail'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  // Handle URL routing
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/languages') {
      setCurrentView('languages');
    } else if (path.startsWith('/language/')) {
      const slug = path.split('/language/')[1];
      setSelectedLanguage(slug);
      setCurrentView('detail');
    } else {
      setCurrentView('home');
    }
  }, []);

  const navigateTo = (view: 'home' | 'languages' | 'detail', languageSlug?: string) => {
    setCurrentView(view);
    if (view === 'detail' && languageSlug) {
      setSelectedLanguage(languageSlug);
      window.history.pushState({}, '', `/language/${languageSlug}`);
    } else if (view === 'languages') {
      window.history.pushState({}, '', '/languages');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex justify-between items-center">
          <button 
            onClick={() => navigateTo('home')}
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            CodeKickstart
          </button>
          <div className="flex items-center gap-3">
            <Authenticated>
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                title="AI Assistant"
              >
                🤖
              </button>
            </Authenticated>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <Content 
          currentView={currentView}
          selectedLanguage={selectedLanguage}
          navigateTo={navigateTo}
        />
      </main>

      <Authenticated>
        <ChatBot 
          isOpen={showChat} 
          onClose={() => setShowChat(false)}
          languageSlug={currentView === 'detail' && selectedLanguage ? selectedLanguage : undefined}
        />
      </Authenticated>

      <Toaster />
    </div>
  );
}

function Content({ 
  currentView, 
  selectedLanguage, 
  navigateTo 
}: { 
  currentView: 'home' | 'languages' | 'detail';
  selectedLanguage: string | null;
  navigateTo: (view: 'home' | 'languages' | 'detail', languageSlug?: string) => void;
}) {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Unauthenticated>
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              👋 Welcome to CodeKickstart!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn programming the smart way. Choose a language and get started!
            </p>
          </div>
          <SignInForm />
        </div>
      </Unauthenticated>

      <Authenticated>
        {currentView === 'home' && (
          <HomeView 
            userName={loggedInUser?.email?.split('@')[0] || 'friend'}
            onChooseLanguage={() => navigateTo('languages')}
          />
        )}
        
        {currentView === 'languages' && (
          <LanguageList 
            onSelectLanguage={(slug) => navigateTo('detail', slug)}
            onBack={() => navigateTo('home')}
          />
        )}
        
        {currentView === 'detail' && selectedLanguage && (
          <LanguageDetail 
            languageSlug={selectedLanguage}
            onBack={() => navigateTo('languages')}
          />
        )}
      </Authenticated>
    </div>
  );
}

function HomeView({ userName, onChooseLanguage }: { userName: string; onChooseLanguage: () => void }) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          👋 Welcome to CodeKickstart!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn programming the smart way. Choose a language and get started!
        </p>
        <p className="text-lg text-indigo-600 font-medium">
          Hello, {userName}! Ready to start your coding journey?
        </p>
      </div>
      
      <div className="space-y-6">
        <button
          onClick={onChooseLanguage}
          className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          🚀 Choose a Language to Learn
        </button>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Curated Resources</h3>
            <p className="text-gray-600 text-sm">Hand-picked tutorials, courses, and books for each language</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Assistant</h3>
            <p className="text-gray-600 text-sm">Get instant help and explanations from our AI tutor</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p className="text-gray-600 text-sm">Learn anywhere, anytime on any device</p>
          </div>
        </div>
      </div>
    </div>
  );
}
