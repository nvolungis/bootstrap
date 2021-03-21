defmodule Server.Portfolio.Stock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "portfolio_stocks" do
    field :name, :string
    field :price, :float
    field :ticker, :string

    timestamps()
  end

  @doc false
  def changeset(stock, attrs) do
    stock
    |> cast(attrs, [:name, :ticker, :price])
    |> validate_required([:name, :ticker, :price])
  end
end
