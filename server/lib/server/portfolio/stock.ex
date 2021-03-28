defmodule Server.Portfolio.Stock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "portfolio_stocks" do
    field :name, :string
    field :price, :float
    field :ticker, :string
    belongs_to :account_user, Server.Acount.User

    timestamps()
  end

  @doc false
  def changeset(stock, attrs) do
    stock
    |> cast(attrs, [:name, :ticker, :price, :account_user_id])
    |> validate_required([:name, :ticker, :price, :account_user_id])
  end
end
