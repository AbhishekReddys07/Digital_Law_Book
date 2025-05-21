import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useAuthStore } from '../store/authStore';
import { useAnnotationStore } from '../store/annotationStore';
import { 
  getSectionById, 
  getChapterById, 
  getActById 
} from '../data/mockData';
import { MessageSquare, Trash2, Edit, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AnnotationsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { getUserAnnotations, deleteAnnotation } = useAnnotationStore();
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
  
  const userAnnotations = getUserAnnotations(user.id);
  
  // Get section, chapter, and act details for each annotation
  const annotationsWithDetails = userAnnotations.map(annotation => {
    const section = getSectionById(annotation.sectionId);
    const chapter = section ? getChapterById(section.chapterId) : undefined;
    const act = chapter ? getActById(chapter.actId) : undefined;
    
    return {
      ...annotation,
      section,
      chapter,
      act,
    };
  });
  
  // Sort annotations by date (newest first)
  const sortedAnnotations = [...annotationsWithDetails].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const handleDeleteAnnotation = (annotationId: string) => {
    if (window.confirm('Are you sure you want to delete this annotation?')) {
      deleteAnnotation(annotationId);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-navy-900">
              Your Annotations
            </h1>
            <p className="mt-2 text-gray-600">
              View and manage your notes on legal sections.
            </p>
          </div>
          
          <MessageSquare className="h-8 w-8 text-primary-600" />
        </div>
        
        {sortedAnnotations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-navy-800">No annotations yet</h3>
            <p className="mt-1 text-gray-600">
              Start browsing laws and add annotations to sections.
            </p>
            <Link to="/laws">
              <Button variant="primary" className="mt-4">
                Browse Laws
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedAnnotations.map(annotation => (
              <div 
                key={annotation.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-medium text-navy-800">
                        {annotation.section?.title || 'Unknown Section'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Section {annotation.section?.number} • {annotation.act?.title}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAnnotation(annotation.id)}
                      >
                        <Trash2 className="h-4 w-4 text-burgundy-500" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-md text-gray-700">
                    {annotation.content}
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-xs text-gray-500">
                        Last updated: {formatDate(annotation.updatedAt)}
                      </div>
                      {annotation.isPublic ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Public
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Private
                        </span>
                      )}
                    </div>
                    
                    {annotation.act && annotation.section && (
                      <Link to={`/acts/${annotation.act.id}/${annotation.section.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<ExternalLink className="h-3 w-3" />}
                        >
                          View Section
                        </Button>
                      </Link>
                    )}
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