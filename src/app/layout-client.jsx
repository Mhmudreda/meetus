"use client";

import React from 'react';
import Navbar from "./_component/navbar/Navbar";
import { usePathname } from 'next/navigation';

export default function LayoutWithNavbar({children}) {
  const pathname = usePathname();
  return (
    <>
      {children}
    </>
  );
}
