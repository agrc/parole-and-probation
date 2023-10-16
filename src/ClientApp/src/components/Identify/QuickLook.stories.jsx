import '../Sidebar/Sidebar.css';
import { OffenderQuickLook } from './Identify';

export default {
  title: 'Identify/Offender quick look',
  component: OffenderQuickLook,
};

export const Normal = () => (
  <OffenderQuickLook
    age={412153200000}
    gender="M"
    standard_of_supervision="LOW"
    legal_status="PROBATION"
    active_warrant={0}
    offender="Last name, middle first"
    race={'WHITE'}
    id={999999}
    agent="Agent Orange"
  />
);
export const NoSos = () => (
  <OffenderQuickLook
    age={412153200000}
    gender="M"
    legal_status="PROBATION"
    active_warrant={0}
    offender="Last name, middle first"
    race={null}
    id={999999}
    agent="Agent Orange"
  />
);
export const ActiveWarrant = () => (
  <OffenderQuickLook
    age={412153200000}
    gender="M"
    legal_status="PROBATION"
    active_warrant={1}
    offender="Last name, middle first"
    race={null}
    id={999999}
    agent="Agent Orange"
  />
);
