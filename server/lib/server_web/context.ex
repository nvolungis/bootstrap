defmodule ServerWeb.Context do
  @behaviour Plug

  import Plug.Conn
  import Ecto.Query, only: [where: 2]

  alias Server.Repo
  alias Server.Account.User

  def init(opts), do: opts

  def call(conn, _) do
    case build_context(conn) do
      {:ok, context} ->
         put_private(conn, :absinthe, %{context: context})
       _ ->
         conn
    end
  end

  defp build_context(conn) do
    IO.inspect("authoriasldkjf")
    IO.inspect conn
    IO.inspect conn.req_cookies["token_signature"]
    with ["Bearer " <> token] <- get_req_header(conn, "authorization") |> IO.inspect(label: "auth"),
         signature <- conn.req_cookies["token_signature"] |> IO.inspect(label: "TOOOOOK"),
         {:ok, current_user} <- authorize(token <> "." <> signature) do
           {:ok, %{current_user: current_user, token: token}}
    end
  end

  defp authorize(token) do
    IO.inspect(token, label: "authorizing")
    User
    |> where(token: ^token)
    |> Repo.one()
    |> case do
      nil -> {:error, "Invalid authorization token"}
      user -> {:ok, user}
    end
    |> IO.inspect(label: "toketoke")
  end
end
