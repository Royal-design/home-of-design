import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbSegment {
  name: string;
  href: string;
}

const BreadCrumbs = () => {
  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const breadcrumbs: BreadcrumbSegment[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const name =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    return { name, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList className="font-mono text-[0.62rem] uppercase tracking-[0.18em]">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              className="text-white transition-colors hover:text-bronze"
              to="/"
            >
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={index} className="flex items-center">
            <BreadcrumbSeparator className="text-ink-3" />
            {index !== breadcrumbs.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to={breadcrumb.href}
                    className="text-ink-3 transition-colors hover:text-bronze"
                  >
                    {breadcrumb.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage className={cn("font-medium text-[#f9d171]")}>
                  {breadcrumb.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
