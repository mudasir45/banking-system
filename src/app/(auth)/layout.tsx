import { ShieldIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background-alt">
      <header className="py-6 px-4 md:px-8 bg-white shadow-sm">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center">
            <div className="flex items-center justify-center p-1.5 bg-primary rounded-md mr-2">
              <ShieldIcon size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-primary">SecureBank</span>
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="py-6 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="text-center text-sm text-text-secondary">
            <p>
              &copy; {new Date().getFullYear()} SecureBank. All rights reserved.
            </p>
            <p className="mt-2">
              <Link
                href="/terms"
                className="text-primary hover:text-primary-dark hover:underline mx-2"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-primary hover:text-primary-dark hover:underline mx-2"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="text-primary hover:text-primary-dark hover:underline mx-2"
              >
                Contact Us
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
