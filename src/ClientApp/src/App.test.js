import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserData } from 'react-oidc';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((<UserData.Provider value={{
    user: {
      profile: {
        name: 'tester',
        'public:WorkforceID': 111111
      }
    }
  }}>
    <App />
  </UserData.Provider>), div);
  ReactDOM.unmountComponentAtNode(div);
});
