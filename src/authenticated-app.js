import { Router } from "@reach/router";

function Dash() {
  return "Dashboard";
}

function Budget() {
  return "Manajemen Budget";
}

function AuthenticatedApp() {
  return (
    <div className="WkwkApp">
      <Router>
        <Dash path="/u/dashboard" />
        <Budget path="/u/budget" />
      </Router>
    </div>
  );
}

export { AuthenticatedApp };
