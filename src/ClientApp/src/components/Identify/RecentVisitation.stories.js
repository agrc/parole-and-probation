import React from 'react';
import '../Sidebar/Sidebar.css';
import { RecentVisitation } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Recent Visitation',
  component: RecentVisitation,
};

export const Normal = () => <RecentVisitation office={10} successful={1} attempted={15} />;
export const EmptyOffice = () => <RecentVisitation office="" successful={1} attempted={15} />;
export const EmptySuccess = () => <RecentVisitation office={10} successful={null} attempted={15} />;
export const EmptyAttempted = () => <RecentVisitation office={10} successful={1} attempted={null} />;
