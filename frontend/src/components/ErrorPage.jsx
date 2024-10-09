import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage = ({ type = "not-logged-in", redirectRoute }) => {
  const config = {
    "not-logged-in": {
      icon: "🔒",
      title: "Oops! Access Denied",
      description:
        "It looks like you're not logged in. To view this page, please login in to continue.",
      actionText: "Log In Now",
      bgColor: "from-[#ff9999] to-[#8b0000]",
      iconColor: "text-blue-500",
    },
    "not-admin": {
      icon: "🚫",
      title: "Admin Access Only",
      description:
        "Sorry, this area is restricted to administrators. If you believe you should have access, please contact your system administrator.",
      actionText: "Return to Homepage",
      bgColor: "from-pink-400 to-orange-300",
      iconColor: "text-pink-500",
    },
    "not-found": {
      icon: "🤔",
      iconColor: "text-blue-500",
      title: "404 - Page Not Found",
      description:
        "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.",
      actionText: "Go to Homepage",
      bgColor: "from-red-500 to-orange-500",
      buttonGradient: "from-blue-500 to-purple-600",
    },
  };

  const { icon, title, description, actionText, bgColor, iconColor } =
    config[type];

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${bgColor}`}
    >
      <div className="max-w-md w-full">
        <Alert className="bg-white bg-opacity-90 shadow-lg rounded-3xl p-8 text-center">
          <div className={`text-6xl mb-4 ${iconColor}`}>{icon}</div>
          <AlertTitle className="text-3xl font-semibold mb-4 text-gray-800">
            {title}
          </AlertTitle>
          <AlertDescription className="text-gray-600 mb-6">
            {description}
          </AlertDescription>
          <Link to={redirectRoute}>
            <Button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              {actionText}
            </Button>
          </Link>
        </Alert>
      </div>
    </div>
  );
};

export default ErrorPage;
