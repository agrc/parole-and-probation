import HomeButton from './DefaultExtent';

export default {
  title: 'MapTools/DefaultExtent',
  component: HomeButton,
  decorators: [(Story) => <div className="esri-ui-top-left esri-ui-corner">{Story()}</div>],
  argTypes: {
    goTo: { action: 'goTo' },
  },
};

export const Normal = (args) => <HomeButton view={{ goTo: args.goTo, ui: { add: () => {} } }} extent={{}}></HomeButton>;
