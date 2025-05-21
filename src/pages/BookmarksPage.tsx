import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useAuthStore } from '../store/authStore';
import { useBookmarkStore } from '../store/bookmarkStore';
import { 
  getSectionById, 
  getChapterById, 
  getActById 
} from '../data/mockData';
import { Bookmark, BookmarkX, Edit, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const BookmarksPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { getUserBookmarks, removeBookmark } = useBookmarkStore();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) {
    return null;
  }
  
  const userBookmarks = getUserBookmarks(user.id);
  
  // Get section, chapter, and act details for each bookmark
  const bookmarksWithDetails = userBookmarks.map(bookmark => {
    const section = getSectionById(bookmark.sectionId);
    const chapter = section ? getChapterById(section.chapterId) : undefined;
    const act = chapter ? getActById(chapter.actId) : undefined;
    
    return {
      ...bookmark,
      section,
      chapter,
      act,
    };
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const handleRemoveBookmark = (bookmarkId: string) => {
    if (window.confirm('Are you sure you want to remove this bookmark?')) {
      removeBookmark(bookmarkId);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-navy-900">
              Your Bookmarks
            </h1>
            <p className="mt-2 text-gray-600">
              Access your saved legal sections for easy reference.
            </p>
          </div>
          
          <Bookmark className="h-8 w-8 text-primary-600" />
        </div>
        
        {bookmarksWithDetails.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Bookmark className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-navy-800">No bookmarks yet</h3>
            <p className="mt-1 text-gray-600">
              Start browsing laws and bookmark sections for quick access.
            </p>
            <Link to="/laws">
              <Button variant="primary" className="mt-4">
                Browse Laws
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookmarksWithDetails.map(bookmark => (
              <div 
                key={bookmark.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-medium text-navy-800">
                        {bookmark.section?.title || 'Unknown Section'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Section {bookmark.section?.number} • {bookmark.act?.title}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                    >
                      <BookmarkX className="h-4 w-4 text-burgundy-500" />
                    </Button>
                  </div>
                  
                  {bookmark.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md text-gray-700 text-sm">
                      {bookmark.notes}
                    </div>
                  )}
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Bookmarked on {formatDate(bookmark.createdAt)}
                    </div>
                    
                    <div className="flex space-x-2">
                      {bookmark.act && bookmark.section && (
                        <Link to={`/acts/${bookmark.act.id}/${bookmark.section.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<ExternalLink className="h-3 w-3" />}
                          >
                            View
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};