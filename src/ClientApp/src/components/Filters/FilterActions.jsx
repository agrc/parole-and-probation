import { Button } from '@ugrc/utah-design-system';
import PropTypes from 'prop-types';

export default function FilterActions(props) {
  return (
    <div className="pt-5 flex justify-evenly pb-3">
      <Button size="extraLarge" variant="destructive" onPress={props.reset}>
        Reset
      </Button>
      <Button size="extraLarge" variant="primary" onPress={props.show}>
        Close
      </Button>
    </div>
  );
}
FilterActions.propTypes = {
  reset: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};
