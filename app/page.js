"use client";
import Hero from "./hero/Hero";
import Layout from "./components/Layout";
import ProductCard from "./products/ProductCard";
import Testimonial from "./testimonial/Testimonial";
import BlogCardSlider from "./blog/BlogCardSlider";

export default function Home() {
  return (
    <Layout>
    <Hero/>
    <ProductCard />
    <BlogCardSlider />
    <Testimonial />
    </Layout>
  );
}
