import { FC } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage: FC = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <div className=" flex flex-col h-screen items-center justify-center">
            <h1 className="text-red-600 text-4xl">404 - Not Found</h1>
            <p className="text-2xl">
              The page you're looking for doesn't exist.
            </p>
          </div>
        );
      case 500:
        return (
          <div className="flex flex-col h-screen items-center justify-center">
            <h1 className="text-red-600 text-4xl">500 - Server Error</h1>
            <p className="text-2xl">
              Something went wrong on our end. Please try again later.
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col h-screen items-center justify-center">
            <h1 className="text-red-600 text-4xl">Error {error.status}</h1>
            <p className="text-2xl">
              {error.statusText || "An unexpected error occurred."}
            </p>
          </div>
        );
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-red-600 text-4xl">Oops!</h1>
      <p className="text-2xl">An unexpected error occurred.</p>
    </div>
  );
};
