import { Button } from "./ui/button";
import { ModeToggle } from "./ui/theme-toggle";

const Navbar = () => {
  return (
    <header className="border-b">
      <nav className="flex items-center justify-between p-4 w-full max-w-7xl mx-auto">
        <div>Noted.</div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <p>Ahmed</p>
          <Button>Logout</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
