import { Label, ToggleButton } from '@ugrc/utah-design-system';
import PropTypes from 'prop-types';
import { supervisionContactDays } from './lookupData';

const type = 'UPDATE_DATE';

export default function FilterDate(props) {
  return (
    <div className="w-full grid gap-2">
      <div>
        <Label>Compliance</Label>
        <div className="flex gap-x-2 justify-center">
          {['in', 'out'].map((payload, index) => (
            <ToggleButton
              className="p-2 min-w-10 rounded-full min-h-0"
              key={index}
              isSelected={props.criteria.compliant === payload}
              onPress={() => {
                if (props.criteria.compliant === payload) {
                  payload = null;
                }

                props.update({ type, payload, meta: 'compliant' });
              }}
            >
              {payload}
            </ToggleButton>
          ))}
        </div>
      </div>
      <div>
        <Label>No attempted field contact within</Label>
        <div className="flex gap-x-2 justify-center">
          {supervisionContactDays.map((payload, index) => (
            <ToggleButton
              className="p-2 min-w-10 rounded-full min-h-0"
              key={index}
              isSelected={props.criteria.attempt === payload}
              onPress={() => {
                if (props.criteria.attempt === payload) {
                  payload = null;
                }

                props.update({ type, payload, meta: 'attempt' });
              }}
            >
              {payload}
            </ToggleButton>
          ))}
        </div>
      </div>
      <div>
        <Label>No successful field contact within</Label>
        <div className="flex gap-x-2 justify-center">
          {supervisionContactDays.map((payload, index) => (
            <ToggleButton
              className="p-2 min-w-10 rounded-full min-h-0"
              key={index}
              isSelected={props.criteria.success === payload}
              onPress={() => {
                if (props.criteria.success === payload) {
                  payload = null;
                }

                props.update({ type, payload, meta: 'success' });
              }}
            >
              {payload}
            </ToggleButton>
          ))}
        </div>
      </div>
      <div>
        <Label>No office contact within</Label>
        <div className="flex gap-x-2 justify-center">
          {supervisionContactDays.map((payload, index) => (
            <ToggleButton
              className="p-2 min-w-10 rounded-full min-h-0"
              key={index}
              isSelected={props.criteria.office === payload}
              onPress={() => {
                if (props.criteria.office === payload) {
                  payload = null;
                }

                props.update({ type, payload, meta: 'office' });
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
FilterDate.propTypes = {
  criteria: PropTypes.shape({
    compliant: PropTypes.string,
    attempt: PropTypes.number,
    success: PropTypes.number,
    office: PropTypes.number,
  }).isRequired,
  update: PropTypes.func.isRequired,
};
