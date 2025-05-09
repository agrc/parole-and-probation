import { Label, ToggleButton } from '@ugrc/utah-design-system';
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
    <div className="w-full grid gap-2">
      <div>
        <Label>Legal Status</Label>
        <div className="flex gap-x-2 justify-center">
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
        <Label>Standard of Supervision</Label>
        <div className="flex gap-x-1 justify-center">
          {['no std', 'low', 'mod', 'hi', 'int'].map((sos, index) => (
            <ToggleButton
              className="p-2 min-w-10 rounded-full min-h-0"
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
        <Label>Special Supervision</Label>
        <MultiSelect
          items={supervisionItems}
          currentSelectedItems={props.criteria.supervision}
          itemToString={itemToString}
          itemToKey={itemToKey}
          titleCaseItem={false}
          onSelectItem={(item) => update('supervision', item, true)}
        />
        {props.criteria.supervision.length > 0 ? (
          <SelectedItems
            titleCaseItem={false}
            itemToKey={itemToKey}
            itemToString={itemToString}
            items={props.criteria.supervision}
            clickHandler={(event) => update('supervision', event.target.id, false)}
          />
        ) : null}
      </div>
      <div>
        <Label>Gang Name</Label>
        <MultiSelect
          items={mainGangs}
          currentSelectedItems={props.criteria.gang}
          itemToString={itemToString}
          itemToKey={itemToKey}
          onSelectItem={(item) => update('gang', item, true)}
        />
        {props.criteria.gang.length > 0 ? (
          <SelectedItems
            items={props.criteria.gang}
            itemToKey={itemToKey}
            itemToString={itemToString}
            clickHandler={(event) => update('gang', event.target.id, false)}
          />
        ) : null}
      </div>
      <div>
        <Label>Offense Type</Label>
        <MultiSelect
          items={offenseTypes}
          currentSelectedItems={props.criteria.offense}
          itemToString={itemToString}
          itemToKey={itemToKey}
          titleCaseItem={false}
          onSelectItem={(item) => update('offense', item, true)}
        />
        {props.criteria.offense.length > 0 ? (
          <SelectedItems
            items={props.criteria.offense}
            titleCaseItem={false}
            itemToKey={itemToKey}
            itemToString={itemToString}
            clickHandler={(event) => update('offense', event.target.id, false)}
          />
        ) : null}
      </div>
      <div>
        <Label>Active Warrant</Label>
        <div className="flex gap-x-2 justify-center">
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
