import { create } from 'zustand';
import { Bookmark } from '../types';
import { bookmarks as initialBookmarks, getSectionById } from '../data/mockData';

interface BookmarkState {
  bookmarks: Bookmark[];
  isLoading: boolean;
  addBookmark: (userId: string, sectionId: string, notes?: string) => void;
  removeBookmark: (bookmarkId: string) => void;
  updateBookmarkNotes: (bookmarkId: string, notes: string) => void;
  getUserBookmarks: (userId: string) => Bookmark[];
  isBookmarked: (userId: string, sectionId: string) => boolean;
  getBookmarkForSection: (userId: string, sectionId: string) => Bookmark | undefined;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [...initialBookmarks],
  isLoading: false,
  
  addBookmark: (userId, sectionId, notes) => {
    const section = getSectionById(sectionId);
    if (!section) return;
    
    const newBookmark: Bookmark = {
      id: `bm-${Date.now()}`,
      userId,
      sectionId,
      createdAt: new Date().toISOString(),
      notes,
    };
    
    set(state => ({
      bookmarks: [...state.bookmarks, newBookmark]
    }));
  },
  
  removeBookmark: (bookmarkId) => {
    set(state => ({
      bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
    }));
  },
  
  updateBookmarkNotes: (bookmarkId, notes) => {
    set(state => ({
      bookmarks: state.bookmarks.map(bookmark => 
        bookmark.id === bookmarkId 
        ? { ...bookmark, notes } 
        : bookmark
      )
    }));
  },
  
  getUserBookmarks: (userId) => {
    return get().bookmarks.filter(bookmark => bookmark.userId === userId);
  },
  
  isBookmarked: (userId, sectionId) => {
    return get().bookmarks.some(
      bookmark => bookmark.userId === userId && bookmark.sectionId === sectionId
    );
  },
  
  getBookmarkForSection: (userId, sectionId) => {
    return get().bookmarks.find(
      bookmark => bookmark.userId === userId && bookmark.sectionId === sectionId
    );
  },
}));