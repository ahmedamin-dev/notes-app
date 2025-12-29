import { Button } from "./ui/button";
import { ModeToggle } from "./ui/theme-toggle";

const Navbar = () => {
  return (
    <header className="border-b">
      <nav className="flex items-center justify-between px-5 py-4 w-full max-w-7xl mx-auto">
        <div>Noted.</div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button>Logout</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
