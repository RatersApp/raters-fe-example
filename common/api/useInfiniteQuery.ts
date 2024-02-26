import { useCallback, useMemo, useRef } from 'react';
import type { QueryHooks } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import type {
  QueryArgFrom,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { useDerivedState } from '../helpers/hooks/useDerivedState';
import { isEqual } from 'lodash';

export function useInfiniteQuery<
  Definition extends QueryDefinition<any, any, any, any, any>,
>(
  endpoint: QueryHooks<Definition>,
  args: QueryArgFrom<Definition>,
  options?: { skip: boolean },
) {
  const { currentData } = endpoint.useQueryState(args);
  const currentPage = currentData?.meta.currentPage;
  const argsRef = useRef<QueryArgFrom<Definition>>();
  const newStartPage = useMemo(() => {
    return !!argsRef.current && !isEqual(argsRef.current, args)
      ? 1
      : currentPage || 1;
  }, [args, currentPage]);
  argsRef.current = args;
  const [page, setPage] = useDerivedState<number>(newStartPage, [newStartPage]);
  const result = endpoint.useQuery({ ...args, page }, options);

  return [
    { ...result, currentData: result.currentData || currentData },
    useCallback(() => setPage((prev) => prev + 1), []),
    result.refetch,
  ] as const;
}
