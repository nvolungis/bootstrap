defmodule Server.Account do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  import Comeonin.Bcrypt, only: [checkpw: 2]

  alias Server.Repo
  alias Server.Account.User

  def get_user!(id) do
    User |> Repo.get!(id)
  end

  def store_token(%User{} = user, token) do
    user
    |> User.store_token_changeset(%{token: token})
    |> Repo.update()
  end

  def create_user(attrs) do
    User.changeset(%User{}, attrs) |> Server.Repo.insert()
  end

  def login(email, password) do
    user = Repo.get_by(User, email: String.downcase(email))

    cond do
      user && checkpw(password, user.password_hash) ->
        {:ok, user}

      user ->
        {:error, "Incorrect login credentials"}

      true ->
        {:error, :"User not found"}
    end
  end
end
