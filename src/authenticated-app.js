import { Switch, Route } from "react-router-dom";

import { Box, Center } from "@chakra-ui/layout";
import { NavBar } from "./components/nav";
import { BudgetScreen } from "./screens/budget";
import { AkunDanaScreen } from "./screens/akun";

// TODO:
function DashboardScreen() {
  return "Dashboard";
}

function AuthenticatedApp() {
  return (
    <Box className="WkwkApp" bgColor="gray.100" minH="100vh">
      <NavBar />

      <Switch>
        <Route path="/u/dashboard">
          <DashboardScreen />
        </Route>

        <Route path="/u/budget">
          <BudgetScreen />
        </Route>

        <Route path="/u/dana">
          <AkunDanaScreen />
        </Route>
      </Switch>

      <Center as="footer" className="footer" p="40px" color="gray.500">
        &copy;&nbsp;
        <a href="https://dev.sakitkepala.dev">sakitkepala.dev</a>, 2021
      </Center>
    </Box>
  );
}

export { AuthenticatedApp };
