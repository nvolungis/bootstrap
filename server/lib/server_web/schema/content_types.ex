defmodule ServerWeb.Schema.ContentTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :classic

  node object(:stock) do
    field :name, :string
    field :ticker, :string
    field :price, :float
  end

  input_object :stock_input_object do
    field :name, non_null(:string)
    field :ticker, non_null(:string)
    field :price, :float
  end
end
