defmodule ServerWeb.Router do
  use ServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ServerWeb.Context
  end

  scope "/" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: ServerWeb.Schema
    forward "/", Absinthe.Plug, schema: ServerWeb.Schema
  end
end
