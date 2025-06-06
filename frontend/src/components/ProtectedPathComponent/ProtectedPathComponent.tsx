import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/useAuth";
import { RoleName, UserRoleAccess } from "../../Utils/globalUtils";

type ProtectedPathComponentProps = {
  children: ReactNode;
  allowedRoles: RoleName;
};

export const ProtectedPathComponent: FC<ProtectedPathComponentProps> = ({
  allowedRoles,
  children,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/logowanie", { replace: true });
    else if (!UserRoleAccess.amIAllowed(user, allowedRoles))
      navigate("/forbidden", { replace: true });
  }, [navigate, allowedRoles, user]);

  return children;
};
