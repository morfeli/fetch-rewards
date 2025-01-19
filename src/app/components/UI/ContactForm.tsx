"use client";

import { useState } from "react";
import { Label } from "../ShadcnUI/Label";
import { Input } from "../ShadcnUI/Input";
import { Button } from "../ShadcnUI/Button";
import { Textarea } from "../ShadcnUI/Textarea";
import { toast } from "sonner";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      toast("Thank you for reaching out!", {
        description:
          "Please allow up to 1 business day for us to get back to you!",
      });

      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-100 p-6 rounded-lg shadow-md fade-in max-w-[800px] mx-auto"
      >
        <div>
          <Label htmlFor="name" className="text-slate-700 font-medium">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`bg-slate-200 border-slate-300 text-slate-800 focus:border-slate-500 focus:ring-slate-500 ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="text-slate-700 font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-slate-200 border-slate-300 text-slate-800 focus:border-slate-500 focus:ring-slate-500 ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="message" className="text-slate-700 font-medium">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`bg-slate-200 border-slate-300 text-slate-800 focus:border-slate-500 focus:ring-slate-500 ${errors.message ? "border-red-500" : ""}`}
            rows={4}
          />
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-slate-600 hover:bg-slate-700 text-white"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}
