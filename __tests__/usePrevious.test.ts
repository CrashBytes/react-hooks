import { renderHook } from '@testing-library/react';
import { usePrevious } from '../src/hooks/usePrevious';

describe('usePrevious', () => {
  it('returns undefined on first render', () => {
    const { result } = renderHook(() => usePrevious('hello'));
    expect(result.current).toBeUndefined();
  });

  it('returns the previous value after rerender', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'hello' } },
    );

    rerender({ value: 'world' });
    expect(result.current).toBe('hello');

    rerender({ value: 'foo' });
    expect(result.current).toBe('world');
  });
});
