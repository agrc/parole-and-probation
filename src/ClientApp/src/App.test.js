import * as React from 'react';
import ReactDOM from 'react-dom';
import { UserData } from 'react-oidc';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <UserData.Provider
      value={{
        user: {
          profile: {
            name: 'tester',
            'public:WorkforceID': 111111,
          },
        },
      }}
    >
      <App />
    </UserData.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
