defmodule ServerWeb.Resolvers.Content do
  alias Server.Portfolio.Stock
  alias Server.Account
  alias ServerWeb.Email
  alias ServerWeb.Mailer

  def list_stocks(_args, _resolution) do
    {:ok, Server.Portfolio.Stock |> Server.Repo.all()}
  end

  def get_stock(%{stock_id: global_id}, _resolution) do
    Absinthe.Relay.Node.from_global_id(global_id, ServerWeb.Schema)
  end

  def create_stock(%{stock: stock}, _resolution) do
    {:ok, res} = %Stock{}
      |> Stock.changeset(stock)
      |> Server.Repo.insert()
    {:ok, %{stock: res}}
  end

  def create_user(%{user: user}, _resolution) do
    case Account.create_user(user) do
      {:ok, user} -> {:ok, %{user: user}}
      {:error, error} -> {:error, error}
    end
  end

  def login(%{login: %{email: email, password: password}}, _resolution) do
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
    case Server.Guardian.exchange(
      refresh_token,
      "refresh",
      "access",
      ttl: Application.get_env(:server, :token_ttl)
    ) do
      {:ok, {refresh, _}, {token, _}} -> {:ok, %{refresh: refresh, token: token}}
      {:error, error} -> {:error, error}
    end
  end

  def generate_reset_token(%{generate_reset_token: %{email: email}}, _resolution) do
    with user <- Account.get_user_by_email(email) do
      {:ok, user} = Account.set_token_on_user(user)
      email
        |> Email.password_reset_token_email(user.password_reset_token)
        |> Mailer.deliver_now()
      {:ok, %{user: user}}
    end
  end

  def reset_password(%{ reset_password: reset_params}, _resolution) do
    {:ok, user} = Account.update_user_password(reset_params)
    {:ok, %{user: user}}
  end

  defp create_token(user) do
    Server.Guardian.encode_and_sign(user, %{email: user.email, name: user.name}, ttl: Application.get_env(:server, :token_ttl))
  end

  defp create_refresh(user) do
    Server.Guardian.encode_and_sign(
      user,
      %{},
      token_type: "refresh",
      ttl: Application.get_env(:server, :refresh_ttl)
    )
  end
end
