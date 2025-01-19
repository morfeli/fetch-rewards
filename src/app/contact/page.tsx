import AuthCheck from "../components/UI/AuthCheck";
import { ContactForm } from "../components/UI/ContactForm";

export default function ContactPage() {
  return (
    <AuthCheck>
      <section className="max-w-[1000px] mx-auto px-4 py-8 min-h-screen flex flex-col ">
        <ContactForm />
      </section>
    </AuthCheck>
  );
}
