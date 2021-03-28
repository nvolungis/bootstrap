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
         {:ok, jwt, _} <- create_token(user),
         {:ok, refresh_jwt, _} <- create_refresh(user) do
      {:ok, %{token: jwt, refresh: refresh_jwt}}
    end
  end

  def logout(_args,  %{context: %{current_user: current_user, token: token}}) do
    case Server.Guardian.revoke(token) do
      {:ok, _claims} -> {:ok, %{user: current_user}}
      {:error, error} -> {:error, error}
    end
  end

  def refresh(%{refresh: %{refresh: refresh_beginning}}, %{context: %{refresh_signature: signature}}) do
    refresh_token = refresh_beginning <> "." <> signature
    case Server.Guardian.exchange(refresh_token, "refresh", "access", ttl: {20, :seconds}) do
      {:ok, {refresh, _claims}, {token, _}} -> {:ok, %{refresh: refresh, token: token}}
      {:error, error} -> {:error, error}
    end
  end

  defp create_token(user) do
    Server.Guardian.encode_and_sign(user, %{}, ttl: {20, :seconds})
  end

  defp create_refresh(user) do
    Server.Guardian.encode_and_sign(user, %{}, token_type: "refresh", ttl: {1, :week})
  end
end
