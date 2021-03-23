defmodule ServerWeb.Schema.ContentTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  node object(:stock) do
    field :name, :string
    field :ticker, :string
    field :price, :float
  end

  node object(:user) do
    field :name, :string
    field :email, :string
  end

  input_object :stock_input_object do
    field :name, non_null(:string)
    field :ticker, non_null(:string)
    field :price, :float
  end

  input_object :user_input_object do
    field :name, non_null(:string)
    field :email, non_null(:string)
    field :password, non_null(:string)
  end

  input_object :login_input_object do
    field :email, non_null(:string)
    field :password, non_null(:string)
  end
end
