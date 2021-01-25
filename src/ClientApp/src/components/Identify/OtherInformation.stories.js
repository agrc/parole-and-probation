import React from 'react';
import '../Sidebar/Sidebar.css';
import { OtherInformation } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Other Information',
  component: OtherInformation,
};

export const normal = () => <OtherInformation supervision_start_date={1535760000000} ecc={1535760000000} />;
export const empty = () => <OtherInformation supervision_start_date={null} ecc={null} />;
