"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-background-alt">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
            Create Your Account
          </h1>
          <p className="text-text-secondary">
            Enter your details to create a secure banking account
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Input
                  id="firstName"
                  type="text"
                  label="First Name"
                  placeholder="John"
                  leftIcon={<UserIcon size={18} />}
                  error={errors.firstName?.message}
                  {...register("firstName")}
                />
              </div>

              <div>
                <Input
                  id="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  leftIcon={<UserIcon size={18} />}
                  error={errors.lastName?.message}
                  {...register("lastName")}
                />
              </div>
            </div>

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
                id="phone"
                type="tel"
                label="Phone Number"
                placeholder="(123) 456-7890"
                leftIcon={<PhoneIcon size={18} />}
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>

            <div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Create a strong password"
                leftIcon={<LockIcon size={18} />}
                rightIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
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

            <div>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm your password"
                leftIcon={<LockIcon size={18} />}
                rightIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-text-secondary hover:text-primary"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                }
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  {...register("terms")}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-text-secondary">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-primary hover:text-primary-dark"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-primary hover:text-primary-dark"
                  >
                    Privacy Policy
                  </Link>
                </label>
                {errors.terms && (
                  <p className="mt-1 text-xs text-danger">
                    {errors.terms.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
