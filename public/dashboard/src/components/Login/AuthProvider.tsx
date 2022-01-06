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

let AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = React.useState<string>("");
  let [token, setToken] = React.useState<string>("");

  let signin = (
    newUser: { username: string; password: string },
    callback: VoidFunction
  ) => {
    fetch("loginDashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((json) => {console.log(json); return json})
      .then((json: LoginResponse) => {
        console.log(token);
        setToken(json.token);
        setUser(newUser.username);
      })
      .then(() => callback());
  };

  let signout = (callback: VoidFunction) => {
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
