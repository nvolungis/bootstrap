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
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         signature_token <- conn.req_cookies["signature_token"],
         signature_refresh <- conn.req_cookies["signature_refresh"],
         {:ok, current_user} <- authorize(token <> "." <> signature_token) do
           {:ok, %{
             current_user: current_user,
             token: token <> "." <> signature_token,
             refresh_signature: signature_refresh
           }}
    else
      _ ->
        signature_refresh = conn.req_cookies["signature_refresh"]
        {:ok, %{ refresh_signature: signature_refresh }}
    end
  end

  defp authorize(token) do
    with {:ok, claims} <- Server.Guardian.decode_and_verify(token),
         {:ok, user} <- Server.Guardian.resource_from_claims(claims) do
           {:ok, user}
    else
      _ -> {:error, "Invalid authorization token"}
    end
  end
end
