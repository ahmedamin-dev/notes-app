import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <section className="hidden md:flex md:flex-1 bg-black"></section>

      <section className="flex-1 flex flex-col p-4 items-center justify-center">
        <h2 className="text-2xl font-bold text-center">
          Login to your account
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          Enter your email below to login to your account
        </p>
        <form className="w-full max-w-sm flex flex-col justify-center gap-7 mt-9">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <Input type="email" id="email" placeholder="email@example.com" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <Input type="password" id="password" />
          </div>

          <Button>Login</Button>

          <Separator />

          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <Button variant={"outline"}>Continue with GitGub</Button>
            <Button variant={"outline"}>Continue with Google</Button>
          </div>
          <p className="text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link
              href={"/sign-up"}
              className="underline hover:text-primary transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Home;
