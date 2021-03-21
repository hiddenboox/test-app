import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import { useHistory } from "react-router-dom";
import parseSearch from "parse-plain-qs";

import { useUserService } from "../features/user/hooks/useUserService";
import { Loader } from "../components/Loader";
import { TablePaginationActions } from "../components/TablePaginationActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const INITIAL_PAGE = 0;
const PAGE_LIMIT = 20;

export default function Home() {
  const history = useHistory();
  const { location } = history;
  const {
    fetchUsers,
    selectUser,
    users,
    selectedUser,
    meta,
  } = useUserService();
  const search = parseSearch(location.search);
  const pageFromUrl = search ? parseInt(search.page, 10) : null;
  const [page, setPage] = React.useState(pageFromUrl || INITIAL_PAGE);
  const classes = useStyles();

  // workaround for json-server page 0 eq 1
  const nextPage = page === 1 ? 2 : page + 1;

  React.useEffect(() => {
    fetchUsers({ page: nextPage, limit: PAGE_LIMIT });
  }, [fetchUsers, nextPage]);

  React.useEffect(() => {
    if (page > 0) {
      history.push(`/?page=${page}`);
    } else if (page === 0) {
      history.push("/");
    }
  }, [history, page]);

  const navigateToUserDetails = (user) => {
    selectUser(user, () => {
      history.push(`/user/${user.email}`);
    });
  };

  const isSelected = ({ email }) => email === selectedUser?.email;

  const handleChangePage = (_event, page) => {
    setPage(page);
  };

  return users.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">E-mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              selected={isSelected(row)}
              key={row.email}
              onClick={() => navigateToUserDetails(row)}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={3}
              count={meta.totalCount}
              rowsPerPage={PAGE_LIMIT}
              page={page}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ) : (
    <Loader />
  );
}
