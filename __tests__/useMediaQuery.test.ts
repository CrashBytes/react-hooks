import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from '../src/hooks/useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Map<string, (event: MediaQueryListEvent) => void>;
  let mockMatches: boolean;

  beforeEach(() => {
    listeners = new Map();
    mockMatches = false;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: mockMatches,
        media: query,
        addEventListener: jest.fn(
          (_event: string, handler: (event: MediaQueryListEvent) => void) => {
            listeners.set(query, handler);
          },
        ),
        removeEventListener: jest.fn(),
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('returns false by default', () => {
    const { result } = renderHook(() =>
      useMediaQuery('(min-width: 768px)'),
    );
    expect(result.current).toBe(false);
  });

  it('returns true when media query matches', () => {
    mockMatches = true;
    const { result } = renderHook(() =>
      useMediaQuery('(min-width: 768px)'),
    );
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    const { result } = renderHook(() =>
      useMediaQuery('(min-width: 768px)'),
    );

    expect(result.current).toBe(false);

    act(() => {
      const handler = listeners.get('(min-width: 768px)');
      handler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});
