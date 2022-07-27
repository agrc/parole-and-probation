import { Filters } from '../Filters';
import FilterActions from './FilterActions';
import './FilterActions.css';

const story = {
  title: 'Filters/FilterActions',
  component: FilterActions,
};

export default story;

export const Normal = () => <FilterActions></FilterActions>;

export const Reset = () => (
  <Filters
    initialState={{
      agent: {
        loggedInUser: null,
        agentList: [],
        supervisor: [],
        vanity: true,
      },
      date: {
        compliant: 'in',
        office: 90,
        attempt: 180,
        success: 60,
      },
      location: {
        region: [1, 3],
        zip: '88888',
        city: 'City',
        counties: ['County', 'County2'],
      },
      offender: {
        gender: 'Male',
        name: 'Story book',
        number: '123123',
        tel: '123-123-1233',
        employer: 'Storybook Inc',
      },
      other: {
        warrant: 'Yes',
        status: 'probation',
        sos: ['hi', 'mod'],
        supervision: [
          { name: 'CCC', id: 'ccc' },
          { name: 'SO', id: 'so' },
        ],
        gang: [{ name: 'Crips', id: 'crip' }],
        offense: [
          { name: 'Jerk', id: 'A' },
          { name: 'Drunk', id: 'D' },
        ],
      },
    }}
    mapDispatcher={() => {}}
    loggedInUser={{
      value: 'hi',
      id: 1,
    }}
    visible={true}
    appliedFilter={''}
    featureSet={[]}
  />
);
