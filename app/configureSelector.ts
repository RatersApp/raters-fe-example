import { createSelectorCreator } from 'reselect';
import memoize from 'lodash/memoize';

const hashFn = (...args) =>
  args.reduce((acc, val) => `${acc}-${JSON.stringify(val)}`, '');

const customCreateSelector = createSelectorCreator(memoize, hashFn);

export default customCreateSelector;
