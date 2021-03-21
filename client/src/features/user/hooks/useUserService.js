import * as React from "react";

import { UserContext } from "../context/UserProvider";

export const useUserService = () => {
  return React.useContext(UserContext);
};
