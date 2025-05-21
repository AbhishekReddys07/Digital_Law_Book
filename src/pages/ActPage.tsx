import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { SectionContent } from '../components/law/SectionContent';
import { 
  getActById, 
  getChaptersByActId, 
  getSectionsByChapterId,
  getSectionById,
  jurisdictions,
  lawTypes
} from '../data/mockData';
import { ChevronRight, ChevronDown, BookOpen, CalendarIcon, ClockIcon } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const ActPage: React.FC = () => {
  const { actId, sectionId: urlSectionId } = useParams<{ actId: string; sectionId?: string }>();
  const [expandedChapters, setExpandedChapters] = useState<{ [key: string]: boolean }>({});
  const [selectedSectionId, setSelectedSectionId] = useState<string | undefined>(urlSectionId);
  
  const act = actId ? getActById(actId) : undefined;
  const chapters = actId ? getChaptersByActId(actId) : [];
  
  const selectedSection = selectedSectionId 
    ? getSectionById(selectedSectionId)
    : undefined;
  
  if (!act) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-navy-900">
              Act Not Found
            </h1>
            <Link to="/laws" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
              Back to Laws
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };
  
  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId);
  };
  
  const jurisdiction = jurisdictions.find(j => j.id === act.jurisdictionId);
  const lawType = lawTypes.find(lt => lt.id === act.lawTypeId);
  
  // Format the last updated date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Act Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center mb-2 text-sm text-gray-600">
                <Link to="/laws" className="text-primary-600 hover:text-primary-700">
                  Jurisdictions
                </Link>
                <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                {jurisdiction && (
                  <>
                    <Link to={`/laws/${jurisdiction.id}`} className="text-primary-600 hover:text-primary-700">
                      {jurisdiction.name}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                  </>
                )}
                <span className="font-medium">{act.title}</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy-900">
                {act.title}
              </h1>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {lawType && (
                  <Badge variant="primary">{lawType.name}</Badge>
                )}
                <Badge variant="secondary">{act.year}</Badge>
              </div>
              
              <p className="mt-4 text-gray-600">
                {act.description}
              </p>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{chapters.length} Chapters</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Enacted: {act.year}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Last Updated: {formatDate(act.lastUpdated)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-4">
              <div className="p-4 bg-navy-50 border-b border-gray-200">
                <h2 className="text-lg font-medium text-navy-900">Table of Contents</h2>
              </div>
              
              <div className="p-4">
                <ul className="space-y-2">
                  {chapters.map(chapter => {
                    const isExpanded = expandedChapters[chapter.id] || false;
                    const sections = getSectionsByChapterId(chapter.id);
                    
                    return (
                      <li key={chapter.id}>
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                        >
                          <span className="font-medium text-navy-800">
                            Chapter {chapter.number}: {chapter.title}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                        
                        {isExpanded && sections.length > 0 && (
                          <ul className="mt-1 ml-4 space-y-1">
                            {sections.map(section => (
                              <li key={section.id}>
                                <button
                                  onClick={() => handleSectionClick(section.id)}
                                  className={`w-full text-left p-2 rounded text-sm hover:bg-gray-50 ${
                                    selectedSectionId === section.id
                                      ? 'bg-primary-50 text-primary-700 font-medium'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  Section {section.number}: {section.title}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Main Content - Selected Section */}
          <div className="lg:col-span-2">
            {selectedSection ? (
              <SectionContent section={selectedSection} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-serif font-bold text-navy-900 mb-4">
                  About this Act
                </h2>
                <p className="text-gray-600 mb-6">
                  {act.description}
                </p>
                <div className="text-gray-700">
                  <p>Select a section from the table of contents to view its details.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};