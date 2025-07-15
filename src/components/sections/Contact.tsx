import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

type FormFields = {
  name: string;
  email: string;
  message: string;
  botcheck?: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormFields>({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<string>("");

  const apiKey =
    import.meta.env.VITE_PUBLIC_ACCESS_KEY ||
    "99aa0c6c-d1c2-49cc-b52c-290963d5a8f9";

  const { submit: onSubmit } = useWeb3Forms<FormFields>({
    access_key: apiKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[90vh] flex items-center"
    >
      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12">
          <h2 className="text-4xl font-extrabold mb-2 text-center text-indigo-700 dark:text-indigo-400 drop-shadow">
            Contact Me
          </h2>
          <p className="mb-8 text-center text-gray-500 dark:text-gray-300">
            Have a question or want to work together? Send me a message!
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            <input
              type="checkbox"
              tabIndex={-1}
              className="hidden"
              style={{ display: "none" }}
              {...register("botcheck")}
            />

            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  autoComplete="off"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 ring-red-100"
                      : "border-gray-300 dark:border-gray-700 focus:border-indigo-600"
                  }`}
                  {...register("name", {
                    required: "Full name is required",
                    maxLength: { value: 80, message: "Max 80 characters" },
                  })}
                />
                <span className="absolute left-3 top-3.5 text-indigo-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 21v-2a4 4 0 00-8 0v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
              </div>
              {errors.name && (
                <div className="mt-1 text-red-600 text-sm">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email_address"
                className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email_address"
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="off"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 ring-red-100"
                      : "border-gray-300 dark:border-gray-700 focus:border-indigo-600"
                  }`}
                  {...register("email", {
                    required: "Enter your email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                <span className="absolute left-3 top-3.5 text-indigo-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 12a4 4 0 01-8 0V8a4 4 0 118 0v4zm-4 8c4 0 7-3.134 7-7H5c0 3.866 3 7 7 7z" />
                  </svg>
                </span>
              </div>
              {errors.email && (
                <div className="mt-1 text-red-600 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  placeholder="Type your message here..."
                  className={`w-full px-4 py-3 border-2 rounded-lg resize-none transition-all duration-200 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-500 outline-none bg-gray-50 dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 h-36 ${
                    errors.message
                      ? "border-red-500 focus:border-red-500 ring-red-100"
                      : "border-gray-300 dark:border-gray-700 focus:border-indigo-600"
                  }`}
                  {...register("message", {
                    required: "Enter your Message",
                  })}
                />
                <span className="absolute left-3 top-3.5 text-indigo-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 10H7m6 4H7m4-8H7m-2 6V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2z" />
                  </svg>
                </span>
              </div>
              {errors.message && (
                <div className="mt-1 text-red-600 text-sm">
                  {errors.message.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl shadow-md hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:bg-gradient-to-r dark:from-indigo-600 dark:to-indigo-900 dark:text-white"
            >
              {isSubmitting ? (
                <svg
                  className="w-5 h-5 mx-auto text-white dark:text-indigo-200 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {isSubmitSuccessful && isSuccess && (
            <div className="mt-6 text-sm text-center text-green-600 bg-green-50 dark:bg-green-900/40 py-3 rounded-lg shadow">
              {message || "Success. Message sent successfully"}
            </div>
          )}
          {isSubmitSuccessful && !isSuccess && (
            <div className="mt-6 text-sm text-center text-red-600 bg-red-50 dark:bg-red-900/40 py-3 rounded-lg shadow">
              {message || "Something went wrong. Please try later."}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
