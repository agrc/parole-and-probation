import React from 'react';
import '../Sidebar/Sidebar.css';
import { RecentVisitation } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Recent Visitation',
  component: RecentVisitation,
};

export const normal = () => <RecentVisitation office={10} successful={1} attempted={15} />;
export const emptyOffice = () => <RecentVisitation office="" successful={1} attempted={15} />;
export const emptySuccess = () => <RecentVisitation office={10} successful={null} attempted={15} />;
export const emptyAttempted = () => <RecentVisitation office={10} successful={1} attempted={null} />;
