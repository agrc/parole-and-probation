import * as React from 'react';
import { IdentifyAddon } from './Labels';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Labels/IdentifyAddon',
  component: IdentifyAddon,
};

export const EmptyWithImplicitDefault = () => <IdentifyAddon></IdentifyAddon>;
export const EmptyWithExplicitDefault = () => <IdentifyAddon defaultValue="empty"></IdentifyAddon>;
export const EmptyWithNull = () => <IdentifyAddon defaultValue={null}></IdentifyAddon>;
export const Basic = () => <IdentifyAddon>Basic</IdentifyAddon>;
export const Danger = () => <IdentifyAddon danger="1">Danger</IdentifyAddon>;
export const Border = () => <IdentifyAddon border>Border</IdentifyAddon>;
export const Lower = () => <IdentifyAddon lower>LOWER</IdentifyAddon>;
export const Age = () => <IdentifyAddon age="648949400000">years old</IdentifyAddon>;
export const Date = () => <IdentifyAddon date>648949400000</IdentifyAddon>;
export const All = () => (
  <IdentifyAddon age="648949400000" defaultValue="error" danger="1" border lower>
    YEARS old
  </IdentifyAddon>
);
