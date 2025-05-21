import React from 'react';
import { Link } from 'react-router-dom';
import { Jurisdiction } from '../../types';
import { Card, CardBody } from '../ui/Card';

interface JurisdictionCardProps {
  jurisdiction: Jurisdiction;
}

export const JurisdictionCard: React.FC<JurisdictionCardProps> = ({ jurisdiction }) => {
  return (
    <Link to={`/laws/${jurisdiction.id}`}>
      <Card hover className="h-full transition-transform transform hover:scale-[1.02]">
        <div className="aspect-video w-full overflow-hidden">
          {jurisdiction.flagUrl && (
            <img
              src={jurisdiction.flagUrl}
              alt={`${jurisdiction.name} flag`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <CardBody>
          <h3 className="text-xl font-serif font-bold text-navy-800">
            {jurisdiction.name}
          </h3>
          <div className="mt-2 text-sm text-gray-600">
            Browse laws for {jurisdiction.name}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};