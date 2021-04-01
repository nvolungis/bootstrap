defmodule Server.AccountTest do
  use Server.DataCase
  alias Server.Account
  alias Server.Account.User

  test "get_user!" do
    user = user_fixture()
    assert Account.get_user!(user.id) == user
  end

  test "create_user" do
    attrs = %{
      name: "username",
      email: "user@mail.com",
      password: "password",
    }

    {:ok, user} = Account.create_user(attrs)
    assert user.name == attrs[:name]
  end

  test "#login with correct creds" do
    user = user_fixture(%{email: "name@gmail.com", password: "password"})
    assert Account.login("name@gmail.com", "password") == {:ok, user}
  end

  test "#login with incorrect password" do
    user_fixture(%{email: "name@gmail.com", password: "badpass"})
    assert Account.login("name@gmail.com", "password") == {:error, "Incorrect login credentials"}
  end

  test "#login with unknown user" do
    assert Account.login("notcreated@gmail.com", "pw") == {:error, "Incorrect login credentials"}
  end

  test "#set_token_on_user" do
    {:ok, user} = Account.set_token_on_user(user_fixture())
    assert user.password_reset_token
    assert user.password_reset_sent_at
  end

  test "#get_user_by_token" do
    {:ok, user} = Account.set_token_on_user(user_fixture())
    assert Account.get_user_by_token(user.password_reset_token) == user
  end

  test "#token_expired? with valid token" do
    valid_token = NaiveDateTime.utc_now()
    refute Account.token_expired?(valid_token)
  end

  test "#token_expired? with expired token" do
    expired_token = NaiveDateTime.add(NaiveDateTime.utc_now(), -10000, :second)
    assert Account.token_expired?(expired_token)
  end

  test "#update_user_password" do
    {:ok, user} = Account.set_token_on_user(user_fixture())

    attrs = %{
      reset_token: user.password_reset_token,
      password: "pw",
      password_confirmation: "pw"
    }

    {:ok, updated_user} = Account.update_user_password(attrs)

    refute user.password_hash == updated_user.password_hash
  end

  test "#update_user_password with expired token" do
    expired_token = NaiveDateTime.add(NaiveDateTime.utc_now(), -10000, :second)
    {:ok, user} = Account.set_token_on_user(user_fixture())
    {:ok, user} = user
      |> User.store_reset_changeset(%{password_reset_sent_at: expired_token})
      |> Repo.update

    attrs = %{
      reset_token: user.password_reset_token,
      password: "newpw",
      password_confirmation: "newps"
    }

    assert Account.update_user_password(attrs) == {:error, "expired token"}
  end
end
