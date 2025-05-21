import { create } from 'zustand';
import { Annotation } from '../types';
import { annotations as initialAnnotations } from '../data/mockData';

interface AnnotationState {
  annotations: Annotation[];
  isLoading: boolean;
  addAnnotation: (userId: string, sectionId: string, content: string, isPublic: boolean) => void;
  updateAnnotation: (annotationId: string, content: string, isPublic: boolean) => void;
  deleteAnnotation: (annotationId: string) => void;
  getUserAnnotations: (userId: string) => Annotation[];
  getSectionAnnotations: (sectionId: string) => Annotation[];
  getSectionPublicAnnotations: (sectionId: string) => Annotation[];
}

export const useAnnotationStore = create<AnnotationState>((set, get) => ({
  annotations: [...initialAnnotations],
  isLoading: false,
  
  addAnnotation: (userId, sectionId, content, isPublic) => {
    const timestamp = new Date().toISOString();
    
    const newAnnotation: Annotation = {
      id: `anno-${Date.now()}`,
      userId,
      sectionId,
      content,
      createdAt: timestamp,
      updatedAt: timestamp,
      isPublic,
    };
    
    set(state => ({
      annotations: [...state.annotations, newAnnotation]
    }));
  },
  
  updateAnnotation: (annotationId, content, isPublic) => {
    set(state => ({
      annotations: state.annotations.map(annotation => 
        annotation.id === annotationId 
        ? { 
            ...annotation, 
            content, 
            isPublic,
            updatedAt: new Date().toISOString() 
          } 
        : annotation
      )
    }));
  },
  
  deleteAnnotation: (annotationId) => {
    set(state => ({
      annotations: state.annotations.filter(annotation => annotation.id !== annotationId)
    }));
  },
  
  getUserAnnotations: (userId) => {
    return get().annotations.filter(annotation => annotation.userId === userId);
  },
  
  getSectionAnnotations: (sectionId) => {
    return get().annotations.filter(annotation => annotation.sectionId === sectionId);
  },
  
  getSectionPublicAnnotations: (sectionId) => {
    return get().annotations.filter(
      annotation => annotation.sectionId === sectionId && annotation.isPublic
    );
  },
}));