import React from 'react';
import '../Sidebar/Sidebar.css';
import { GangInformation } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Gang Information',
  component: GangInformation,
};

export const normal = () => <GangInformation gang="CRIPS" set="loco yoco" />;
export const empty = () => <GangInformation gang={null} set={undefined} />;
export const nullGang = () => <GangInformation gang={null} set="YOLO" />;
