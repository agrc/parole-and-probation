import React from 'react';
import '../Sidebar/Sidebar.css';
import { OffenderAlerts } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Offender Alerts',
  component: OffenderAlerts,
};

export const Normal = () => <OffenderAlerts cautions="cautions" alerts="alerts" />;
export const EmptyCautions = () => <OffenderAlerts cautions="" alerts="alerts" />;
export const EmptyAlerts = () => <OffenderAlerts cautions="cautions" alerts={null} />;
export const AllEmpty = () => <OffenderAlerts cautions={null} alerts={null} />;
