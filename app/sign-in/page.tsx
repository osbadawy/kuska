"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        setError(error.message || "Unable to sign in.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F5] px-5">
      <div className="w-full max-w-[420px]">
        <div className="rounded-[28px] border border-black/[0.06] bg-white/70 p-8 shadow-[0_20px_70px_rgba(42,31,28,0.08)] backdrop-blur-xl sm:p-10">
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="Kuska Motion"
              width={150}
              height={50}
              priority
              className="mx-auto h-auto w-[140px] object-contain"
            />

            <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.25em] text-[#C58F85]">
              Welcome back
            </p>

            <h1 className="mt-3 font-serif text-[40px] leading-none tracking-[-0.03em] text-[#28211F]">
              Sign in.
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#7A6C67]">
              Enter your details to continue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B5D58]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-black/[0.08]
                  bg-white/80
                  px-4
                  text-sm
                  text-[#28211F]
                  outline-none
                  transition
                  placeholder:text-[#8C7B75]/50
                  focus:border-[#D8A399]
                  focus:ring-4
                  focus:ring-[#D8A399]/10
                "
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B5D58]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-black/[0.08]
                  bg-white/80
                  px-4
                  text-sm
                  text-[#28211F]
                  outline-none
                  transition
                  focus:border-[#D8A399]
                  focus:ring-4
                  focus:ring-[#D8A399]/10
                "
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-full
                bg-[#292321]
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white
                transition
                hover:bg-[#3A312E]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}