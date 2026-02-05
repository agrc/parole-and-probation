import { ToggleButton } from '@ugrc/utah-design-system';
import PropTypes from 'prop-types';
import { MultiSelect, SelectedItems } from '../Combobox/Combobox';
import { mainGangs, offenseTypes, supervisionItems } from './lookupData';

const type = 'UPDATE_OTHER';

const itemToString = (item) => (item ? item.name : '');
const itemToKey = (item) => (item ? item.id : '');

export default function FilterOther(props) {
  const update = (meta, value, add) => {
    if (!value) {
      return;
    }

    props.update({
      type,
      meta,
      payload: {
        value,
        add,
      },
    });
  };

  return (
    <div className="grid w-full gap-2">
      <div>
        <div className="mb-1 w-fit text-sm font-medium text-zinc-700 dark:text-zinc-300">Legal Status</div>
        <div className="flex justify-center gap-x-2" role="group" aria-label="Legal Status">
          {['probation', 'parole'].map((payload, index) => (
            <ToggleButton
              key={index}
              isSelected={props.criteria.status === payload}
              onPress={() => {
                if (props.criteria.status === payload) {
                  payload = null;
                }

                props.update({ type, payload, meta: 'status' });
              }}
            >
              {payload}
            </ToggleButton>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 w-fit text-sm font-medium text-zinc-700 dark:text-zinc-300">Standard of Supervision</div>
        <div className="flex justify-center gap-x-1" role="group" aria-label="Standard of Supervision">
          {['no std', 'low', 'mod', 'hi', 'int'].map((sos, index) => (
            <ToggleButton
              className="min-h-0 min-w-10 rounded-full p-2"
              key={index}
              isSelected={props.criteria.sos.indexOf(sos) > -1}
              onPress={() => props.update({ type, payload: sos, meta: 'sos' })}
            >
              {sos}
            </ToggleButton>
          ))}
        </div>
      </div>
      <div>
        <MultiSelect
          label="Special Supervision"
          items={supervisionItems}
          currentSelectedItems={props.criteria.supervision}
          itemToString={itemToString}
          itemToKey={itemToKey}
          titleCaseItem={false}
          onSelectItem={(item) => update('supervision', item, true)}
        />
        {props.criteria.supervision.length > 0 ? (
          <SelectedItems
            label="Special Supervision"
            titleCaseItem={false}
            itemToKey={itemToKey}
            itemToString={itemToString}
            items={props.criteria.supervision}
            clickHandler={(event) => update('supervision', event.target.id, false)}
          />
        ) : null}
      </div>
      <div>
        <MultiSelect
          label="Gang Name"
          items={mainGangs}
          currentSelectedItems={props.criteria.gang}
          itemToString={itemToString}
          itemToKey={itemToKey}
          onSelectItem={(item) => update('gang', item, true)}
        />
        {props.criteria.gang.length > 0 ? (
          <SelectedItems
            label="Gang Name"
            items={props.criteria.gang}
            itemToKey={itemToKey}
            itemToString={itemToString}
            clickHandler={(event) => update('gang', event.target.id, false)}
          />
        ) : null}
      </div>
      <div>
        <MultiSelect
          label="Offense Type"
          items={offenseTypes}
          currentSelectedItems={props.criteria.offense}
          itemToString={itemToString}
          itemToKey={itemToKey}
          titleCaseItem={false}
          onSelectItem={(item) => update('offense', item, true)}
        />
        {props.criteria.offense.length > 0 ? (
          <SelectedItems
            label="Offense Type"
            items={props.criteria.offense}
            titleCaseItem={false}
            itemToKey={itemToKey}
            itemToString={itemToString}
            clickHandler={(event) => update('offense', event.target.id, false)}
          />
        ) : null}
      </div>
      <div>
        <div className="mb-1 w-fit text-sm font-medium text-zinc-700 dark:text-zinc-300">Active Warrant</div>
        <div className="flex justify-center gap-x-2" role="group" aria-label="Active Warrant">
          {['Yes', 'No'].map((payload, index) => (
            <ToggleButton
              key={index}
              isSelected={props.criteria.warrant === payload}
              onPress={() => {
                if (props.criteria.warrant === payload) {
                  payload = null;
                }

                props.update({ type, payload, meta: 'warrant' });
              }}
            >
              {payload}
            </ToggleButton>
          ))}
        </div>
      </div>
    </div>
  );
}
FilterOther.propTypes = {
  criteria: PropTypes.shape({
    status: PropTypes.string,
    sos: PropTypes.arrayOf(PropTypes.string),
    supervision: PropTypes.arrayOf(PropTypes.object),
    gang: PropTypes.arrayOf(PropTypes.object),
    offense: PropTypes.arrayOf(PropTypes.object),
    warrant: PropTypes.string,
  }).isRequired,
  update: PropTypes.func.isRequired,
};
