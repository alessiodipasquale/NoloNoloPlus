import ky from "ky";
import React, { ReactNode } from "react";

interface AuthContextType {
  user: any;
  token: string;
  signin: (
    user: { username: string; password: string },
    callback: VoidFunction
  ) => void;
  signout: (callback: VoidFunction) => void;
}

interface LoginResponse {
  token: string;
}

let AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = React.useState<string>("");
  let [token, setToken] = React.useState<string>("");

  let signin = async (
    newUser: { username: string; password: string },
    callback: VoidFunction
  ) => {
    const { token } = await ky
      .post("/loginDashboard", { json: newUser })
      .json<LoginResponse>();
    setToken(token);
    setUser(newUser.username);
    callback();
  };

  let signout = (callback: VoidFunction) => {
    setUser("");
    setToken("");
    callback();
  };

  let value = { user, token, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthProvider;
export { useAuth };
