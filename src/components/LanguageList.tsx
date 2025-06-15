import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

interface LanguageListProps {
  onSelectLanguage: (slug: string) => void;
  onBack: () => void;
}

export function LanguageList({ onSelectLanguage, onBack }: LanguageListProps) {
  const languages = useQuery(api.languages.getAllLanguages);
  const seedLanguages = useMutation(api.languages.seedLanguages);
  const bookmarks = useQuery(api.bookmarks.getUserBookmarks);

  useEffect(() => {
    if (languages && languages.length === 0) {
      seedLanguages();
    }
  }, [languages, seedLanguages]);

  if (!languages) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const bookmarkedSlugs = new Set(bookmarks?.map(b => b.languageSlug) || []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Language</h1>
      </div>

      <div className="grid gap-4 md:gap-6">
        {languages.map((language) => (
          <div
            key={language._id}
            onClick={() => onSelectLanguage(language.slug)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-gray-100 hover:border-indigo-200"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{language.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{language.name}</h3>
                  {bookmarkedSlugs.has(language.slug) && (
                    <span className="text-yellow-500">⭐</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{language.description}</p>
                <p className="text-indigo-600 text-sm mt-2 font-medium">{language.purpose}</p>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        💡 Tip: Click on any language to explore learning resources and get started!
      </div>
    </div>
  );
}
