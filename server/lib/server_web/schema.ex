import ServerWeb.IsAuthenticated

defmodule ServerWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern
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

      is_authenticated()
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
        field :token_header, :string
        field :token_payload, :string
        field :token_combined, :string
      end
      resolve &Resolvers.Content.login/2
      middleware fn (%{value: value, context: context} = resolution, _) ->
        case value do
          %{token: token} ->
            # strip out the signature and set it to context so it can be set as an httpOnly header
            # the rest of the token can be sent back to the client
            [header, payload, signature] = String.split(token, ".")
            context = Map.put(context, :token_signature, signature)
            resolution
              |> Map.put(:context, context)
              |> Map.put(:value, %{
                token_header: header,
                token_payload: payload,
                token_combined: header <> "." <> payload
              })
          _ -> resolution
        end
      end
    end

    payload field :logout do
      output do
        field :user, :user
      end

      is_authenticated()
      resolve &Resolvers.Content.logout/2
    end
  end

  query do
    @desc "Get all stocks"
    field :stocks, list_of(:stock) do
      is_authenticated()
      resolve &ServerWeb.Resolvers.Content.list_stocks/2
    end
  end
end
