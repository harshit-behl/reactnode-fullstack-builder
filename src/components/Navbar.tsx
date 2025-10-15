import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <CheckSquare className="w-6 h-6 text-primary" />
          TaskFlow
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
