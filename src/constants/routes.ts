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
  Config: {
    Main: "/config/:section",
    SubSections: {
      Main: "/config/:section",
      Create: "/config/:section/create",
      Update: "/config/:section/:id/update",
    },
  },
  Auth: {
    Login: "/auth/login",
  },
};
