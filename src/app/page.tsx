import LoginForm from "./components/Auth/LoginForm";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookiesList = await cookies();

  const isAuthenticated = cookiesList.get("isAuthenticated");

  return (
    <div className="min-h-screen  flex flex-col fade-in">
      <main className="flex-grow mx-auto px-4 py-8 space-y-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to DoggySearch</h1>
        <p className="text-xl text-center">
          Find your perfect furry companion today!
        </p>
        <LoginForm isAuthenticated={isAuthenticated} />
      </main>
    </div>
  );
}
