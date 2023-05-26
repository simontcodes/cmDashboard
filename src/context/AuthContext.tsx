// AuthContext.js
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  ComponentType,
} from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  role: string | undefined;
  setRole: Dispatch<SetStateAction<string>>;
  routesByRole: RoutesByRoleState;
  setRoutesByRole: React.Dispatch<React.SetStateAction<RoutesByRoleState>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

interface Route {
  path: string;
  component: ComponentType<any>;
  roles: string[];
}

interface RoutesByRoleState extends Array<Route> {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [routesByRole, setRoutesByRole] = useState<RoutesByRoleState>([]);

  const authContextValue: AuthContextProps = {
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
    routesByRole,
    setRoutesByRole,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
