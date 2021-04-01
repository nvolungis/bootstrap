defmodule Server.Support.GraphqlHelpers do
  def keys_to_atoms({:ok, map}), do: keys_to_atoms(map)
  def keys_to_atoms({:error, map}), do: keys_to_atoms(map)
  def keys_to_atoms(map) when is_list(map), do: Enum.map(map, &keys_to_atoms/1)
  def keys_to_atoms(map) when is_map(map) do
    for {key, val} <- map, into: %{}, do: {key_to_atom(key), keys_to_atoms(val)}
  end
  def keys_to_atoms(value), do: value

  def key_to_atom(value) when is_atom(value), do: value
  def key_to_atom(value), do: String.to_atom(value)

  def dig(%{data: data}, key), do: data[key]

  def run(query, options \\ []) do
    query
      |> Absinthe.run(ServerWeb.Schema, options)
      |> keys_to_atoms()
  end
end
