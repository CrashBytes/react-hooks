import { renderHook } from '@testing-library/react';
import { useClickOutside } from '../src/hooks/useClickOutside';
import { type RefObject } from 'react';

describe('useClickOutside', () => {
  it('calls handler when clicking outside the element', () => {
    const handler = jest.fn();
    const element = document.createElement('div');
    document.body.appendChild(element);

    const ref = { current: element } as RefObject<HTMLDivElement>;
    renderHook(() => useClickOutside(ref, handler));

    const outsideEvent = new MouseEvent('mousedown', { bubbles: true });
    document.body.dispatchEvent(outsideEvent);

    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(element);
  });

  it('does not call handler when clicking inside the element', () => {
    const handler = jest.fn();
    const element = document.createElement('div');
    document.body.appendChild(element);

    const ref = { current: element } as RefObject<HTMLDivElement>;
    renderHook(() => useClickOutside(ref, handler));

    const insideEvent = new MouseEvent('mousedown', { bubbles: true });
    element.dispatchEvent(insideEvent);

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(element);
  });

  it('does not call handler when ref is null', () => {
    const handler = jest.fn();
    const ref = { current: null } as RefObject<HTMLDivElement | null>;
    renderHook(() => useClickOutside(ref, handler));

    const event = new MouseEvent('mousedown', { bubbles: true });
    document.body.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });
});
