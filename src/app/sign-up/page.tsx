"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { SignupInputs, signupShcema } from "@/lib/validators/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignupPage = () => {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signupShcema),
  });

  const onSubmit = async (data: SignupInputs) => {
    const res = await authClient.signUp.email({
      name: data.username,
      email: data.email,
      password: data.password,
    });

    if (res.error) {
      console.error("Error creating account", res.error);
      toast.error("Error creating account");
      throw new Error("Error creating account");
    } else {
      toast.success("Account created successfully");
      router.push("/dashboard");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-3">
          <CardTitle className="font-bold">Create a new account.</CardTitle>
          <p className="text-muted-foreground text-center">
            Enter your credentials below to create an account
          </p>
        </CardHeader>
        <Separator />
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <Input
                type="text"
                {...register("username")}
                disabled={isSubmitting || isSubmitSuccessful}
                aria-invalid={errors.username && true}
                placeholder="Arthur Morgan"
              />
              {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <Input
                type="email"
                {...register("email")}
                disabled={isSubmitting || isSubmitSuccessful}
                aria-invalid={errors.email && true}
                placeholder="email@example.com"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <Input
                type="password"
                aria-invalid={errors.password && true}
                disabled={isSubmitting || isSubmitSuccessful}
                {...register("password")}
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isSubmitSuccessful}
              className="disabled:bg-muted-foreground"
            >
              Sign up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-center mx-auto">
            Already have an account?
            <span className="underline">
              {" "}
              <Link href={"/"}>Sign in</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignupPage;
