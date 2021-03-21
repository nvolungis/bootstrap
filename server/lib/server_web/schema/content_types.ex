defmodule ServerWeb.Schema.ContentTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :classic

  node object(:stock) do
    field :name, :string
    field :ticker, :string
    field :price, :float
  end
end
