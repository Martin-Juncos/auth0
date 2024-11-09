import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton ";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
      <nav>
        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {`Hola ${user.given_name} `}
            <img
              src={user.picture}
              alt={user.name}
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </nav>
      <hr />

      <Profile />
    </>
  );
};

export default App;
