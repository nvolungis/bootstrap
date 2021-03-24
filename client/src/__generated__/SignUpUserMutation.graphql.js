/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateUserInput = {|
  user?: ?UserInputObject
|};
export type UserInputObject = {|
  email: string,
  name: string,
  password: string,
|};
export type SignUpUserMutationVariables = {|
  input: CreateUserInput
|};
export type SignUpUserMutationResponse = {|
  +createUser: ?{|
    +user: ?{|
      +name: ?string,
      +email: ?string,
    |}
  |}
|};
export type SignUpUserMutation = {|
  variables: SignUpUserMutationVariables,
  response: SignUpUserMutationResponse,
|};
*/


/*
mutation SignUpUserMutation(
  $input: CreateUserInput!
) {
  createUser(input: $input) {
    user {
      name
      email
      id
    }
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignUpUserMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserPayload",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpUserMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateUserPayload",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9301359d9fc356887ff573b39ebb4ad5",
    "id": null,
    "metadata": {},
    "name": "SignUpUserMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpUserMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    user {\n      name\n      email\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bc80b6685e90baa5d426bc78bbcb1d1a';

module.exports = node;
