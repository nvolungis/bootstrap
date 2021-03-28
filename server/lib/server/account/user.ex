defmodule Server.Account.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "account_users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :token, :string
    has_one :portfolio_stock, Server.Portfolio.Stock

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email, :password])
    |> put_password_hash()
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
