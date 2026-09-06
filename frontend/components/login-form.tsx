"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (
      (!isRegistering && !email.trim()) ||
      !password.trim() ||
      (isRegistering && !name.trim())
    ) {
      setError(
        isRegistering
          ? "Enter your name, email, and password to continue."
          : "Enter your email and password to continue.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/${isRegistering ? "register" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...(isRegistering ? { name: name.trim() } : {}),
            email: email.trim(),
            password,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to sign in.");
      }

      router.push("/home");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to sign in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {isRegistering ? (
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 bg-card"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 bg-card"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </Label>
          {!isRegistering ? (
            <a
              href="#"
              className="text-xs font-medium text-accent hover:text-accent/80 transition-colors"
            >
              Forgot password?
            </a>
          ) : null}
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-11 bg-card"
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 mt-1 w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting
          ? isRegistering
            ? "Creating account…"
            : "Signing in…"
          : isRegistering
            ? "Create account"
            : "Sign in"}
      </Button>

      <button
        type="button"
        onClick={() => {
          setIsRegistering((current) => !current);
          setError(null);
        }}
        className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
      >
        {isRegistering
          ? "Already have an account? Sign in"
          : "Don't have an account? Create one"}
      </button>
    </form>
  );
}
