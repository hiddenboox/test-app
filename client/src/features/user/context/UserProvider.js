import * as React from "react";

import { userService } from "../services/api/userService";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = React.useState([]);
  const [meta, setMeta] = React.useState({ totalCount: 0 });
  const [selectedUser, setSelectedUser] = React.useState();

  const selectUser = React.useCallback((user, callback) => {
    setSelectedUser(user);
    callback && callback(user);
  }, []);

  const fetchUsers = React.useCallback(
    (options) =>
      userService.list(options).then(({ users, meta }) => {
        setUsers(users);
        setMeta(meta);
      }),
    []
  );

  const fetchUser = React.useCallback((email) => userService.get(email), []);

  const value = React.useMemo(
    () => ({
      meta,
      users,
      selectedUser,
      fetchUsers,
      fetchUser,
      selectUser,
    }),
    [fetchUser, fetchUsers, meta, selectUser, selectedUser, users]
  );

  return (
    <UserContext.Provider value={value}>
      {React.Children.only(children)}
    </UserContext.Provider>
  );
};
