defmodule ServerWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :server

  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
    plug Phoenix.Ecto.CheckRepoStatus, otp_app: :server
  end

  plug Plug.RequestId
  plug Plug.Telemetry, event_prefix: [:phoenix, :endpoint]

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()

  plug Plug.MethodOverride
  plug Plug.Head
  plug CORSPlug,
    origin: ["http://localhost:3000"],
    headers: [
      "Content-Type",
      "Bearer",
      "Authorization",
      "Access-Control-Allow-Credentials"
    ]

  plug ServerWeb.Router
end
