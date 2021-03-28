defmodule Server.AccountTest do
  use Server.DataCase
  alias Server.Account

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
end
