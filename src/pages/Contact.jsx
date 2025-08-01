import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser"; // ✅ Import EmailJS

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: "",         // ⭐ Added rating state
    feedbackText: "",   // 📝 Added feedback text state
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceID = "service_9kwy5sl";
    const templateID = "template_leho5uh";
    const publicKey = "fQtTb5FRPGKZKkIP9";

    try {
      const result = await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          rating: formData.rating || "No rating",                // ⭐ Added rating to email
          feedback: formData.feedbackText || "No additional feedback", // 📝 Added feedback text to email
        },
        publicKey
      );

      if (result.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          rating: "",         // Reset rating
          feedbackText: "",   // Reset feedback text
        });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle star rating click
  const handleRatingChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-[70vh] md:min-h-screen bg-transparent flex items-center justify-center p-4 relative">
      {/* Background elements */}
      <div className="absolute top-0 md:top-1/4 left-1/4 w-64 h-64 bg-blue-600/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 md:bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/40 rounded-full blur-3xl" />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto my-8 sm:my-0"
      >
        <motion.div
          className="bg-white/50 dark:bg-gray-500/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="p-6 sm:p-8 md:p-10">
            {/* Header section */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Contact Us
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Have questions? We'd love to hear from you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div cla>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg dark:text-white bg-white/30 dark:bg-gray-700/30 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 dark:text-white rounded-lg bg-white/30 dark:bg-gray-700/30 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 dark:text-white rounded-lg bg-white/30 dark:bg-gray-700/30 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* === START Added Feedback Section === */}

                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Rate Us
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className={`text-2xl transition-colors ${
                            formData.rating >= star
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Textarea */}
                  <div>
                    <label
                      htmlFor="feedbackText"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1 mt-4"
                    >
                      Additional Feedback (optional)
                    </label>
                    <textarea
                      id="feedbackText"
                      name="feedbackText"
                      value={formData.feedbackText}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 dark:text-white rounded-lg bg-white/30 dark:bg-gray-700/30 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Let us know more..."
                    />
                  </div>

                  {/* === END Added Feedback Section === */}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex justify-center items-center py-3 px-6 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg mt-4"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-6"
              >
                {/* Contact Information Card */}
                <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                  {/* Card Header */}
                  <div className="bg-blue-600/10 dark:bg-blue-900/20 px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Contact Information
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-5">
                    <div className="flex items-start group">
                      <div className="flex-shrink-0 bg-blue-100/70 dark:bg-blue-900/40 p-3 rounded-lg group-hover:bg-blue-200/50 dark:group-hover:bg-blue-900/60 transition-colors">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-xs text-start font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email
                        </p>
                        <a
                          href="mailto:contact@bookstore.com"
                          className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          divyanshtripathi204@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="flex-shrink-0 bg-blue-100/70 dark:bg-blue-900/40 p-3 rounded-lg group-hover:bg-blue-200/50 dark:group-hover:bg-blue-900/60 transition-colors">
                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-xs text-start font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Phone
                        </p>
                        <a
                          href="tel:+15551234567"
                          className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          +91 8318548946
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start group">
                      <div className="flex-shrink-0 bg-blue-100/70 dark:bg-blue-900/40 p-3 rounded-lg group-hover:bg-blue-200/50 dark:group-hover:bg-blue-900/60 transition-colors">
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-xs text-start font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Address
                        </p>
                        <address className="not-italic text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          India
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
                 {/* Business Hours Card */}
                <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                  {/* Card Header */}
                  <div className="bg-blue-600/10 dark:bg-blue-900/20 px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Business Hours
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-gray-700/50 last:border-0">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Monday - Friday
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white bg-blue-100/50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                          9:00 AM - 6:00 PM
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-gray-200/50 dark:border-gray-700/50 last:border-0">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Saturday
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white bg-blue-100/50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                          10:00 AM - 4:00 PM
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Sunday
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white bg-red-100/50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                          Closed
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Back To Home Link */}
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Contact;