
import React from 'react';
import StudentsTabContent from './students-tab/StudentsTabContent';
import { StudentsTabProps } from './students-tab/types';

const StudentsTab: React.FC<StudentsTabProps> = (props) => {
  return <StudentsTabContent {...props} />;
};

export default StudentsTab;
