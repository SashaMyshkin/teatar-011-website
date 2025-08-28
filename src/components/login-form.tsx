"use client";

import { supabaseBrowserClient } from "@/lib/client";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabaseBrowserClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "20rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding:"2rem"
        }}
      >
        <Box>
          <Box sx={{width:"fit-content", margin:"auto"}}>
            <Image
              style={{borderRadius:"50%"}}
              width="100"
              height="100"
              src={`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/logo.png`}
              alt="Logo"
            ></Image>
          </Box>
        </Box>
        <Box>
          <TextField
            id="email"
            label="Unesite svoj imejl"
            variant="standard"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoFocus
          />
        </Box>
        <Box>
          <TextField
            id="password"
            label="Unesite svoju lozinku"
            variant="standard"
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Box>
        <Box>
          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
            fullWidth
          >
            Uloguj se
          </Button>
          {error && <Typography color="danger">{error}</Typography>}
        </Box>
      </Paper>
    </>
  );
  /*<form onSubmit={handleLogin}>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="m@example.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Label htmlFor="password">Password</Label>
      <Link
        href="/auth/forgot-password"
        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
      >
        Forgot your password?
      </Link>

      <Input
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>*/
}
