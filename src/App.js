import { AuthenticatedApp } from "./authenticated-app";

function App() {
  // Otentikasi mock
  const user = true;
  return !user ? null : <AuthenticatedApp />;
}

export default App;
