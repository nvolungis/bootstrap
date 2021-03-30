defmodule ServerWeb.Graphql.CreateStockTest do
  use ServerWeb.ConnCase, async: true

  @query """
    mutation SignUpUserMutation ($input: CreateUserInput!) {
      createUser(input: $input) {
        user {
          name
          email
        }
      }
    }
  """

  test "stock" do
    input = %{
      "input": %{
        "user": %{ "name": "neil", "email": "neil@gmail.com", "password": "pw" }
      }
    }

    result = @query
      |> run([variables: input])
      |> dig(:user)

    assert result == %{name: "neil", email: "neil@gmail.com"}
  end
end
