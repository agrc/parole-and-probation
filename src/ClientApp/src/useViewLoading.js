import * as React from 'react';

export default function useViewLoading(view) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const init = () => {
      console.log('useViewLoading:initializing');
      view.watch('updating', (updating) => setIsLoading(updating));
    };

    if (view) {
      init();
    }
  }, [view]);

  return isLoading;
}
