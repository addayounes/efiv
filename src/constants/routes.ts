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
    Composition: {
      Trains: {
        Main: "/config/composition/trains",
        Create: "/config/composition/trains/create",
        Update: "/config/composition/trains/:id/update",
      },
      Vehicles: {
        Main: "/config/composition/vehicles",
        Create: "/config/composition/vehicles/create",
        Update: "/config/composition/vehicles/:id/update",
      },
    },
  },
  Auth: {
    Login: "/auth/login",
  },
};
