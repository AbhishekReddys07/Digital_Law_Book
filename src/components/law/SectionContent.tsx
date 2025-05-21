import React, { useState } from 'react';
import { Section, User } from '../../types';
import { Bookmark, BookmarkCheck, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useBookmarkStore } from '../../store/bookmarkStore';
import { AnnotationForm } from './AnnotationForm';
import { AnnotationList } from './AnnotationList';

interface SectionContentProps {
  section: Section;
}

export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  
  const { user, isAuthenticated } = useAuthStore();
  const { 
    addBookmark, 
    removeBookmark, 
    isBookmarked, 
    getBookmarkForSection 
  } = useBookmarkStore();
  
  const isBookmarkedByUser = user ? isBookmarked(user.id, section.id) : false;
  const bookmark = user ? getBookmarkForSection(user.id, section.id) : undefined;
  
  const handleBookmarkToggle = () => {
    if (!user) return;
    
    if (isBookmarkedByUser && bookmark) {
      removeBookmark(bookmark.id);
    } else {
      addBookmark(user.id, section.id);
    }
  };
  
  const handleShareSection = () => {
    const url = `${window.location.origin}/sections/${section.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Section ${section.number}: ${section.title}`,
        text: `Check out this legal section: ${section.title}`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch((error) => {
          console.error('Failed to copy: ', error);
        });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 bg-navy-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-navy-900">
            Section {section.number}: {section.title}
          </h2>
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={isBookmarkedByUser ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                onClick={handleBookmarkToggle}
              >
                {isBookmarkedByUser ? 'Bookmarked' : 'Bookmark'}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Share2 className="h-4 w-4" />}
              onClick={handleShareSection}
            >
              Share
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-5">
        <div className="prose max-w-none">
          {section.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          Last updated: {new Date(section.lastUpdated).toLocaleDateString()}
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            leftIcon={<MessageSquare className="h-4 w-4" />}
            onClick={() => setShowAnnotations(!showAnnotations)}
          >
            View Annotations
          </Button>
          
          {isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnnotationForm(!showAnnotationForm)}
            >
              {showAnnotationForm ? 'Cancel' : 'Add Annotation'}
            </Button>
          )}
        </div>
        
        {showAnnotationForm && isAuthenticated && user && (
          <div className="mt-4">
            <AnnotationForm 
              sectionId={section.id} 
              userId={user.id} 
              onComplete={() => setShowAnnotationForm(false)}
            />
          </div>
        )}
        
        {showAnnotations && (
          <div className="mt-4">
            <AnnotationList sectionId={section.id} />
          </div>
        )}
      </div>
    </div>
  );
};