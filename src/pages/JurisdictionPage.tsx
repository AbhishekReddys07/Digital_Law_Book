import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ActCard } from '../components/law/ActCard';
import { 
  jurisdictions, 
  getLawTypesByJurisdiction, 
  getActsByJurisdictionAndType,
  lawTypes,
  getJurisdictionHierarchy,
  getLawsByScope
} from '../data/mockData';
import { Filter, Search, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export const JurisdictionPage: React.FC = () => {
  const { jurisdictionId } = useParams<{ jurisdictionId: string }>();
  const [selectedLawTypeId, setSelectedLawTypeId] = useState<string | null>(null);
  const [selectedScope, setSelectedScope] = useState<'national' | 'state' | 'municipal' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const jurisdiction = jurisdictions.find(j => j.id === jurisdictionId);
  const jurisdictionHierarchy = jurisdictionId ? getJurisdictionHierarchy(jurisdictionId) : [];
  
  const jurisdictionLawTypes = jurisdictionId 
    ? getLawTypesByJurisdiction(jurisdictionId)
    : [];
  
  // Get acts based on jurisdiction and filters
  const acts = jurisdictionId 
    ? (selectedScope 
        ? getLawsByScope(selectedScope, jurisdictionId)
        : getActsByJurisdictionAndType(jurisdictionId, selectedLawTypeId || undefined))
    : [];
  
  // Filter acts by search query if provided
  const filteredActs = searchQuery.trim()
    ? acts.filter(act => 
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : acts;
  
  // Reset filters when jurisdiction changes
  useEffect(() => {
    setSelectedLawTypeId(null);
    setSelectedScope(null);
    setSearchQuery('');
  }, [jurisdictionId]);
  
  if (!jurisdiction) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-navy-900">
              Jurisdiction Not Found
            </h1>
            <Link to="/laws" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
              Back to Jurisdictions
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const getLawTypeName = (id: string) => {
    const lawType = lawTypes.find(lt => lt.id === id);
    return lawType ? lawType.name : '';
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Jurisdiction Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center mb-2">
              <Link to="/laws" className="text-primary-600 hover:text-primary-700">
                Jurisdictions
              </Link>
              {jurisdictionHierarchy.map((j, index) => (
                <React.Fragment key={j.id}>
                  <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                  {j.id === jurisdiction.id ? (
                    <span className="font-medium text-navy-900">{j.name}</span>
                  ) : (
                    <Link to={`/laws/${j.id}`} className="text-primary-600 hover:text-primary-700">
                      {j.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-serif font-bold text-navy-900">
                Laws of {jurisdiction.name}
              </h1>
              <Badge 
                variant={jurisdiction.scope === 'national' ? 'info' : jurisdiction.scope === 'state' ? 'warning' : 'success'}
              >
                {jurisdiction.scope}
              </Badge>
            </div>
            <p className="mt-2 text-gray-600">
              Browse through the acts and laws of {jurisdiction.name}.
            </p>
          </div>
          
          {jurisdiction.flagUrl && (
            <div className="mt-4 md:mt-0">
              <img
                src={jurisdiction.flagUrl}
                alt={`${jurisdiction.name} flag`}
                className="h-24 w-auto object-cover rounded shadow-sm"
              />
            </div>
          )}
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="h-4 w-4 inline-block mr-1" />
                Scope
              </label>
              <select
                className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                value={selectedScope || ''}
                onChange={(e) => setSelectedScope((e.target.value || null) as any)}
              >
                <option value="">All Scopes</option>
                <option value="national">National</option>
                <option value="state">State</option>
                <option value="municipal">Municipal</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Filter className="h-4 w-4 inline-block mr-1" />
                Law Type
              </label>
              <select
                className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                value={selectedLawTypeId || ''}
                onChange={(e) => setSelectedLawTypeId(e.target.value || null)}
              >
                <option value="">All Law Types</option>
                {jurisdictionLawTypes.map(lawType => (
                  <option key={lawType.id} value={lawType.id}>
                    {lawType.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-2/4">
              <Input
                label="Search Acts"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
                fullWidth
              />
            </div>
          </div>
        </div>
        
        {/* Acts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActs.length > 0 ? (
            filteredActs.map(act => (
              <ActCard 
                key={act.id} 
                act={act} 
                lawTypeName={getLawTypeName(act.lawTypeId)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-lg text-gray-600">
                {searchQuery.trim() 
                  ? `No acts found matching "${searchQuery}"`
                  : 'No acts available for this filter selection.'
                }
              </p>
              {(searchQuery.trim() || selectedScope || selectedLawTypeId) && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedScope(null);
                    setSelectedLawTypeId(null);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};