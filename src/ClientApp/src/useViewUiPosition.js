import * as React from 'react';

export default function useViewUiPosition(view, position) {
  const me = React.useRef();

  React.useEffect(() => {
    view?.ui.add(me.current, position);
  }, [position, view]);

  return me;
}
