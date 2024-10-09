import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CircleUser, Pill } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { logout } from "../src/api/authService";
import { useMutation } from "@tanstack/react-query";
import NavItems from "../src/components/NavItems";

const MedicineLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useUserStore();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const logoutState = useUserStore((state) => state.logout);

  const logoutMutation = useMutation({ mutationFn: logout });
  const handleLogout = async () => {
    const logoutPromise = logoutMutation.mutateAsync({});
    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: () => {
        logoutState();
        navigate("/auth");
        return "Successfully logged out!";
      },
      error: (error) => error.response?.data?.message || error.message,
    });
  };

  return (
    <div className="min-h-screen w-full">
      <Toaster />
      <header className="flex items-center h-14 gap-4 border-b bg-teal-600 px-4 lg:h-[60px] lg:px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link
              to="/home"
              className="flex items-center gap-2 font-semibold text-white"
            >
              <Pill className="h-6 w-6" />
              <span>MED-VAULT</span>
            </Link>
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="text-white"
                  onClick={toggleMobileMenu}
                >
                  {isMobileMenuOpen ? (
                    <XIcon className="h-6 w-6" /> // Close icon
                  ) : (
                    <MenuIcon className="h-6 w-6" /> // Hamburger icon
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/home">
                  <DropdownMenuLabel>Home</DropdownMenuLabel>
                </Link>

                <DropdownMenuSeparator />
                <Link to="/new-med">
                  <DropdownMenuItem>Add Medicine</DropdownMenuItem>
                </Link>
                <Link to="/inventory-log">
                  <DropdownMenuItem>Inventory Log</DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button onClick={handleLogout} variant="destructive">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex">
            <NavItems />
          </div>

          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
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
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute right-4 top-14 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:hidden z-50">
            <div className="py-1"></div>
          </div>
        )}
      </header>

      <main className="p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MedicineLayout;
