import { renderHook, act } from '@testing-library/react';
import { useKeyPress } from '../src/hooks/useKeyPress';

describe('useKeyPress', () => {
  it('returns false initially', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));
    expect(result.current).toBe(false);
  });

  it('returns true when the target key is pressed', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(result.current).toBe(true);
  });

  it('returns false when the target key is released', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    });
    expect(result.current).toBe(false);
  });

  it('ignores other keys', () => {
    const { result } = renderHook(() => useKeyPress('Enter'));

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(result.current).toBe(false);
  });
});
