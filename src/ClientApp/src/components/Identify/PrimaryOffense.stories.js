import React from 'react';
import '../Sidebar/Sidebar.css';
import { PrimaryOffense } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Primary Offense',
  component: PrimaryOffense,
};

export const normal = () => (
  <PrimaryOffense primary_offense="PERSON" degree="F3" description="i did something very bad" />
);
export const emptyOffenseOrDegree = () => <PrimaryOffense primary_offense="" degree="" description="hello" />;
export const nullAndUndefined = () => (
  <PrimaryOffense primary_offense="ROBBERY" degree={undefined} description={null} />
);
