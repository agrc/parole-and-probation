import { Label, ToggleButton } from '@ugrc/utah-design-system';
import PropTypes from 'prop-types';
import { InputTypeAhead, MultiSelect, SelectedItems } from '../Combobox/Combobox';
import { counties } from './lookupData';

const type = 'UPDATE_LOCATION';

export default function FilterLocation(props) {
  const updateCounties = (item, add) => {
    if (!item) {
      return;
    }

    props.update({
      type,
      payload: { item, add },
      meta: 'counties',
    });
  };

  const defaultItemToKey = (item) => item?.attributes?.offender_id || '';

  return (
    <div className="w-full">
      <form autoComplete="off" className="grid gap-2">
        <div>
          <Label>City</Label>
          <InputTypeAhead
            featureSet={props.featureSet}
            currentValue={props.criteria.city}
            itemToString={(item) => item?.attributes?.city || ''}
            itemToKey={defaultItemToKey}
            reducerDescriptor={{ type, field: 'city' }}
            dispatch={props.update}
          />
        </div>
        <div>
          <Label>Zip</Label>
          <InputTypeAhead
            featureSet={props.featureSet}
            currentValue={props.criteria.zip}
            itemToString={(item) => item?.attributes?.zip.toString() || ''}
            itemToKey={defaultItemToKey}
            reducerDescriptor={{ type, field: 'zip' }}
            dispatch={props.update}
          />
        </div>
        <div>
          <Label>County</Label>
          <MultiSelect
            items={counties}
            currentSelectedItems={props.criteria.counties}
            onSelectItem={(item) => updateCounties(item, true)}
          />
          {props.criteria.counties.length > 0 ? (
            <SelectedItems
              items={props.criteria.counties}
              clickHandler={(event) => {
                updateCounties(event.target.id, false);
              }}
            />
          ) : null}
        </div>
        <div>
          <Label>Region</Label>
          <div className="flex gap-x-1 justify-center">
            {[1, 3, 4, 5, 6].map((region) => (
              <ToggleButton
                key={region}
                className="px-2 min-h-0 min-w-6"
                isSelected={props.criteria.region.indexOf(region) > -1}
                size="sm"
                onPress={() => props.update({ type, payload: region, meta: 'region' })}
              >
                {region}
              </ToggleButton>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
FilterLocation.propTypes = {
  featureSet: PropTypes.object.isRequired,
  criteria: PropTypes.shape({
    city: PropTypes.string,
    zip: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    counties: PropTypes.arrayOf(PropTypes.string),
    region: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  update: PropTypes.func.isRequired,
};
