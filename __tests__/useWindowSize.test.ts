import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from '../src/hooks/useWindowSize';

describe('useWindowSize', () => {
  it('returns current window dimensions', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    Object.defineProperty(window, 'innerHeight', { writable: true, value: 768 });

    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('updates on window resize', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 400 });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(400);
  });
});
