import { FC } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const ErrorPage: FC = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let body = "An unexpected error occurred. Our apologies.";

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        title = "Page not found";
        body = "The page you're looking for doesn't exist — or has moved rooms.";
        break;
      case 500:
        title = "Server error";
        body = "Something went wrong on our end. Please try again shortly.";
        break;
      default:
        title = `Error ${error.status}`;
        body = error.statusText || "An unexpected error occurred.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper px-5 text-center">
      <p className="eyebrow text-bronze">Home of Design</p>
      <h1 className="font-display text-6xl tracking-tight text-ink sm:text-8xl">
        {title}
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-ink-2">{body}</p>
      <Link
        to="/"
        className="btn-primary mt-4"
      >
        <ArrowLeft size={14} />
        Back to the house
      </Link>
    </div>
  );
};
