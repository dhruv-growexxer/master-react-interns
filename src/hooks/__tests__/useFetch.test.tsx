import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch';

describe('useFetch', () => {
  const mockUrl = 'https://api.example.com/data';
  const mockData = { id: 1, name: 'Test' };

  // Mock the global fetch function
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should initialize with loading state', () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result } = renderHook(() => useFetch(mockUrl));

    expect(result.current).toEqual({
      data: null,
      loading: true,
      error: null,
    });
  });

  it('should fetch data successfully', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const { result } = renderHook(() => useFetch(mockUrl));

    // Wait for the fetch to complete
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 2000 },
    );

    expect(result.current).toEqual({
      data: mockData,
      loading: false,
      error: null,
    });
    expect(mockFetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should handle fetch error when response is not ok', async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      }),
    );

    const { result } = renderHook(() => useFetch(mockUrl));

    // Wait for the fetch to complete
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 2000 },
    );

    expect(result.current).toEqual({
      data: null,
      loading: false,
      error: 'Failed to fetch',
    });
  });

  it('should handle network error', async () => {
    const networkError = new Error('Network error');
    mockFetch.mockImplementationOnce(() => Promise.reject(networkError));

    const { result } = renderHook(() => useFetch(mockUrl));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 2000 },
    );

    expect(result.current).toEqual({
      data: null,
      loading: false,
      error: 'Network error',
    });
  });
});
