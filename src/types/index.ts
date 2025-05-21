export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'curator' | 'admin' | 'law_enforcement' | 'municipal_admin';
  avatarUrl?: string;
  jurisdiction?: {
    country: string;
    state?: string;
    city?: string;
  };
}

export interface Jurisdiction {
  id: string;
  name: string;
  code: string;
  flagUrl?: string;
  parent?: string;
  type: 'country' | 'state' | 'city';
  scope: 'national' | 'state' | 'municipal';
}

export interface LawType {
  id: string;
  name: string;
  description: string;
  jurisdictionId: string;
  scope: 'national' | 'state' | 'municipal';
  category: 'general' | 'traffic' | 'municipal' | 'environmental' | 'construction' | 'police' | 'transport' | 'tax';
}

export interface Act {
  id: string;
  title: string;
  description: string;
  year: number;
  lawTypeId: string;
  jurisdictionId: string;
  lastUpdated: string;
  scope: 'national' | 'state' | 'municipal';
  sourceUrl?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  amendments?: Amendment[];
}

export interface Amendment {
  id: string;
  actId: string;
  description: string;
  date: string;
  sourceUrl?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface Chapter {
  id: string;
  actId: string;
  title: string;
  number: number;
}

export interface Section {
  id: string;
  chapterId: string;
  title: string;
  number: string;
  content: string;
  lastUpdated: string;
  applicableJurisdictions?: string[];
  fines?: Fine[];
  precedents?: Precedent[];
}

export interface Fine {
  id: string;
  amount: number;
  currency: string;
  description: string;
  jurisdictionId: string;
  lastUpdated: string;
}

export interface Precedent {
  id: string;
  title: string;
  citation: string;
  summary: string;
  date: string;
  court: string;
  url?: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  sectionId: string;
  createdAt: string;
  notes?: string;
}

export interface Annotation {
  id: string;
  userId: string;
  sectionId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  verifiedBy?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

export interface SearchFilters {
  jurisdictionId?: string;
  lawTypeId?: string;
  year?: number;
  scope?: 'national' | 'state' | 'municipal';
  category?: string;
  query: string;
}