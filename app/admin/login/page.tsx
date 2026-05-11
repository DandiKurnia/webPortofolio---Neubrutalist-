"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const from = urlParams.get("from") || "/admin/overview";
        router.push(from);
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface brutalist-grid min-h-screen flex items-center justify-center p-4 md:p-16 relative overflow-hidden">
      <main className="w-full max-w-[500px] relative z-10">
        {/* Computer Window Container */}
        <div className="bg-surface-container-lowest border-[4px] border-on-surface shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col relative z-10">
          {/* Window Title Bar (Vibrant Yellow Header) */}
          <div className="bg-primary-container border-b-[4px] border-on-surface px-2 py-4 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-on-surface bg-[#FF5F56]"></div>
              <div className="w-4 h-4 rounded-full border-2 border-on-surface bg-[#FFBD2E]"></div>
              <div className="w-4 h-4 rounded-full border-2 border-on-surface bg-[#27C93F]"></div>
            </div>
            <div className="font-mono text-[14px] leading-[120%] font-bold text-on-surface uppercase tracking-widest">
              System_Auth_v1.0
            </div>
            <div className="w-12"></div>
          </div>
          {/* Login Content Area */}
          <div className="p-2 md:p-6 flex flex-col gap-6">
            <header className="text-center">
              <h1 className="font-headline text-[48px] leading-[110%] tracking-[-0.02em] font-black text-on-surface mb-2">
                Login
              </h1>
              <p className="font-body text-[18px] leading-[150%] font-medium text-on-surface-variant">
                Enter your credentials to access the terminal.
              </p>
            </header>

            {error && (
              <div className="bg-error border-4 border-on-surface p-4 brutal-shadow-sm">
                <p className="font-mono text-[14px] leading-[120%] font-bold text-on-error">
                  {error}
                </p>
              </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label
                  className="font-mono text-[14px] leading-[120%] font-bold uppercase"
                  htmlFor="email"
                >
                  User_Email
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] leading-[120%] font-bold focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#ac2471] transition-all placeholder:font-mono placeholder:text-on-surface-variant/50"
                    id="email"
                    placeholder="name@domain.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label
                  className="font-mono text-[14px] leading-[120%] font-bold uppercase"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] leading-[120%] font-bold focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#ac2471] transition-all placeholder:font-mono placeholder:text-on-surface-variant/50"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* Actions Row */}
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    className="w-6 h-6 border-4 border-on-surface rounded-none checked:bg-primary appearance-none checked:border-on-surface transition-all cursor-pointer relative after:content-[''] after:hidden checked:after:block after:w-2 after:h-2 after:bg-on-surface after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
                    type="checkbox"
                    disabled={isLoading}
                  />
                  <span className="font-mono text-[14px] leading-[120%] font-bold">
                    Remember_Me
                  </span>
                </label>
                <Link
                  className="font-mono text-[14px] leading-[120%] font-bold text-tertiary underline decoration-2 underline-offset-4 hover:text-on-surface transition-colors"
                  href="#"
                >
                  Forgot Password?
                </Link>
              </div>
              {/* Submit Button (Bright Pink) */}
              <button
                className="w-full py-6 bg-tertiary text-on-tertiary border-[4px] border-on-surface shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                <span className="font-headline text-[32px] leading-[110%] font-black">
                  {isLoading ? "Signing In..." : "Sign In"}
                </span>
                <span
                  className="material-symbols-outlined font-black"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Decorative "Sticker" elements */}
        <div className="relative hidden md:block z-0">
          <div className="absolute -top-[580px] -right-[100px] -rotate-12 bg-primary-container border-[4px] border-on-surface p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-none">
            <span className="font-headline text-[96px] leading-[100%] tracking-[-0.04em] font-black text-on-surface">
              !
            </span>
          </div>
          <div className="absolute -bottom-[20px] -left-[80px] rotate-6 bg-tertiary-fixed border-[4px] border-on-surface px-4 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-none z-100">
            <span className="font-mono text-[14px] leading-[120%] font-bold text-on-tertiary-fixed-variant">
              ACCESS_GRANTED.SYS
            </span>
          </div>
        </div>
      </main>

      {/* Global Footer for Identity */}
      <footer className="absolute bottom-0 left-0 w-full flex justify-between items-end p-4 md:p-6 pointer-events-none z-20">
        <div className="pointer-events-auto bg-on-surface text-surface p-2 border-[4px] border-on-surface">
          <p className="font-mono text-[14px] leading-[120%] font-bold">
            © 2026 DanBildad
          </p>
        </div>
      </footer>
    </div>
  );
}
