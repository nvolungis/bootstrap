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

  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

  def get_user_by_token(token) do
    Repo.get_by(User, password_reset_token: token)
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
        {:error, "Incorrect login credentials"}
    end
  end

  def set_token_on_user(user) do
    attrs = %{
      password_reset_token: SecureRandom.urlsafe_base64(),
      password_reset_sent_at: NaiveDateTime.utc_now(),
    }

    user
      |> User.store_reset_changeset(attrs)
      |> Repo.update()
  end

  def token_expired?(token_sent_at) do
    diff = NaiveDateTime.utc_now()
      |> Time.diff(token_sent_at)
      |> abs()

    diff > 7200
  end

  def update_user_password(%{reset_token: token, password: pw, password_confirmation: pwc}) do
    user = get_user_by_token(token)
    with false <- token_expired?(user.password_reset_sent_at) do
      attrs = %{
        password: pw,
        password_confirmation: pwc,
        password_reset_token: nil,
        password_reset_sent_at: nil,
      }

      user
        |> User.changeset(attrs)
        |> Repo.update
    else
      true -> {:error, "expired token"}
      error -> {:error, error}
    end
  end

  def logout(_user) do
  end
end
