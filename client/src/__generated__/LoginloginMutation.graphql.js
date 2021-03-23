/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LoginInput = {|
  login?: ?LoginInputObject
|};
export type LoginInputObject = {|
  email: string,
  password: string,
|};
export type LoginloginMutationVariables = {|
  input: LoginInput
|};
export type LoginloginMutationResponse = {|
  +login: ?{|
    +tokenHeader: ?string,
    +tokenPayload: ?string,
    +tokenCombined: ?string,
  |}
|};
export type LoginloginMutation = {|
  variables: LoginloginMutationVariables,
  response: LoginloginMutationResponse,
|};
*/


/*
mutation LoginloginMutation(
  $input: LoginInput!
) {
  login(input: $input) {
    tokenHeader
    tokenPayload
    tokenCombined
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "LoginPayload",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tokenHeader",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tokenPayload",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tokenCombined",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginloginMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginloginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "60122243c4a79d0b32a868005f9f9701",
    "id": null,
    "metadata": {},
    "name": "LoginloginMutation",
    "operationKind": "mutation",
    "text": "mutation LoginloginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    tokenHeader\n    tokenPayload\n    tokenCombined\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fae4648d22437149abbc88729a7613ee';

module.exports = node;
