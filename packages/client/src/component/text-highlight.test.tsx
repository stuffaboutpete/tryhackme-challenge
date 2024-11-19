import { expect, test } from 'vitest';
import { render } from '@testing-library/react';

import TextHighlight from './text-highlight';

test('creates highlight spans', () => {
  const { container } = render(
    <TextHighlight
      text="United Kingdom"
      highlights={[
        { start: 2, end: 5  },
        { start: 11, end: 14 }
      ]}
      highlightClassName="example"
    />
  );

  const spans = container.querySelectorAll('.example');

  expect(spans.length).toEqual(2);
  expect(spans[0].textContent).toEqual('ite');
  expect(spans[1].textContent).toEqual('dom');
});

// TODO More tests...
