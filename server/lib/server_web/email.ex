defmodule ServerWeb.Email do
  import Bamboo.Email

  def password_reset_token_email(email, token) do
    new_email(
      to: email,
      from: "support@server.com",
      subject: "Reset your password",
      html_body: "<a href=\"http://localhost:3000/reset-password/#{token}\">Reset your password</a></strong>",
      text_body: token
    )
  end
end
