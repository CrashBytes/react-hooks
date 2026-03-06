import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../src/hooks/useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: originalClipboard,
    });
  });

  it('initially has null copiedText', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current[0]).toBeNull();
  });

  it('copies text to clipboard', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current[1]('hello');
      expect(success).toBe(true);
    });

    expect(result.current[0]).toBe('hello');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
  });

  it('returns false when clipboard API fails', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(
      new Error('fail'),
    );

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      const success = await result.current[1]('hello');
      expect(success).toBe(false);
    });

    expect(result.current[0]).toBeNull();
  });
});
