import LoginForm from "./components/Auth/LoginForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow  mx-auto px-4 py-8 space-y-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to DoggySearch</h1>
        <p className="text-xl text-center">
          Find your perfect furry companion today!
        </p>
        <LoginForm />
      </main>
    </div>
  );
}
