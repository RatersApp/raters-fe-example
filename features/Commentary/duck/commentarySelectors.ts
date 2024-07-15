import { selectorFabric } from '../../../app/reduxHelpers';

export default selectorFabric({
  getFeedDetails: (state) => state.commentary.details,
});
