import { BrandMark } from "@/components/brand-mark";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <BrandMark className="size-9 text-primary" />
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-2xl font-medium text-foreground text-balance">
              Solene
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to continue to your workspace
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
