import * as React from "react";
import { useParams } from "react-router-dom";

import { Loader } from "../components/Loader";
import { UserDetails } from "../features/user/components/UserDetails";
import { useUserService } from "../features/user/hooks/useUserService";

export default function User() {
  const { users, fetchUser } = useUserService();
  const params = useParams();
  const [user, setUser] = React.useState(() =>
    users.find((user) => user.email === params.email)
  );

  React.useEffect(() => {
    if (!user) {
      fetchUser(params.email).then(setUser);
    }
  }, [user, fetchUser, params.email]);

  if (user) {
    return <UserDetails user={user} />;
  }

  return <Loader />;
}
