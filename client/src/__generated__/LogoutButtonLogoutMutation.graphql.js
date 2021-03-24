/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LogoutButtonLogoutMutationVariables = {||};
export type LogoutButtonLogoutMutationResponse = {|
  +logout: ?{|
    +user: ?{|
      +email: ?string
    |}
  |}
|};
export type LogoutButtonLogoutMutation = {|
  variables: LogoutButtonLogoutMutationVariables,
  response: LogoutButtonLogoutMutationResponse,
|};
*/


/*
mutation LogoutButtonLogoutMutation {
  logout {
    user {
      email
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LogoutButtonLogoutMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LogoutPayload",
        "kind": "LinkedField",
        "name": "logout",
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
              (v0/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LogoutButtonLogoutMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LogoutPayload",
        "kind": "LinkedField",
        "name": "logout",
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
              (v0/*: any*/),
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
    "cacheID": "7a6068d440190c54b56e61b65807c9be",
    "id": null,
    "metadata": {},
    "name": "LogoutButtonLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation LogoutButtonLogoutMutation {\n  logout {\n    user {\n      email\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '45753c13fd665ed4a536d08f0f5bb40d';

module.exports = node;
