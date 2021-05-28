import Buses from "./buses/Buses";

import { Redirect, Route, Switch } from "react-router-dom";
import Admin from "./admin/Admin";
import Students from "./students/Students";
import Drivers from "./drivers/Drivers";
import Departments from "./departments/Departments";
import Supports from "./supports/Supports";
import Dashboard from "./dashboard/Dashboard";
import Routes from "./routes/Routes";
import RouteDetails from "./routes/RouteDetail";

const ContentDiv = () => {
  return (
    <>
      <Switch>
        <Route path="/app" exact component={Dashboard} />
        <Route path="/app/buses" component={Buses} />
        {/* <Route path="/app/admin" component={Admin} /> */}
        <Route path="/app/departments" component={Departments} />
        <Route path="/app/drivers" component={Drivers} />
        <Route path="/app/students" component={Students} />
        <Route path="/app/routes" component={Routes} />
        <Route path="/app/routes/:id" render={(props)=> <RouteDetails {...props} />}  />
        <Route path="/app/supports" component={Supports} />
      </Switch>
      <Redirect to="/app" />
    </>
  );
};

export default ContentDiv;
