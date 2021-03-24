// your-app-name/src/RelayEnvironment.js
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.

const fetchRelay = (onAuthError) => async (params, variables) => {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
  return fetchGraphQL({text: params.text, variables, onAuthError });
};

const createEnv = ({ onAuthError }) => {
  return new Environment({
    network: Network.create(fetchRelay(onAuthError)),
    store: new Store(new RecordSource()),
  });
};

// Export a singleton instance of Relay Environment configured with our network function:
export default createEnv;
