import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";
import { ProjectRoutes } from "../modules/project/project.routes";

const router = Router();

const moduleRoute = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },

  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
