defmodule ServerWeb.Graphql.ResetPasswordTest do
  use ServerWeb.ConnCase, async: true
  use Bamboo.Test
  alias Server.Account
  alias ServerWeb.Email

  @generate_query """
    mutation GenerateResetToken ($input: GenerateResetTokenInput!) {
      generateResetToken(input: $input) {
        user {
          email
        }
      }
    }
  """

  @reset_query """
    mutation ResetPassword ($input: ResetPasswordInput!) {
      resetPassword(input: $input) {
        user {
          email
        }
      }
    }
  """

  test "#generate_reset_token" do
    user = user_fixture()

    input = %{
      "input" => %{
        "generateResetToken" => %{"email" => user.email}
      }
    }

    result = @generate_query
      |> run([variables: input])
      |> dig(:generateResetToken)

    user = Account.get_user_by_email(user.email)
    expected_email = Email.password_reset_token_email(user.email, user.password_reset_token)

    assert result == %{user: %{email: user.email}}
    assert_delivered_email expected_email
  end

  test "#reset_password" do
    {ok, user} = Server.Account.set_token_on_user(user_fixture())

    input = %{
      "input" => %{
        "reset_password" => %{
          "reset_token" => user.password_reset_token,
          "password" => "newpw",
          "password_confirmation" => "newpw"
        }
      }
    }

    result = @reset_query
      |> run([variables: input])
      |> dig(:resetPassword)

    assert result == %{user: %{email: user.email}}
  end
end
