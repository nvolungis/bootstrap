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

    forward "/api", Absinthe.Plug,
      schema: ServerWeb.Schema,
      before_send: {__MODULE__, :before_send}
  end

  if Mix.env == :dev do
    forward "/email", Bamboo.SentEmailViewerPlug
    forward "/email-api", Bamboo.SentEmailApiPlug
  end

  # take token from context and set it as a header
  def before_send(conn, %Absinthe.Blueprint{} = blueprint) do
    conn
     |> set_context_item_as_cookie(blueprint, :signature_token)
     |> set_context_item_as_cookie(blueprint, :signature_refresh)
  end

  def before_send(conn, _) do
    conn
  end

  defp set_context_item_as_cookie(conn, blueprint, key) do
    case blueprint.execution.context[key] do
      nil -> conn
      value ->
        put_resp_cookie(conn, Atom.to_string(key), value)
    end
  end
end
