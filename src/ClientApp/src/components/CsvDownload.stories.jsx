import Item from './CsvDownload';

export default {
  title: 'MapTools/CsvDownload',
  component: Item,
  decorators: [(Story) => <div className="esri-ui-top-left esri-ui-corner">{Story()}</div>],
};

export const Normal = () => <Item />;
export const Busy = () => <Item disabled={true} />;
export const Success = () => <Item status={true} />;
export const Fail = () => <Item status={false} />;
