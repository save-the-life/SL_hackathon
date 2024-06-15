import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { Card } from '@/shared/components/ui';
import Typography from '@/shared/components/typography';
import { useNavigate } from 'react-router-dom';

const diagnoses = [
  {
    type: 'Chest X-ray',
    date: 'May 15, 2024',
    hospital: 'A Hospital',
    diagnosisCompany: 'Company A',
    predictedDiagnosis: 'Pneumonia',
    imageUrl:
      'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
  },
  {
    type: 'Brain CT',
    date: 'April 15, 2024',
    hospital: 'B Hospital',
    diagnosisCompany: 'Company B',
    predictedDiagnosis: 'Brain Tumor',
    imageUrl:
      'https://images.unsplash.com/photo-1648025487829-b3a0b78e6e7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
  },
];

const RecentDiagnosis: React.FC = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/images', { state: { fromHome: true } });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <Typography.H3>Recent Diagnosis</Typography.H3>
        <Typography.Muted
          className="flex items-center cursor-pointer"
          onClick={handleViewAllClick}
        >
          View All <IoChevronForwardOutline />
        </Typography.Muted>
      </div>

      <div className="mt-2 space-y-4">
        {diagnoses.map((diagnosis, index) => (
          <Card
            key={index}
            className="rounded-3xl flex flex-row items-center gap-2 p-4 justify-between"
          >
            <div className="flex flex-col gap-3 md:gap-4 flex-1 min-w-0">
              <div className="flex flex-row gap-3 md:gap-4 items-center min-w-0">
                <img
                  src={diagnosis.imageUrl}
                  alt="Diagnosis"
                  className="w-16 h-16 md:w-32 md:h-32 rounded-2xl md:rounded-3xl"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-row items-center gap-3">
                    <Typography.H4>{diagnosis.type}</Typography.H4>
                    <Typography.Muted className="text-xs">
                      {diagnosis.date}
                    </Typography.Muted>
                  </div>
                  <Typography.Small>{diagnosis.hospital}</Typography.Small>
                  <div className="hidden md:block mt-2 truncate">
                    <Typography.Muted>
                      Diagnosis Company: {diagnosis.diagnosisCompany}
                    </Typography.Muted>
                    <Typography.Muted>
                      Predicted Diagnosis: {diagnosis.predictedDiagnosis}
                    </Typography.Muted>
                  </div>
                </div>
              </div>
              <div className="md:hidden min-w-0">
                <Typography.Muted className="truncate block">
                  Diagnosis Company: {diagnosis.diagnosisCompany}
                </Typography.Muted>
                <Typography.Muted className="truncate block">
                  Predicted Diagnosis: {diagnosis.predictedDiagnosis}
                </Typography.Muted>
              </div>
            </div>
            <IoChevronForwardOutline className="w-6 h-6 md:w-8 md:h-8" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentDiagnosis;
