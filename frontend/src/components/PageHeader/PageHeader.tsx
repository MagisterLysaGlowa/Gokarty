import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { Link, useLocation } from "react-router-dom";

export const PageHeader = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="h-[80px] items-center grid grid-cols-3">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to="/">Strona główna</Link>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const pathTo = `/${pathSegments.slice(0, index + 1).join("/")}`;
            return (
              <BreadcrumbItem key={pathTo}>
                <Link to={pathTo}>{segment}</Link>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      </div>
      <h3 className="flex-1 text-center text-main-default text-5xl">
        {pathSegments[pathSegments.length - 1].toUpperCase()}
      </h3>
    </div>
  );
};
