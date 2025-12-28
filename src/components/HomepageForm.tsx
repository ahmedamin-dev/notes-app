"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { homeFormSchema, HomeInputs } from "@/lib/validators/homeForm";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const HomepageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeInputs>({
    resolver: zodResolver(homeFormSchema),
  });

  const onSubmit: SubmitHandler<HomeInputs> = async (data) => {
    console.log(data);
  };

  return (
    <section className="flex-1 flex flex-col p-4 items-center justify-center">
      <h2 className="text-2xl font-bold text-center">Login to your account</h2>
      <p className="text-muted-foreground text-center mt-2">
        Enter your email below to login to your account
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col justify-center gap-7 mt-9"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <Input
            type="email"
            id="email"
            {...register("email")}
            placeholder="email@example.com"
            aria-invalid={errors.email && true}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email?.message}</div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <Input
            type="password"
            id="password"
            {...register("password")}
            aria-invalid={errors.password && true}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password?.message}</div>
          )}
        </div>

        <Button>Login</Button>

        <Separator />

        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Button variant={"outline"} className="flex items-center">
            <FaGithub className="size-5" /> Continue with GitHub
          </Button>
          <Button variant={"outline"} className="flex items-center">
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>
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
  );
};

export default HomepageForm;
