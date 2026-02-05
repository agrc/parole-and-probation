import { ToggleButton } from '@ugrc/utah-design-system';
import PropTypes from 'prop-types';
import { InputTypeAhead } from '../Combobox/Combobox';

const type = 'UPDATE_OFFENDER';

export default function FilterOffender(props) {
  return (
    <div className="w-full">
      <form autoComplete="off" className="grid gap-2">
        <div>
          <InputTypeAhead
            label="Name"
            featureSet={props.featureSet}
            currentValue={props.criteria.name}
            itemToString={(item) => item?.attributes?.offender || ''}
            itemToKey={(item) => item?.attributes?.offender_id || ''}
            reducerDescriptor={{ type, field: 'name' }}
            dispatch={props.update}
          />
        </div>
        <div>
          <InputTypeAhead
            label="Offender Number"
            featureSet={props.featureSet}
            currentValue={props.criteria.number}
            itemToString={(item) => item?.attributes?.offender_id?.toString() || ''}
            itemToKey={(item) => item?.attributes?.offender_id || ''}
            itemToSortValue={(item) => item?.attributes?.offender_id}
            reducerDescriptor={{ type, field: 'number' }}
            dispatch={props.update}
          />
        </div>
        <div>
          <div className="mb-1 w-fit text-sm font-medium text-zinc-700 dark:text-zinc-300">Gender</div>
          <div className="flex justify-center gap-x-2" role="group" aria-label="Gender">
            <div className="flex justify-center gap-x-2">
              {['Male', 'Female'].map((payload, index) => (
                <ToggleButton
                  key={index}
                  isSelected={props.criteria.gender === payload}
                  onPress={() => {
                    if (props.criteria.gender === payload) {
                      payload = null;
                    }

                    props.update({ type, payload, meta: 'gender' });
                  }}
                >
                  {payload}
                </ToggleButton>
              ))}
            </div>
          </div>
        </div>
        <div>
          <InputTypeAhead
            label="Phone"
            featureSet={props.featureSet}
            currentValue={props.criteria.tel}
            itemToString={(item) => item?.attributes?.offender_phone || ''}
            itemToKey={(item) => item?.attributes?.offender_id || ''}
            reducerDescriptor={{ type, field: 'tel' }}
            dispatch={props.update}
          />
        </div>
        <div>
          <InputTypeAhead
            label="Employer"
            featureSet={props.featureSet}
            currentValue={props.criteria.employer}
            itemToString={(item) => item?.attributes?.employer || ''}
            itemToKey={(item) => item?.attributes?.offender_id || ''}
            reducerDescriptor={{ type, field: 'employer' }}
            dispatch={props.update}
          />
        </div>
      </form>
    </div>
  );
}
FilterOffender.propTypes = {
  featureSet: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.shape({
        offender: PropTypes.string,
        offender_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        offender_phone: PropTypes.string,
        employer: PropTypes.string,
      }),
    }),
  ).isRequired,
  criteria: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
    gender: PropTypes.string,
    tel: PropTypes.string,
    employer: PropTypes.string,
  }).isRequired,
  update: PropTypes.func.isRequired,
};
