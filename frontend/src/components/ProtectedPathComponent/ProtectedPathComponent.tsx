import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "../../contexts/authContext/useAuth";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../../types";
import { amIAllowed } from "../../Utils/globalUtils";

type ProtectedPathComponentProps = {
  children: ReactNode;
  allowedRoles: Roles[] | undefined;
};

export const ProtectedPathComponent: FC<ProtectedPathComponentProps> = ({
  allowedRoles,
  children,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/logowanie", { replace: true });
    else if (!amIAllowed(user, allowedRoles))
      navigate("/forbidden", { replace: true });
  }, [navigate, allowedRoles, user]);

  return children;
};
