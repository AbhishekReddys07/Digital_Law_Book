import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useAnnotationStore } from '../../store/annotationStore';

interface AnnotationFormProps {
  sectionId: string;
  userId: string;
  onComplete: () => void;
  existingAnnotation?: {
    id: string;
    content: string;
    isPublic: boolean;
  };
}

export const AnnotationForm: React.FC<AnnotationFormProps> = ({
  sectionId,
  userId,
  onComplete,
  existingAnnotation,
}) => {
  const [content, setContent] = useState(existingAnnotation?.content || '');
  const [isPublic, setIsPublic] = useState(existingAnnotation?.isPublic || false);
  const { addAnnotation, updateAnnotation } = useAnnotationStore();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    if (existingAnnotation) {
      updateAnnotation(existingAnnotation.id, content, isPublic);
    } else {
      addAnnotation(userId, sectionId, content, isPublic);
    }
    
    onComplete();
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-3">
        {existingAnnotation ? 'Edit Annotation' : 'Add Annotation'}
      </h3>
      
      <div className="mb-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          rows={4}
          placeholder="Write your annotation here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      
      <div className="flex items-center mb-4">
        <input
          id="public-checkbox"
          type="checkbox"
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <label htmlFor="public-checkbox" className="ml-2 block text-sm text-gray-700">
          Make this annotation public
        </label>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onComplete}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!content.trim()}
        >
          {existingAnnotation ? 'Update' : 'Save'}
        </Button>
      </div>
    </form>
  );
};