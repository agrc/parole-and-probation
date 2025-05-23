import { PrimaryOffense } from './Identify';

export default {
  title: 'Identify/Primary Offense',
  component: PrimaryOffense,
};

export const Normal = () => (
  <PrimaryOffense primary_offense="PERSON" degree="F3" description="i did something very bad" />
);
export const EmptyOffenseOrDegree = () => <PrimaryOffense primary_offense="" degree="" description="hello" />;
export const NullAndUndefined = () => (
  <PrimaryOffense primary_offense="ROBBERY" degree={undefined} description={null} />
);
