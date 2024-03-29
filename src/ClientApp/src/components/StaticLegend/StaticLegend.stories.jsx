import StaticLegend from './StaticLegend';

export default {
  title: 'Legend/StaticLegend',
  component: StaticLegend,
};

export const NoLegend = () => <StaticLegend />;
export const Basic = () => (
  <StaticLegend
    legend={[
      {
        label: 'test',
        color: '#2ecc40',
      },
    ]}
  />
);
export const FourColors = () => (
  <StaticLegend
    legend={[
      {
        label: 'test',
        color: '#001f3f',
      },
      {
        label: 'test2',
        color: '#0074d9',
      },
      {
        label: 'test3',
        color: '#7fdbff',
      },
      {
        label: 'test4',
        color: '#39cccc',
      },
    ]}
  />
);
export const TextOverflow = () => (
  <StaticLegend
    legend={[
      {
        label:
          'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        color: '#001f3f',
      },
      {
        label: 'test2',
        color: '#0074d9',
      },
      {
        label: 'test3',
        color: '#7fdbff',
        inverse: true,
      },
      {
        label: 'test4',
        color: '#39cccc',
      },
    ]}
  />
);
export const InvertText = () => (
  <StaticLegend
    legend={[
      {
        label: 'test3',
        color: '#39cccc',
        invert: true,
      },
    ]}
  />
);
