defmodule ServerWeb.Router do
  use ServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: ServerWeb.Schema
    forward "/", Absinthe.Plug, schema: ServerWeb.Schema
  end
end
