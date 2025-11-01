"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function withAuth(WrappedComponent) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
      // If not authenticated and no token in cookies, redirect to login
      const token = document.cookie.includes('token=');
      if (!token) {
        router.replace("/login");
      }
    }, [router]);

    // Always render the component, let middleware handle protection
    return <WrappedComponent {...props} />;
  };
}