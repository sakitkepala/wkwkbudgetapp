import { Router } from "@reach/router";
import { Center } from "@chakra-ui/layout";
import { BudgetScreen } from "./screens/budget";
import { NavBar } from "./components/nav";

// TODO:
function DashboardScreen() {
  return "Dashboard";
}

function AuthenticatedApp() {
  return (
    <>
      <NavBar />

      <div className="WkwkApp">
        <Router>
          <DashboardScreen path="/u/dashboard" />
          <BudgetScreen path="/u/budget" />
        </Router>
      </div>

      <Center as="footer" className="footer" p="40px" color="gray.500">
        &copy;&nbsp;
        <a href="https://dev.sakitkepala.dev">sakitkepala.dev</a>, 2021
      </Center>
    </>
  );
}

export { AuthenticatedApp };
