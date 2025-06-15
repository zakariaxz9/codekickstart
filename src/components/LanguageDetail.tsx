import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

interface LanguageDetailProps {
  languageSlug: string;
  onBack: () => void;
}

export function LanguageDetail({ languageSlug, onBack }: LanguageDetailProps) {
  const language = useQuery(api.languages.getLanguageBySlug, { slug: languageSlug });
  const isBookmarked = useQuery(api.bookmarks.isBookmarked, { languageSlug });
  const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
  const [activeTab, setActiveTab] = useState<'concepts' | 'resources'>('concepts');

  if (!language) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const handleBookmark = async () => {
    await toggleBookmark({ languageSlug });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Learn ${language.name} - CodeKickstart`,
          text: `Check out this ${language.name} learning guide on CodeKickstart!`,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{language.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900">{language.name}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked 
                ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this language'}
          >
            {isBookmarked ? '⭐' : '☆'}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Share this page"
          >
            📤
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-700 text-lg leading-relaxed mb-4">{language.description}</p>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-900 mb-2">Perfect for:</h3>
          <p className="text-indigo-700">{language.purpose}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('concepts')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'concepts'
                ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📖 Key Concepts
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'resources'
                ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🎯 Learning Resources
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'concepts' && (
            <div className="space-y-6">
              {language.concepts.map((concept, index) => (
                <div key={index} className="border-l-4 border-indigo-200 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{concept.title}</h3>
                  <p className="text-gray-600 mb-4">{concept.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      <code>{concept.example}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-8">
              {/* Websites */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  🌐 Recommended Websites
                </h3>
                <div className="grid gap-4">
                  {language.resources.websites.map((site, index) => (
                    <a
                      key={index}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-semibold text-indigo-600 mb-1">{site.name}</h4>
                      <p className="text-gray-600 text-sm">{site.description}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  📺 Video Courses
                </h3>
                <div className="grid gap-4">
                  {language.resources.videos.map((video, index) => (
                    <a
                      key={index}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-semibold text-red-600 mb-1">{video.name}</h4>
                      <p className="text-gray-600 text-sm">{video.description}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Books */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  📚 Recommended Books
                </h3>
                <div className="grid gap-4">
                  {language.resources.books.map((book, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-1">{book.name}</h4>
                      <p className="text-gray-700 text-sm mb-1">by {book.author}</p>
                      <p className="text-gray-600 text-sm">{book.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">Ready to start learning {language.name}?</h3>
        <p className="mb-4 opacity-90">Pick a resource above and begin your coding journey today!</p>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('resources')}
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            View Resources
          </button>
          <button
            onClick={handleBookmark}
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            {isBookmarked ? 'Bookmarked ⭐' : 'Bookmark for Later ☆'}
          </button>
        </div>
      </div>
    </div>
  );
}
