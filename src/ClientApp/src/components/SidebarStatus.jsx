import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FallbackComponent } from './ErrorBoundary';
import { Filters } from './Filters/Filters';
import { IdentifyContainer, IdentifyInformation } from './Identify/Identify';

export const SideBarStatus = ({ status, dispatcher, app, user, identifyOptions }) => {
  if (status === 'pending' || status === 'empty') {
    return (
      <Skeleton count={15} containerClassName="container-fluid accordion-pane mb-1 card" style={{ height: '50px' }} />
    );
  }

  if (status === 'error') {
    return <div className="text-center">Error</div>;
  }

  if (status === 'success') {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <IdentifyContainer visible={app.identify.show} show={identifyOptions.show}>
          <IdentifyInformation {...identifyOptions} />
        </IdentifyContainer>
        <Filters
          mapDispatcher={dispatcher}
          loggedInUser={{
            value: user.name,
            id: parseInt(user.id),
          }}
          visible={!app.identify.show}
          appliedFilter={app.appliedFilter}
          featureSet={app.featureSet}
        />
      </ErrorBoundary>
    );
  }

  return null;
};
SideBarStatus.propTypes = {
  status: PropTypes.string.isRequired,
  dispatcher: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  identifyOptions: PropTypes.object.isRequired,
  app: PropTypes.object,
};
