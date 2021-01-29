import * as React from 'react';
import useViewUiPosition from '../../useViewUiPosition';

export default function MapLoadingIndicator({ view, position }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const me = useViewUiPosition(view, position);

  React.useEffect(() => {
    const init = () => {
      view.watch('updating', (updating) => setIsLoading(updating));
    };

    if (view) {
      init();
    }
  }, [view]);

  return <div ref={me}>{isLoading ? <div style={{ backgroundColor: 'red' }}>loading</div> : null}</div>;
}
