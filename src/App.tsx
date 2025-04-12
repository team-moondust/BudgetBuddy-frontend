import styled from "styled-components";
import { Nav } from "./components/Nav";
import "./notifications";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { Dashboard } from "./routes/Dashboard";

const Root = styled.main`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function RouterRoot() {
  return (
    <Root>
      <Nav />
      <Outlet />
    </Root>
  );
}

const rootRoute = createRootRoute({
  component: RouterRoot,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: "/dashboard",
      component: Dashboard,
    }),
  ]),
});

export function App() {
  return <RouterProvider router={router} />;
}
