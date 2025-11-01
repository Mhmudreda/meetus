"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "@/lib/redux/slices/authSlice";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import styles from "./profile.module.css";

function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();

        if (data.user) {
          dispatch(setUser(data.user));
        }
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        dispatch(logout());
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      dispatch(logout());
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 shrink-0 items-center border-b px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md">
            <div className={styles.profileCard}>
              {isLoading ? (
                <div className={styles.loading}>Loading profile...</div>
              ) : error ? (
                <div className={styles.error}>{error}</div>
              ) : user ? (
                <>
                  <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>{user.name?.[0] || "p"}</div>
                  </div>
                  <div className={styles.profileInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Name</span>
                      <span className={styles.value}>{user.name}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>ID</span>
                      <span className={styles.value}>{user.id}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Email</span>
                      <span className={styles.value}>{user.email}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                   
                    <button
                      onClick={handleLogout}
                      className="flex-1 px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles.error}>No user data available</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;