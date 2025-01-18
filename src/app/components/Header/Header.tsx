"use client";

import { useState } from "react";
import Link from "next/link";

import { Menu, X, Dog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ShadcnUI/Avatar";
import { Button } from "../ShadcnUI/Button";

type User = {
  name: string;
  avatar: string;
} | null;

export default function Header() {
  const [user, setUser] = useState<User>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function would be replaced with actual login logic
  const handleLogin = () => {
    setUser({ name: "John Doe", avatar: "/placeholder.svg" });
  };

  // This function would be replaced with actual logout logic
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Dog className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">DoggySearch</span>
        </Link>

        <nav className="hidden md:flex space-x-4">
          {user ? (
            <>
              <Link href="/about" className="text-gray-600 hover:text-blue-500">
                About
              </Link>

              <Link
                href="/favorites"
                className="text-gray-600 hover:text-blue-500"
              >
                Favorites
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-500"
              >
                Contact
              </Link>
            </>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </nav>

        {user && (
          <div className="hidden md:flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 px-4 py-2">
            {user ? (
              <>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-500"
                >
                  About
                </Link>
                <Link
                  href="/search"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Search
                </Link>
                <Link
                  href="/favorites"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Favorites
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Contact
                </Link>
                <Link
                  href="/chat"
                  className="text-gray-600 hover:text-blue-500"
                >
                  AI Chat
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={handleLogin}>Login</Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
