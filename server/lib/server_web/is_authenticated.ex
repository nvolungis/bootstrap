defmodule ServerWeb.IsAuthenticated do
  defmacro is_authenticated() do
    quote do
      middleware(ServerWeb.Authenticated, %{})
    end
  end
end
