import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { AuthProvider } from "react-oidc-context"

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_DTCEHOZMf",
  client_id: "251qks7fku3uou5gb3mqqsvmii",
  redirect_uri: "https://cottercarpentry.com/admin",
  response_type: "code",
  scope: "phone openid email",
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
