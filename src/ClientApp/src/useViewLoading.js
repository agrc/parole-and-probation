import * as React from 'react';
import Console from './Console';

export default function useViewLoading(view) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const init = () => {
      Console('useViewLoading:initializing');
      view.watch('updating', (updating) => setIsLoading(updating));
    };

    if (view) {
      init();
    }
  }, [view]);

  return isLoading;
}
