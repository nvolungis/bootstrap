defmodule ServerWeb.Resolvers.Content do
  alias Server.Portfolio.Stock
  alias Server.Account

  import Ecto.Query, only: [from: 2]

  def list_stocks(_, %{context: ctx}) do
    {:ok, Server.Portfolio.Stock |> Server.Repo.all()}
  end

  def get_stock(%{stock_id: global_id}, _ctx) do
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
    with {:ok, user} <- Account.login(email, password),
         {:ok, jwt, _} <- Server.Guardian.encode_and_sign(user, %{}, ttl: {1, :minute}) do
      {:ok, %{token: jwt}}
    end
  end

  def logout(_args,  %{context: %{current_user: current_user, token: token}}) do
    case Server.Guardian.revoke(token) do
      {:ok, _claims} -> {:ok, %{user: current_user}}
      {:error, error} -> {:error, error}
    end
  end
end
