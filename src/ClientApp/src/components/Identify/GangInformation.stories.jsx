import '../Sidebar/Sidebar.css';
import { GangInformation } from './Identify';

export default {
  title: 'Identify/Gang Information',
  component: GangInformation,
};

export const Normal = () => <GangInformation gang="CRIPS" set="loco yoco" />;
export const Empty = () => <GangInformation gang={null} set={undefined} />;
export const NullGang = () => <GangInformation gang={null} set="YOLO" />;
