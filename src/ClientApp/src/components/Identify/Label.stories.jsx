import { IdentifyAddon } from './Labels';

export default {
  title: 'Labels/IdentifyAddon',
  component: IdentifyAddon,
};

export const EmptyWithImplicitDefault = () => <IdentifyAddon></IdentifyAddon>;
export const EmptyWithExplicitDefault = () => <IdentifyAddon defaultValue="empty"></IdentifyAddon>;
export const EmptyWithNull = () => <IdentifyAddon defaultValue={null}></IdentifyAddon>;
export const Basic = () => <IdentifyAddon>Basic</IdentifyAddon>;
export const Danger = () => <IdentifyAddon danger={1}>Danger</IdentifyAddon>;
export const Border = () => <IdentifyAddon border>Border</IdentifyAddon>;
export const Lower = () => <IdentifyAddon lower>LOWER</IdentifyAddon>;
export const Age = () => <IdentifyAddon age="2025-04-01">years old</IdentifyAddon>;
export const Date = () => <IdentifyAddon date>2025-04-01</IdentifyAddon>;
export const All = () => (
  <IdentifyAddon age="2025-04-01" defaultValue="error" danger="1" border lower>
    YEARS old
  </IdentifyAddon>
);
