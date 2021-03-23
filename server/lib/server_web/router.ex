defmodule ServerWeb.Router do
  use ServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ServerWeb.Context
  end

  scope "/" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: ServerWeb.Schema,
      before_send: {__MODULE__, :before_send}

    forward "/", Absinthe.Plug,
      schema: ServerWeb.Schema,
      before_send: {__MODULE__, :before_send}
  end

  # take token from context and set it as a header
  def before_send(conn, %Absinthe.Blueprint{} = blueprint) do
    case blueprint.execution.context[:token_signature] do
      nil -> conn
      signature ->
        IO.inspect(signature, label: "setting sig")
        put_resp_cookie(conn, "token_signature", signature)
        |> put_resp_cookie("token_signature2", signature)
    end
  end

  def before_send(conn, _) do
    conn
  end
end
