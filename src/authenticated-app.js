import { Router } from "@reach/router";
import { BudgetScreen } from "./screens/budget";

// TODO:
function DashboardScreen() {
  return "Dashboard";
}

function AuthenticatedApp() {
  return (
    // TODO: navigasi
    // <nav>...</nav>

    <div className="WkwkApp">
      <Router>
        <DashboardScreen path="/u/dashboard" />
        <BudgetScreen path="/u/budget" />
      </Router>
    </div>
  );
}

export { AuthenticatedApp };
