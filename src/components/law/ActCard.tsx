import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, MapPin, CheckCircle, Link as LinkIcon } from 'lucide-react';
import { Act } from '../../types';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ActCardProps {
  act: Act;
  lawTypeName?: string;
}

export const ActCard: React.FC<ActCardProps> = ({ act, lawTypeName }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Link to={`/acts/${act.id}`}>
      <Card hover className="h-full transition-transform transform hover:scale-[1.02]">
        <CardBody>
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-serif font-bold text-navy-800">
              {act.title}
            </h3>
            <div className="flex gap-2">
              <Badge variant="primary" size="sm">{act.year}</Badge>
              <Badge 
                variant={act.scope === 'national' ? 'info' : act.scope === 'state' ? 'warning' : 'success'} 
                size="sm"
              >
                {act.scope}
              </Badge>
            </div>
          </div>
          
          {lawTypeName && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <BookOpen className="h-4 w-4 mr-1.5 text-gray-500" />
              <span>{lawTypeName}</span>
            </div>
          )}
          
          <div className="mt-1 flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1.5 text-gray-500" />
            <span>Enacted: {act.year}</span>
          </div>
          
          <div className="mt-1 flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
            <span>Updated: {formatDate(act.lastUpdated)}</span>
          </div>
          
          {act.verifiedAt && (
            <div className="mt-1 flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1.5" />
              <span>Verified: {formatDate(act.verifiedAt)}</span>
            </div>
          )}
          
          {act.sourceUrl && (
            <div className="mt-1 flex items-center text-sm text-primary-600">
              <LinkIcon className="h-4 w-4 mr-1.5" />
              <span>Official Source Available</span>
            </div>
          )}
          
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {act.description}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
};