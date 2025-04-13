import styled from "styled-components";
import { Nav } from "./components/Nav";
import "./appPushConfig";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { Dashboard } from "./routes/Dashboard";
import { Auth } from "./routes/Auth";
import { Onboarding } from "./routes/Onboarding";
import { Index } from "./routes/Index";

const Root = styled.main`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 600px;
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
      path: "/",
      component: Index,
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: "/dashboard",
      component: Dashboard,
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: "/auth",
      component: Auth,
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: "/onboarding",
      component: Onboarding,
    }),
  ]),
});

export function App() {
  return <RouterProvider router={router} />;
}
