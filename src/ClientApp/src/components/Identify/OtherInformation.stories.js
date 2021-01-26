import React from 'react';
import '../Sidebar/Sidebar.css';
import { OtherInformation } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Other Information',
  component: OtherInformation,
};

export const Normal = () => <OtherInformation supervision_start_date={1535750000000} ecc={1535750000000} />;
export const Empty = () => <OtherInformation supervision_start_date={null} ecc={null} />;
