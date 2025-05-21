import { Jurisdiction, LawType, Act, Chapter, Section, User, Bookmark, Annotation } from '../types';

export const jurisdictions: Jurisdiction[] = [
  {
    id: 'jur-1',
    name: 'India',
    code: 'IN',
    type: 'country',
    scope: 'national',
    flagUrl: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg',
  },
  {
    id: 'jur-2',
    name: 'Karnataka',
    code: 'KA',
    type: 'state',
    scope: 'state',
    parent: 'jur-1',
    flagUrl: 'https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg',
  },
  {
    id: 'jur-3',
    name: 'Bengaluru',
    code: 'BLR',
    type: 'city',
    scope: 'municipal',
    parent: 'jur-2',
    flagUrl: 'https://images.pexels.com/photos/3573383/pexels-photo-3573383.jpeg',
  },
];

export const lawTypes: LawType[] = [
  {
    id: 'lt-1',
    name: 'Traffic Rules',
    description: 'Traffic regulations and motor vehicle laws',
    jurisdictionId: 'jur-2',
    scope: 'state',
    category: 'traffic',
  },
  {
    id: 'lt-2',
    name: 'Municipal By-laws',
    description: 'Local governance and civic regulations',
    jurisdictionId: 'jur-3',
    scope: 'municipal',
    category: 'municipal',
  },
  {
    id: 'lt-3',
    name: 'Environmental Norms',
    description: 'Pollution control and environmental protection',
    jurisdictionId: 'jur-2',
    scope: 'state',
    category: 'environmental',
  },
];

export const acts: Act[] = [
  {
    id: 'act-1',
    title: 'Karnataka Motor Vehicles Rules',
    description: 'Comprehensive traffic rules and regulations for Karnataka',
    year: 2021,
    lawTypeId: 'lt-1',
    jurisdictionId: 'jur-2',
    scope: 'state',
    lastUpdated: '2023-11-05T12:00:00Z',
    sourceUrl: 'https://transport.karnataka.gov.in/rules',
    verifiedAt: '2023-11-05T12:00:00Z',
    verifiedBy: 'user-2',
  },
  {
    id: 'act-2',
    title: 'BBMP Solid Waste Management Bylaws',
    description: 'Municipal regulations for waste management in Bengaluru',
    year: 2020,
    lawTypeId: 'lt-2',
    jurisdictionId: 'jur-3',
    scope: 'municipal',
    lastUpdated: '2023-08-15T10:30:00Z',
    sourceUrl: 'https://bbmp.gov.in/bylaws',
    verifiedAt: '2023-08-15T10:30:00Z',
    verifiedBy: 'user-2',
  },
];

export const chapters: Chapter[] = [
  {
    id: 'ch-1',
    actId: 'act-1',
    title: 'Fundamental Rights',
    number: 3,
  },
  {
    id: 'ch-2',
    actId: 'act-1',
    title: 'Directive Principles of State Policy',
    number: 4,
  },
  {
    id: 'ch-3',
    actId: 'act-2',
    title: 'General Explanations',
    number: 1,
  },
  {
    id: 'ch-4',
    actId: 'act-2',
    title: 'Of Offences Against the State',
    number: 6,
  },
];

export const sections: Section[] = [
  {
    id: 'sec-1',
    chapterId: 'ch-1',
    title: 'Right to Equality',
    number: '14',
    content: `The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.

This provision enshrines the general principle of equality and non-discrimination. It declares that all persons shall be equally protected by the laws of the country. It means that the State will not distinguish between or discriminate against any citizens on the basis of religion, caste, creed, sex or place of birth.`,
    lastUpdated: '2023-02-10T08:20:00Z',
  },
  {
    id: 'sec-2',
    chapterId: 'ch-1',
    title: 'Right against Exploitation',
    number: '23',
    content: `(1) Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention of this provision shall be an offence punishable in accordance with law.

(2) Nothing in this article shall prevent the State from imposing compulsory service for public purposes, and in imposing such service the State shall not make any discrimination on grounds only of religion, race, caste or class or any of them.`,
    lastUpdated: '2023-01-15T11:10:00Z',
  },
  {
    id: 'sec-3',
    chapterId: 'ch-2',
    title: 'Equal justice and free legal aid',
    number: '39A',
    content: `The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.`,
    lastUpdated: '2022-12-05T16:30:00Z',
  },
  {
    id: 'sec-4',
    chapterId: 'ch-3',
    title: 'Punishment of offences committed within India',
    number: '2',
    content: `Every person shall be liable to punishment under this Code and not otherwise for every act or omission contrary to the provisions thereof, of which he shall be guilty within India.`,
    lastUpdated: '2023-03-20T09:45:00Z',
  },
];

