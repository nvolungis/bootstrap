defmodule ServerWeb.Resolvers.Content do
  alias Server.Portfolio.Stock
  alias Server.Account

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

  def create_user(%{user: user}, _) do
    case Account.create_user(user) do
      {:ok, user} -> {:ok, %{user: user}}
      {:error, error} -> {:error, error}
    end
  end

  def login(%{login: %{email: email, password: password}}, _info) do
    with {:ok, user} <- Account.login(email, password) |> IO.inspect(label: "user"),
         {:ok, jwt, _} <- Server.Guardian.encode_and_sign(user) |> IO.inspect(label: "encodenadsigne"),
         {:ok, _ } <- Server.Account.store_token(user, jwt) do
      {:ok, %{token: jwt}}
    end
  end
end
