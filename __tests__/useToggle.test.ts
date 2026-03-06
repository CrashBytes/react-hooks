import { renderHook, act } from '@testing-library/react';
import { useToggle } from '../src/hooks/useToggle';

describe('useToggle', () => {
  it('defaults to false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('accepts an initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('toggles the value', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('setTrue sets value to true', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(true);
  });

  it('setFalse sets value to false', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current[3]();
    });
    expect(result.current[0]).toBe(false);
  });
});
