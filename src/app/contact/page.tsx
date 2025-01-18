import { Button } from "@/app/components/ShadcnUI/Button";
import { Input } from "@/app/components/ShadcnUI/Input";
import { Textarea } from "@/app/components/ShadcnUI/Textarea";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input id="name" type="text" placeholder="Your name" />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input id="email" type="email" placeholder="Your email" />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <Textarea id="message" placeholder="Your message" rows={4} />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}
