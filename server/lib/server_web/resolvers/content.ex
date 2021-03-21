defmodule ServerWeb.Resolvers.Content do
  alias Server.Portfolio.Stock
  import Ecto.Query, only: [from: 2]

  def list_stocks(_, _) do
    {:ok, Server.Portfolio.Stock |> Server.Repo.all()}
  end

  def get_stock(%{stock_id: global_id}, _) do
    Absinthe.Relay.Node.from_global_id(global_id, ServerWeb.Schema)
  end

  def create_stock(%{stock: stock}, _) do
    {:ok, res} = Stock.changeset(%Stock{}, stock) |> Server.Repo.insert() |> IO.inspect
    {:ok, %{stock: res}}
  end
end
