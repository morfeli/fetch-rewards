import { Card, CardContent } from "../components/ShadcnUI/Card";
import { TeamMember } from "../components/UI/TeamMember";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About DogSearch</h1>

        <section className="mb-12">
          <Card>
            <CardContent className="prose max-w-none p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                At DogSearch, we're passionate about connecting dog lovers with
                their perfect furry companions. Our mission is to simplify the
                process of finding and adopting dogs, ensuring that every pup
                finds a loving home and every family finds their ideal pet.
              </p>
              <p>
                We believe that every dog deserves a chance at a happy life, and
                every person deserves the joy that a canine companion can bring.
                Through our innovative search platform and AI-powered matching
                system, we're making the dog adoption process more efficient,
                enjoyable, and successful for both dogs and their future
                families.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TeamMember
              name="Jane Doe"
              role="Founder & CEO"
              image="/placeholder.svg"
              description="Jane has been working in animal welfare for over 15 years and founded DogSearch to revolutionize dog adoption."
            />
            <TeamMember
              name="John Smith"
              role="Chief Technology Officer"
              image="/placeholder.svg"
              description="John brings 10 years of experience in AI and machine learning to create our innovative dog-matching algorithms."
            />
            <TeamMember
              name="Emily Brown"
              role="Head of Partnerships"
              image="/placeholder.svg"
              description="Emily works tirelessly to build relationships with shelters and rescue organizations across the country."
            />
          </div>
        </section>
      </main>
    </div>
  );
}
