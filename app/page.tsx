"use client"
import Banner from "@/components/banner/Banner";
import ProductsPage from "@/components/products/AllProducts";
import TopProducts from "@/components/top/TopProducts";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiFillProduct } from "react-icons/ai";

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading) return <p>Loading...</p>; // or skeleton

  if (!user) return null;
  return (
    <div>
      {/* <Banner /> */}
      {/* <TopProducts/> */}
      <ProductsPage/>
    </div>
  );
}
