/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AppStockQueryVariables = {||};
export type AppStockQueryResponse = {|
  +stocks: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +ticker: ?string,
    +price: ?number,
  |}>
|};
export type AppStockQuery = {|
  variables: AppStockQueryVariables,
  response: AppStockQueryResponse,
|};
*/


/*
query AppStockQuery {
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
    "name": "AppStockQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppStockQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "272a3c9942b266fb3248265f345c16a8",
    "id": null,
    "metadata": {},
    "name": "AppStockQuery",
    "operationKind": "query",
    "text": "query AppStockQuery {\n  stocks {\n    id\n    name\n    ticker\n    price\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f1154c90cb35ba1490283a8b141f902c';

module.exports = node;
