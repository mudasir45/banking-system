"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOTP(true);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (showOTP) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-background-alt">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
              2-Step Verification
            </h1>
            <p className="text-text-secondary">
              We&apos;ve sent a verification code to your email
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center tracking-widest text-xl"
              />
            </div>

            <Button fullWidth onClick={handleVerifyOtp} isLoading={isLoading}>
              Verify & Log In
            </Button>

            <div className="mt-4 text-center">
              <p className="text-sm text-text-secondary">
                Didn&apos;t receive a code?{" "}
                <button className="text-primary font-medium hover:text-primary-dark">
                  Resend Code
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-background-alt">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
            Log In to Your Account
          </h1>
          <p className="text-text-secondary">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="yourname@example.com"
                leftIcon={<MailIcon size={18} />}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                leftIcon={<LockIcon size={18} />}
                rightIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={togglePasswordVisibility}
                    className="text-text-secondary hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                }
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-text-secondary"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary-dark"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading}>
              Log In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
