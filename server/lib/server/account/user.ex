defmodule Server.Account.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :password_reset_token, :string
    field :password_reset_sent_at, :naive_datetime
    field :token, :string
    has_one :stock, Server.Portfolio.Stock

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password, :password_reset_token, :password_reset_sent_at])
    |> validate_required([:name, :email, :password])
    |> validate_confirmation(:password)
    |> put_password_hash()
  end

  def store_reset_changeset(user, attrs) do
    user
    |> cast(attrs, [:password_reset_token, :password_reset_sent_at])
  end

  def store_token_changeset(user, attrs) do
    user |> cast(attrs, [:token])
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        changeset
          |> put_change(:password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
          |> put_change(:password, nil)
      _ ->
        changeset
    end
  end
end
