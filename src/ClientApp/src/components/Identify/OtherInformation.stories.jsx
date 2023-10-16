import '../Sidebar/Sidebar.css';
import { OtherInformation } from './Identify';

export default {
  title: 'Identify/Other Information',
  component: OtherInformation,
};

export const Normal = () => <OtherInformation supervision_start_date={1535750000000} ecc={1535750000000} />;
export const Empty = () => <OtherInformation supervision_start_date={null} ecc={null} />;
