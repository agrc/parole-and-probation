import React from 'react';
import '../Sidebar/Sidebar.css';
import { OffenderAlerts } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Offender Alerts',
  component: OffenderAlerts,
};

export const normal = () => <OffenderAlerts cautions="cautions" alerts="alerts" />;
export const emptyCautions = () => <OffenderAlerts cautions="" alerts="alerts" />;
export const emptyAlerts = () => <OffenderAlerts cautions="cautions" alerts={null} />;
export const allEmpty = () => <OffenderAlerts cautions={null} alerts={null} />;