export const users: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'curator',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const bookmarks: Bookmark[] = [
  {
    id: 'bm-1',
    userId: 'user-1',
    sectionId: 'sec-1',
    createdAt: '2023-04-10T14:25:00Z',
    notes: 'Important for equality case research',
  },
  {
    id: 'bm-2',
    userId: 'user-1',
    sectionId: 'sec-4',
    createdAt: '2023-04-12T09:15:00Z',
  },
];

export const annotations: Annotation[] = [
  {
    id: 'anno-1',
    userId: 'user-1',
    sectionId: 'sec-1',
    content: 'This is the basis for several landmark Supreme Court judgments including the Maneka Gandhi case.',
    createdAt: '2023-04-15T10:30:00Z',
    updatedAt: '2023-04-15T10:30:00Z',
    isPublic: true,
  },
  {
    id: 'anno-2',
    userId: 'user-2',
    sectionId: 'sec-3',
    content: 'This directive principle has been the foundation for several legal aid programs.',
    createdAt: '2023-04-16T16:45:00Z',
    updatedAt: '2023-04-16T16:45:00Z',
    isPublic: true,
  },
];

// Helper functions
export const getJurisdictionHierarchy = (jurisdictionId: string): Jurisdiction[] => {
  const jurisdiction = jurisdictions.find(j => j.id === jurisdictionId);
  if (!jurisdiction) return [];

  const hierarchy = [jurisdiction];
  let currentParent = jurisdiction.parent;

  while (currentParent) {
    const parent = jurisdictions.find(j => j.id === currentParent);
    if (parent) {
      hierarchy.unshift(parent);
      currentParent = parent.parent;
    } else {
      break;
    }
  }

  return hierarchy;
};

export const getLawsByScope = (scope: 'national' | 'state' | 'municipal', jurisdictionId: string): Act[] => {
  const hierarchy = getJurisdictionHierarchy(jurisdictionId);
  const jurisdictionIds = hierarchy.map(j => j.id);
  
  return acts.filter(act => 
    jurisdictionIds.includes(act.jurisdictionId) && 
    act.scope === scope
  );
};

export const getActById = (actId: string): Act | undefined => {
  return acts.find(act => act.id === actId);
};

export const getChapterById = (chapterId: string): Chapter | undefined => {
  return chapters.find(chapter => chapter.id === chapterId);
};

export const getSectionById = (sectionId: string): Section | undefined => {
  return sections.find(section => section.id === sectionId);
};

export const getChaptersByActId = (actId: string): Chapter[] => {
  return chapters.filter(chapter => chapter.actId === actId);
};

export const getSectionsByChapterId = (chapterId: string): Section[] => {
  return sections.filter(section => section.chapterId === chapterId);
};

export const searchSections = (query: string): Section[] => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return sections.filter(section => 
    section.title.toLowerCase().includes(lowerQuery) || 
    section.content.toLowerCase().includes(lowerQuery) ||
    section.number.toLowerCase().includes(lowerQuery)
  );
};

export const getActsByJurisdictionAndType = (jurisdictionId?: string, lawTypeId?: string): Act[] => {
  return acts.filter(act => 
    (!jurisdictionId || act.jurisdictionId === jurisdictionId) &&
    (!lawTypeId || act.lawTypeId === lawTypeId)
  );
};

export const getLawTypesByJurisdiction = (jurisdictionId: string): LawType[] => {
  return lawTypes.filter(lawType => lawType.jurisdictionId === jurisdictionId);
};

export const getBookmarksByUser = (userId: string): Bookmark[] => {
  return bookmarks.filter(bookmark => bookmark.userId === userId);
};

export const getAnnotationsBySection = (sectionId: string): Annotation[] => {
  return annotations.filter(annotation => annotation.sectionId === sectionId);
};

export const getAnnotationsByUser = (userId: string): Annotation[] => {
  return annotations.filter(annotation => annotation.userId === userId);
};