import { render } from '@testing-library/react';
import React from 'react';
import LongPressButton from './LongPressButton';

test('renders microphone button', () => {
  const start = jest.fn();
  const stop = jest.fn();
  const element = render(<LongPressButton pressed={start} unpressed={stop} />);

  const { container } = element;
  expect(container.firstChild).toHaveClass('container')
  expect(container).toMatchSnapshot()
});