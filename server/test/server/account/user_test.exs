defmodule Server.UserTest do
  use Server.DataCase
  alias Server.Account.User

  test "#changeset" do
    now = NaiveDateTime.utc_now()
    attrs = %{
      name: "neil",
      email: "neil@gmail.com",
      password: "pw",
      password_reset_token: "token",
      password_reset_sent_at: now
    }

    %{valid?: valid?, changes: changes} = User.changeset(%User{}, attrs)

    assert valid?
    assert Map.has_key?(changes, :password_hash)
    refute Map.has_key?(changes, :password) #plain password should not be persisted
    assert changes.name == attrs.name
    assert changes.email == attrs.email
    assert changes.password_reset_token == attrs.password_reset_token
    assert Time.diff(changes.password_reset_sent_at, now) == 0
  end

  test "#changeset required fields" do
    attrs = %{}

    %{valid?: valid?, errors: errors} = User.changeset(%User{}, attrs)

    refute valid?
    assert errors[:name] == {"can't be blank", [validation: :required]}
    assert errors[:email] == {"can't be blank", [validation: :required]}
    assert errors[:password] == {"can't be blank", [validation: :required]}
  end

  test "#changeset password_confirmation" do
    user = user_fixture()
    attrs = %{
      password: "pw",
      password_confirmation: "pw"
    }

    %{valid?: valid?} = User.changeset(user, attrs)

    assert valid?
  end

  test "#changeset password_confirmation mismatched" do
    user = user_fixture()
    attrs = %{
      password: "pw",
      password_confirmation: "mismatch"
    }

    %{valid?: valid?, errors: errors} = User.changeset(user, attrs)

    refute valid?
    assert errors[:password_confirmation] == {"does not match confirmation", [validation: :confirmation]}
  end
end
