// Store-related types

/**
 * Generic async action state
 */
export interface AsyncState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Generic paginated data state
 */
export interface PaginatedState<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

/**
 * Generic async action with pagination
 */
export interface AsyncPaginatedState<T> extends AsyncState {
  data: PaginatedState<T>;
}
