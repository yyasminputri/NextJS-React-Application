"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
    <Link href={`/blog/${post.id}`} className="block">
      <div className="relative h-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
          {post.excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">
              MC
            </span>
            <span>{post.author}</span>
          </div>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>DURASI BACA {post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const BlogPage = () => {
  const [blogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Pin Resep Favoritmu dengan Fitur 'Masak Hari Ini' di Powerpuff!",
      excerpt: "Pernah bingung memilih resep untuk dimasak hari ini atau ingin membandingkan beberapa resep sebelum memutuskan?",
      image: "/img/image.png",
      author: "MAMAH POWERPUFF",
      date: "30 NOV 2024",
      readTime: "2 MENIT"
    },
    {
      id: 2,
      title: "Masak Tanpa Gangguan dengan Resep yang tak pernah padam",
      excerpt: "Kamu pernah nggak sih, sedang asyik memasak dengan resep yang terbuka di layar HP, tiba-tiba layar mati...",
      image: "/img/2.png",
      author: "MAMAH POWERPUFF",
      date: "30 NOV 2024",
      readTime: "3 MENIT"
    },
    {
      id: 3,
      title: "Jelajahi Kuliner Dunia di Powerpuff",
      excerpt: "Pernahkah kamu membayangkan bisa menjelajahi rasa dan aroma dari berbagai belahan dunia tanpa harus meninggalkan dapur?",
      image: "/img/3.png",
      author: "MAMAH POWERPUFF",
      date: "7 NOV 2024",
      readTime: "3 MENIT"
    },
    {
      id: 4,
      title: "Navigasi Fitur Baru Powerpuff dengan Mudah",
      excerpt: "Pembaruan aplikasi Powerpuff menghadirkan banyak fitur baru yang akan mempermudah pengalaman memasakmu sehari-hari bersama Powerpuff!",
      image: "/img/pp.png",
      author: "MAMAH POWERPUFF",
      date: "16 OKT 2024",
      readTime: "3 MENIT"
    },
    {
      id: 5,
      title: "Kacang Kaya Rasa: Serba Bisa di Dapur!",
      excerpt: "Kacang-kacangan adalah bahan serbaguna yang bisa ditemukan di banyak dapur. Selain sebagai camilan yang lezat...",
      image: "/img/5.png",
      author: "MAMAH POWERPUFF",
      date: "25 SEP 2024",
      readTime: "3 MENIT"
    },
    {
      id: 6,
      title: "Tips Menyimpan Bumbu Dapur Agar Tetap Segar",
      excerpt: "Bumbu dapur adalah kunci masakan lezat. Mari pelajari cara menyimpan bumbu dengan benar agar tetap segar dan aromanya terjaga.",
      image: "/img/4.png",
      author: "MAMAH POWERPUFF",
      date: "20 SEP 2024",
      readTime: "3 MENIT"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#F8F9FF] py-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;