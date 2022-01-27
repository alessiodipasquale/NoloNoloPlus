import ky from "ky";
import React, { ReactNode } from "react";

interface AuthContextType {
  user: any;
  token: string;
  signin: (
    user: { username: string; password: string },
  ) => Promise<void>;
  signout: () => void;
}

interface LoginResponse {
  token: string;
}

let AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = React.useState<string>(localStorage.getItem("user") ?? "");
  let [token, setToken] = React.useState<string>(localStorage.getItem("token") ?? "");

  let signin = async (
    newUser: { username: string; password: string },
  ) => {
    const { token } = await ky
      .post("/loginDashboard", { json: newUser })
      .json<LoginResponse>();
    setToken(token);
    setUser(newUser.username);
    localStorage.setItem("token", token)
    localStorage.setItem("user", newUser.username)
  };

  let signout = () => {
    setUser("");
    setToken("");
  };

  let value = { user, token, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthProvider;
export { useAuth };
