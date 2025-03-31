import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [admin, setAdmin] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("tocken");
    if (token) {
      fetch("http://localhost:8080/findUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((Resp) => {
          return Resp.json();
        })
        .then((data) => {
          setUserData(data);
          if (data?.data?.name) {
            setAdmin(false);
          }
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, admin }}>
      {children}
    </UserContext.Provider>
  );
};
