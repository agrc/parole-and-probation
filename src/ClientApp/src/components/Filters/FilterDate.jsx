import { ToggleButton } from '@ugrc/utah-design-system';
import PropTypes from 'prop-types';
import { supervisionContactDays } from './lookupData';

const type = 'UPDATE_DATE';

export default function FilterDate(props) {
  return (
    <div className="grid w-full gap-2">
      <div>
        <div className="mb-1 w-fit text-sm font-medium text-zinc-700 dark:text-zinc-300">Compliance</div>
        <div className="flex justify-center gap-x-2" role="group" aria-label="Compliance">
          {['in', 'out'].map((payload, index) => (
            <ToggleButton
              className="min-h-0 min-w-10 rounded-full p-2"
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
        <div className="mb-1 w-fit text-sm font-medium text-zinc-700 dark:text-zinc-300">
          No attempted field contact within
        </div>
        <div className="flex justify-center gap-x-2" role="group" aria-label="No attempted field contact within">
          {supervisionContactDays.map((payload, index) => (
            <ToggleButton
              className="min-h-0 min-w-10 rounded-full p-2"
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
        <div className="mb-1 w-fit text-sm font-medium text-zinc-700 dark:text-zinc-300">
          No successful field contact within
        </div>
        <div className="flex justify-center gap-x-2" role="group" aria-label="No successful field contact within">
          {supervisionContactDays.map((payload, index) => (
            <ToggleButton
              className="min-h-0 min-w-10 rounded-full p-2"
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
        <div className="mb-1 w-fit text-sm font-medium text-zinc-700 dark:text-zinc-300">No office contact within</div>
        <div className="flex justify-center gap-x-2" role="group" aria-label="No office contact within">
          {supervisionContactDays.map((payload, index) => (
            <ToggleButton
              className="min-h-0 min-w-10 rounded-full p-2"
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
