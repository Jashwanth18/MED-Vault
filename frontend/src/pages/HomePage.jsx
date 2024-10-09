import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import toast, { Toaster } from "react-hot-toast";
import { PlusCircle, CircleUser, Home, Package, Pill } from "lucide-react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import { logout } from "../api/authService";
import { useMutation } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const navigate = useNavigate();
  const logoutState = useUserStore((state) => state.logout);

  const [menuOpen, setMenuOpen] = useState(false);

  const logoutMutation = useMutation({ mutationFn: logout });
  const handleLogout = async () => {
    const logoutPromise = logoutMutation.mutateAsync({});
    console.log("Logging out!");
    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: (data) => {
        logoutState();
        navigate("/auth");
        return data.message || "Successfully logged out!";
      },
      error: (error) => {
        return error.response?.data?.message || error.message;
      },
    });
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
      <Toaster />
      <div className="hidden md:block border-r bg-white">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-teal-600">
            <Link
              to="/home"
              className="flex text-white items-center gap-2 font-semibold"
            >
              <Pill className="h-6 w-6" />
              <span>MED-VAULT</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm  font-medium lg:px-4">
              <NavLink
                to="/home"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground  transition-all hover:text-primary ${
                    isActive && "bg-muted text-primary"
                  }`;
                }}
              >
                <Home className="h-4 w-4" />
                Home
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/new-med"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted text-primary"
                    }`;
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Medicine
                </NavLink>
              )}
              <NavLink
                to="/inventory-log"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted text-primary"
                  }`;
                }}
              >
                <Package className="h-4 w-4" />
                Inventory Log
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <header className="flex justify-between items-center p-4 bg-teal-600">
          <Link
            to="/home"
            className="text-white font-semibold flex items-center gap-2"
          >
            <Pill className="h-6 w-6" />
            MED-VAULT
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </header>
        {menuOpen && (
          <div className="bg-gray-50 border-2">
            <nav className="px-4 py-2">
              <NavLink
                to="/home"
                className="block px-3 py-2 items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Home
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/new-med"
                  className="block px-3 py-2 items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Add Medicine
                </NavLink>
              )}
              <NavLink
                to="/inventory-log"
                className="block px-3 py-2 items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Inventory Log
              </NavLink>
            </nav>
          </div>
        )}
      </div>

      <div className="flex flex-col ">
        <header className="hidden md:flex h-14 items-center justify-between gap-4 border-b bg-teal-600 px-4 lg:h-[60px] lg:px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem key="-1">
                <BreadcrumbLink href="/home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.length && pathSegments[0] !== "home" && (
                <BreadcrumbSeparator />
              )}
              {pathSegments.map((segment, index) => {
                if (segment !== "home") {
                  const href = "/" + pathSegments.slice(0, index + 1).join("/");
                  return (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink href={href}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}{" "}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  );
                }
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {isAdmin ? "Admin Registration" : "Admin Access Request"}
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
