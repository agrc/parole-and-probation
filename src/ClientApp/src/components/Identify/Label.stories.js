import * as React from 'react';
import { IdentifyAddon } from './Labels';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Labels/IdentifyAddon',
};

export const emptyWithImplicitDefault = () => <IdentifyAddon></IdentifyAddon>;
export const emptyWithExplicitDefault = () => <IdentifyAddon defaultValue="empty"></IdentifyAddon>;
export const emptyWithNull = () => <IdentifyAddon defaultValue={null}></IdentifyAddon>;
export const basic = () => <IdentifyAddon>Basic</IdentifyAddon>;
export const danger = () => <IdentifyAddon danger="1">Danger</IdentifyAddon>;
export const border = () => <IdentifyAddon border>Border</IdentifyAddon>;
export const lower = () => <IdentifyAddon lower>LOWER</IdentifyAddon>;
export const age = () => <IdentifyAddon age="648950400000">years old</IdentifyAddon>;
export const date = () => <IdentifyAddon date>648950400000</IdentifyAddon>;
export const all = () => (
  <IdentifyAddon age="648950400000" defaultValue="error" danger="1" border lower>
    YEARS old
  </IdentifyAddon>
);
