import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { render, waitForElement } from '@testing-library/react';

import { Thing } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Thing />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('can read the components innerText correctly', async () => {
    const { getByText } = await render(<Thing />);
    await waitForElement(() => getByText(/i work/i));
  });
});
