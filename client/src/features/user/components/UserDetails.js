import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
export function UserDetails({ user }) {
  const { name, username, email, address } = user;
  return (
    <Paper>
      <Typography variant="h2">{name}</Typography>
      <Typography variant="h4">
        {username} {email}
      </Typography>
      {Object.entries(address).map(([part, value]) => (
        <div key={part}>
          <Typography variant="body1">
            {part}: {JSON.stringify(value)}
          </Typography>
        </div>
      ))}
    </Paper>
  );
}
