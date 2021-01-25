import React from 'react';
import '../Sidebar/Sidebar.css';
import { OffenderContactInfo } from './Identify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'Identify/Contact Information',
  component: OffenderContactInfo,
};

export const normal = () => (
  <OffenderContactInfo
    phone={'801-111-1111'}
    address={'123 sesame street'}
    unit={'#1'}
    city={'salt lake city'}
    zip={84101}
    type={'1st Primary'}
    since={1535760000000}
    employer={'ACME'}
    employer_address={'123 Street Drive'}
    employer_phone={'801-222-2222'}
  />
);
export const emptyPhones = () => (
  <OffenderContactInfo
    phone={null}
    address={'123 sesame street'}
    unit={'#1'}
    city={'salt lake city'}
    zip={84101}
    type={'1st Primary'}
    since={1535760000000}
    employer={'ACME'}
    employer_address={'123 Street Drive'}
  />
);
export const emptyAddressType = () => (
  <OffenderContactInfo
    phone={'801-111-1111'}
    address={'123 sesame street'}
    unit={'#1'}
    city={'salt lake city'}
    zip={84101}
    since={1535760000000}
    employer={'ACME'}
    employer_address={'123 Street Drive'}
    employer_phone={'801-222-2222'}
  />
);
export const noUnit = () => (
  <OffenderContactInfo
    phone={'801-111-1111'}
    address={'123 sesame street'}
    city={'salt lake city'}
    zip={84101}
    type={'1st Primary'}
    since={1535760000000}
    employer={'ACME'}
    employer_address={'123 Street Drive'}
    employer_phone={'801-222-2222'}
  />
);
export const emptySince = () => (
  <OffenderContactInfo
    phone={'801-111-1111'}
    address={'123 sesame street'}
    city={'salt lake city'}
    zip={84101}
    type={'1st Primary'}
    since={null}
    employer={'ACME'}
    employer_address={'123 Street Drive'}
    employer_phone={'801-222-2222'}
  />
);
export const emptyEmployer = () => (
  <OffenderContactInfo
    phone={'801-111-1111'}
    address={'123 sesame street'}
    city={'salt lake city'}
    zip={84101}
    type={'1st Primary'}
    employer_address={'123 Street Drive'}
    employer_phone={'801-222-2222'}
  />
);
export const emptyEmployerAddress = () => (
  <OffenderContactInfo
    phone={'801-111-1111'}
    address={'123 sesame street'}
    city={'salt lake city'}
    zip={84101}
    type={'1st Primary'}
    since={null}
    employer={'ACME'}
    employer_phone={'801-222-2222'}
  />
);
