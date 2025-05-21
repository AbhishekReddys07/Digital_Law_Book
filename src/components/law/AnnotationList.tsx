import React, { useState } from 'react';
import { useAnnotationStore } from '../../store/annotationStore';
import { useAuthStore } from '../../store/authStore';
import { users } from '../../data/mockData';
import { Edit, Trash2, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { AnnotationForm } from './AnnotationForm';

interface AnnotationListProps {
  sectionId: string;
}

export const AnnotationList: React.FC<AnnotationListProps> = ({ sectionId }) => {
  const [editingAnnotationId, setEditingAnnotationId] = useState<string | null>(null);
  
  const { user } = useAuthStore();
  const { 
    getSectionAnnotations, 
    getSectionPublicAnnotations,
    deleteAnnotation
  } = useAnnotationStore();
  
  const allAnnotations = user 
    ? getSectionAnnotations(sectionId)
    : getSectionPublicAnnotations(sectionId);
  
  // Sort annotations by date (newest first)
  const sortedAnnotations = [...allAnnotations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId);
  };
  
  const handleEdit = (annotationId: string) => {
    setEditingAnnotationId(annotationId);
  };
  
  const handleDelete = (annotationId: string) => {
    if (window.confirm('Are you sure you want to delete this annotation?')) {
      deleteAnnotation(annotationId);
    }
  };
  
  if (sortedAnnotations.length === 0) {
    return <div className="text-gray-500 py-4">No annotations available.</div>;
  }
  
  return (
    <div className="space-y-4">
      {sortedAnnotations.map(annotation => {
        const annotationUser = getUserById(annotation.userId);
        const isCurrentUserAnnotation = user?.id === annotation.userId;
        
        if (editingAnnotationId === annotation.id && user) {
          return (
            <div key={annotation.id} className="mb-4">
              <AnnotationForm
                sectionId={sectionId}
                userId={user.id}
                onComplete={() => setEditingAnnotationId(null)}
                existingAnnotation={{
                  id: annotation.id,
                  content: annotation.content,
                  isPublic: annotation.isPublic,
                }}
              />
            </div>
          );
        }
        
        return (
          <div 
            key={annotation.id} 
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {annotationUser?.avatarUrl ? (
                  <img 
                    src={annotationUser.avatarUrl} 
                    alt={annotationUser.name}
                    className="h-8 w-8 rounded-full mr-2" 
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-navy-800">
                    {annotationUser?.name || 'Unknown User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(annotation.updatedAt).toLocaleString()}
                    {annotation.isPublic && (
                      <span className="ml-2 text-primary-600">• Public</span>
                    )}
                  </p>
                </div>
              </div>
              
              {isCurrentUserAnnotation && (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleEdit(annotation.id)}
                  >
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleDelete(annotation.id)}
                  >
                    <Trash2 className="h-4 w-4 text-burgundy-500" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-2 text-gray-800">
              {annotation.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};