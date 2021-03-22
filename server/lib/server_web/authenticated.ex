defmodule ServerWeb.Authenticated do
  @behaviour Absinthe.Middleware

  def call(resolution, _config) do
    case resolution.context do
      %{current_user: %{}} ->
        resolution
      _ ->
        Absinthe.Resolution.put_result(resolution, {:error, "Not logged in"})
    end
  end
end
