export const __routes__ = {
  Dashboard: "/",
  Circulations: {
    Main: "/circulations",
    Operational: "/operational-circulations",
    OperationalUpdate: "/operational-circulations/:id/update",
    Details: "/circulations/:id",
    Create: "/circulations/create/:step",
    Update: "/circulations/:id/update/:step",
  },
  Auth: {
    Login: "/auth/login",
  },
};
