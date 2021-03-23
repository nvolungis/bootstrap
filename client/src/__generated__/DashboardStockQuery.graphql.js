/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DashboardStockQueryVariables = {||};
export type DashboardStockQueryResponse = {|
  +stocks: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +ticker: ?string,
    +price: ?number,
  |}>
|};
export type DashboardStockQuery = {|
  variables: DashboardStockQueryVariables,
  response: DashboardStockQueryResponse,
|};
*/


/*
query DashboardStockQuery {
  stocks {
    id
    name
    ticker
    price
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Stock",
    "kind": "LinkedField",
    "name": "stocks",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ticker",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "price",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardStockQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DashboardStockQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "eed35bd686dcd73cd11f49d3cd9874b8",
    "id": null,
    "metadata": {},
    "name": "DashboardStockQuery",
    "operationKind": "query",
    "text": "query DashboardStockQuery {\n  stocks {\n    id\n    name\n    ticker\n    price\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd21d779bde8bb5f82f77a73685fc624d';

module.exports = node;
