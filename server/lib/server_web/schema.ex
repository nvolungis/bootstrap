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

    payload field :refresh do
      input do
        field :refresh, :refresh_input_object
      end
      output do
        field :header_token, :string
        field :payload_token, :string
        field :combined_token, :string
        field :header_refresh, :string
        field :payload_refresh, :string
        field :combined_refresh, :string
      end
      resolve &Resolvers.Content.refresh/2
      middleware fn(resolution, other) -> middlewares(resolution, other) end
    end

    payload field :login do
      input do
        field :login, :login_input_object
      end
      output do
        field :header_token, :string
        field :payload_token, :string
        field :combined_token, :string
        field :header_refresh, :string
        field :payload_refresh, :string
        field :combined_refresh, :string
      end
      resolve &Resolvers.Content.login/2
      middleware fn(resolution, other) -> middlewares(resolution, other) end
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

  defp middlewares(resolution, _) do
    resolution
      |> add_token(:token)
      |> add_token(:refresh)
      |> remove_from_value([:token, :refresh])
  end

  defp add_token(%{value: nil} = resolution, _key) do
    resolution
  end

  defp add_token(%{value: resolved_value, context: context} = resolution, key) do
    case Map.get(resolved_value, key) do
      nil -> resolution
      value ->
        suffix = Atom.to_string(key)
        [header, payload, signature] = String.split(value, ".")
        context = Map.put(context, String.to_atom("signature_" <> suffix), signature)
        value_map = resolved_value
          |> Map.put(String.to_atom("header_" <> suffix), header)
          |> Map.put(String.to_atom("payload_" <> suffix), payload)
          |> Map.put(String.to_atom("combined_" <> suffix), header <> "." <> payload)

        resolution
          |> Map.put(:context, context)
          |> Map.put(:value, value_map)
    end
  end

  defp remove_from_value(%{value: nil} = resolution, _keys) do
    resolution
  end

  defp remove_from_value(%{value: resolved_value} = resolution, keys) do
    value_map = List.foldl(keys, resolved_value, fn (key, acc) ->
      Map.delete(acc, key)
    end)

    Map.put(resolution, :value, value_map)
  end
end
