import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { 
  searchSections, 
  getActById, 
  getChapterById,
  jurisdictions,
  lawTypes,
  getActsByJurisdictionAndType,
  acts
} from '../data/mockData';
import { Section } from '../types';
import { Search, Filter, X, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdictionId, setJurisdictionId] = useState<string | undefined>(undefined);
  const [lawTypeId, setLawTypeId] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<Section[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Generate a list of unique years from acts
  const availableYears = [...new Set(acts.map(act => act.year))].sort((a, b) => b - a);
  
  // Get available law types based on selected jurisdiction
  const availableLawTypes = jurisdictionId 
    ? lawTypes.filter(lt => lt.jurisdictionId === jurisdictionId)
    : lawTypes;
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = searchSections(searchQuery);
      
      // Filter results based on additional criteria
      const filteredResults = results.filter(section => {
        const act = getActById(getChapterById(section.chapterId)?.actId || '');
        
        if (!act) return false;
        
        if (jurisdictionId && act.jurisdictionId !== jurisdictionId) return false;
        if (lawTypeId && act.lawTypeId !== lawTypeId) return false;
        if (year && act.year !== parseInt(year)) return false;
        
        return true;
      });
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 500);
  };
  
  const resetFilters = () => {
    setJurisdictionId(undefined);
    setLawTypeId(undefined);
    setYear(undefined);
  };
  
  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch();
    }
  }, [jurisdictionId, lawTypeId, year]);
  
  const getActAndChapterInfo = (section: Section) => {
    const chapter = getChapterById(section.chapterId);
    const act = chapter ? getActById(chapter.actId) : undefined;
    
    return {
      actTitle: act?.title || 'Unknown Act',
      actId: act?.id,
      chapterTitle: chapter?.title || 'Unknown Chapter',
      chapterNumber: chapter?.number,
    };
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-navy-900">
            Search Legal Database
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Search across acts, chapters, and sections by keyword, phrase, or section number.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-grow">
              <Input
                label="Search Query"
                placeholder="Enter keywords, phrases, or section numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                leftIcon={<Search className="h-4 w-4" />}
                fullWidth
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={handleSearch}
                isLoading={isSearching}
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter className="h-4 w-4" />}
              >
                Filters
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-navy-800">Search Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<X className="h-4 w-4" />}
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jurisdiction
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    value={jurisdictionId || ''}
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      setJurisdictionId(value);
                      // Reset law type if jurisdiction changes
                      if (value !== jurisdictionId) {
                        setLawTypeId(undefined);
                      }
                    }}
                  >
                    <option value="">All Jurisdictions</option>
                    {jurisdictions.map(j => (
                      <option key={j.id} value={j.id}>
                        {j.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Law Type
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    value={lawTypeId || ''}
                    onChange={(e) => setLawTypeId(e.target.value || undefined)}
                    disabled={availableLawTypes.length === 0}
                  >
                    <option value="">All Law Types</option>
                    {availableLawTypes.map(lt => (
                      <option key={lt.id} value={lt.id}>
                        {lt.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <select
                    className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                    value={year || ''}
                    onChange={(e) => setYear(e.target.value || undefined)}
                  >
                    <option value="">All Years</option>
                    {availableYears.map(y => (
                      <option key={y} value={y.toString()}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Results */}
        <div>
          {searchQuery.trim() && (
            <div className="mb-4">
              <h2 className="text-xl font-medium text-navy-900">
                {isSearching ? (
                  'Searching...'
                ) : (
                  searchResults.length > 0 ? (
                    `Found ${searchResults.length} results for "${searchQuery}"`
                  ) : (
                    `No results found for "${searchQuery}"`
                  )
                )}
              </h2>
            </div>
          )}
          
          {searchResults.length > 0 && (
            <div className="space-y-4">
              {searchResults.map(section => {
                const { actTitle, actId, chapterTitle, chapterNumber } = getActAndChapterInfo(section);
                
                // Extract a content snippet
                const contentSnippet = section.content.substring(0, 200) + (section.content.length > 200 ? '...' : '');
                
                return (
                  <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
                    <div className="p-6">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-serif font-bold text-navy-800 mb-1">
                          Section {section.number}: {section.title}
                        </h3>
                        <Link 
                          to={actId ? `/acts/${actId}/${section.id}` : '#'}
                          className="text-primary-600 hover:text-primary-700 flex items-center"
                        >
                          View 
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        {actTitle} • Chapter {chapterNumber}: {chapterTitle}
                      </div>
                      
                      <p className="text-gray-700">
                        {contentSnippet}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {!searchQuery.trim() && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <Search className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-navy-800">Search the Legal Database</h3>
              <p className="mt-1 text-gray-600">
                Enter keywords, phrases, or section numbers to find relevant legal content.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};