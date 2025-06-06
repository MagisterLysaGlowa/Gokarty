import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { Link, useLocation } from "react-router-dom";

export const PageHeader = () => {
  const location = useLocation();
  const { pathname } = location;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const visibleSegments = pathSegments.filter((segment) =>
    isNaN(Number(segment))
  );

  return (
    <div className="min-h-[80px] items-center grid grid-cols-3">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to="/">Strona główna</Link>
          </BreadcrumbItem>
          {visibleSegments.map((segment) => {
            const originalIndex = pathSegments.indexOf(segment);
            const pathTo = `/${pathSegments
              .slice(0, originalIndex + 1)
              .join("/")}`;

            return (
              <BreadcrumbItem key={pathTo}>
                <Link to={pathTo}>{decodeURIComponent(segment)}</Link>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      </div>
      <h3 className="flex-1 text-center text-main-default text-4xl">
        {decodeURIComponent(visibleSegments[visibleSegments.length - 1])}
      </h3>
    </div>
  );
};
