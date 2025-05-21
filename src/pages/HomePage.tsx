import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { JurisdictionCard } from '../components/law/JurisdictionCard';
import { jurisdictions } from '../data/mockData';
import { Search, BookOpen, Bookmark, MessageSquare, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy-900 to-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight animate-fade-in">
              Your Digital Law Book for Legal Research
            </h1>
            <p className="mt-6 text-xl text-gray-300 animate-fade-in delay-100">
              Access laws, acts, and legal amendments in a structured, searchable, and user-friendly interface.
              Perfect for students, professionals, and anyone interested in legal information.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:gap-4 gap-3 animate-fade-in delay-200">
              <Link to="/laws">
                <Button size="lg" variant="primary" leftIcon={<BookOpen className="h-5 w-5" />}>
                  Browse Laws
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="border-gray-500 text-white hover:bg-navy-700" leftIcon={<Search className="h-5 w-5" />}>
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Jurisdictions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-navy-900">
              Browse by Jurisdiction
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Access legal information organized by jurisdiction, making it easy to find the laws that apply to your region.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jurisdictions.map(jurisdiction => (
              <JurisdictionCard key={jurisdiction.id} jurisdiction={jurisdiction} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-navy-900">
              Key Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides powerful tools to enhance your legal research experience.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-800">Full-Text Search</h3>
              <p className="mt-3 text-gray-600">
                Search across all legal content by keyword, phrase, act title, or section number.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Bookmark className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-800">Bookmarking</h3>
              <p className="mt-3 text-gray-600">
                Save important legal sections for quick access in future research sessions.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-800">Annotations</h3>
              <p className="mt-3 text-gray-600">
                Add personal notes or public comments to specific law sections for deeper analysis.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-800">Update Notifications</h3>
              <p className="mt-3 text-gray-600">
                Receive alerts when an act is amended or new laws are added to the database.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-800">Law Summarization</h3>
              <p className="mt-3 text-gray-600">
                View condensed summaries or highlights for quick understanding of complex legal texts.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-navy-800">Cross-Referencing</h3>
              <p className="mt-3 text-gray-600">
                Navigate through hyperlinked related sections, clauses, and referenced cases.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold">
            Start Your Legal Research Today
          </h2>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
            Join thousands of law students, professionals, and researchers who rely on our platform for accurate and accessible legal information.
          </p>
          <div className="mt-10">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};