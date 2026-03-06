import { renderHook, act } from '@testing-library/react';
import { useDebounce, useDebouncedCallback } from '../src/hooks/useDebounce';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 500 } },
    );

    rerender({ value: 'world', delay: 500 });
    expect(result.current).toBe('hello');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('world');
  });

  it('resets timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } },
    );

    rerender({ value: 'b', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'c', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('c');
  });
});

describe('useDebouncedCallback', () => {
  it('debounces the callback', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(fn, 500));

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
