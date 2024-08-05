"use client";

import { BorderBeam } from "@/components/magicui/border-beam";

import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string({
    required_error: "Password is required",
  }),
});

export default function LoginPage() {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "patelvirendra62@gmail.com",
      password: "123456789",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsLoading(true);
    setError("");

    const loginResponse = await login(
      values.email.toString(),
      values.password.toString()
    );

    if (loginResponse.error) {
      setIsLoading(false);
      setError(loginResponse.error!.message);
    }
  }

  console.log({ error });

  return (
    <div className="h-[70vh] flex justify-center items-center overflow-hidden">
      <div className="shadow shadow-lg relative h-[500px] max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-neutral-950">
        <BorderBeam size={250} delay={0} duration={10} />
        <div className="my-5">
          <h2 className="font-bold text-xl my-4 text-neutral-800 dark:text-neutral-200">
            Welcome to CodeHuddle
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Join our community of developers and start collaborating on code,
            sharing knowledge, and solving problems together.
          </p>
        </div>

        <div className="my-2 text-sm max-w-sm mt-2 text-red-800">{error}</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete={"off"}
                      placeholder="sample@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete={"off"}
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading ? (
              <LoadingButton disabled>Please Wait</LoadingButton>
            ) : (
              <Button type="submit" className="relative">
                Login
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
