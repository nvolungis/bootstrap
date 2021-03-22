defmodule ServerWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :classic
  import_types ServerWeb.Schema.ContentTypes

  alias ServerWeb.Resolvers

  node interface do
    resolve_type fn
      %Server.Portfolio.Stock{}, _ ->
        :stock

      %Server.Account.User{}, _ ->
        :user
      _, _ ->
        nil
    end
  end

  mutation do
    @desc "A mutation that inserts a stock into the database"
    payload field :create_stock do
      input do
        field :stock, :stock_input_object
      end
      output do
        field :stock, :stock
      end
      resolve &Resolvers.Content.create_stock/2
    end

    payload field :create_user do
      input do
        field :user, :user_input_object
      end
      output do
        field :user, :user
      end
      resolve &Resolvers.Content.create_user/2
    end

    payload field :login do
      input do
        field :login, :login_input_object
      end
      output do
        field :token, :string
      end
      resolve &Resolvers.Content.login/2
    end
  end

  query do
    @desc "Get all stocks"
    field :stocks, list_of(:stock) do
      resolve &ServerWeb.Resolvers.Content.list_stocks/2
    end
  end
end
