import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
import { useLocation, Link } from "react-router-dom";
interface BreadcrumbItem {
  name: string;
  href: string;
}

const BreadCrumbs = () => {
  const location = useLocation(); // Get the current URL from React Router
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== ""); // Split and clean the path

  // Create breadcrumb items dynamically
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const name =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "); // Capitalize and clean up segment names
    return { name, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            {index !== breadcrumbs.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={breadcrumb.href}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    {breadcrumb.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold  text-red-500">
                  {breadcrumb.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
