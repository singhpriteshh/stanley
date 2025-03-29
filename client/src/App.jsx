import { useRoutes } from "react-router-dom";
import routesConfig from "./routes/routes";

const App = () =>{
  const routes = useRoutes(routesConfig);
  return  routes;
};

export default App;
