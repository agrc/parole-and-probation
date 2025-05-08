import { RecentVisitation } from './Identify';

export default {
  title: 'Identify/Recent Visitation',
  component: RecentVisitation,
};

export const Normal = () => <RecentVisitation office={10} successful={1} attempted={15} />;
export const EmptyOffice = () => <RecentVisitation office="" successful={1} attempted={15} />;
export const EmptySuccess = () => <RecentVisitation office={10} successful={null} attempted={15} />;
export const EmptyAttempted = () => <RecentVisitation office={10} successful={1} attempted={null} />;
