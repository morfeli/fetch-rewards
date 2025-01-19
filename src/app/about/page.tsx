import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ShadcnUI/Card";

export default function AboutPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto bg-white mt-24 rounded-2xl shadow-md shadow-slate-500 fade-in">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            About DoggySearch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-center text-gray-600">
            Welcome to DoggySearch, your ultimate destination for finding your
            perfect furry companion!
          </p>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p>
              At DoggySearch, we're passionate about connecting loving homes
              with dogs in need. Our platform is designed to make the process of
              finding and adopting a dog as seamless and joyful as possible.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">What We Offer</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>A wide variety of dogs from shelters and rescues</li>
              <li>Easy-to-use search and filter options</li>
              <li>Detailed profiles for each dog</li>
              <li>Resources for new pet owners</li>
              <li>Support throughout the adoption process</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Our Team</h2>
            <p>
              We're a group of dedicated animal lovers, tech enthusiasts, and
              shelter volunteers who came together to create a platform that
              makes a difference in the lives of dogs and humans alike.
            </p>
          </div>
          <p className="text-center text-gray-600 italic">
            Join us in our mission to find loving homes for every dog!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
