import { motion } from "framer-motion";

const feedbacks = [
  {
    name: "Sophia Lee",
    role: "Product Manager at InnovateX",
    avatar: "/avatars/sophia.jpg", // replace with your avatar URLs or placeholders
    feedback:
      "BrainLY transformed the way our team captures and shares knowledge. It’s like having a second brain that makes collaboration effortless!",
  },
  {
    name: "Michael Chen",
    role: "Freelance Writer & Researcher",
    avatar: "/avatars/michael.jpg",
    feedback:
      "Finally, a tool that keeps all my ideas organized and easily accessible. BrainLY helps me stay productive and focused every day.",
  },
  {
    name: "Anika Patel",
    role: "UX Designer at Creativa",
    avatar: "/avatars/anika.jpg",
    feedback:
      "The intuitive interface and seamless collaboration features made BrainLY essential for our project workflows.",
  },
];

export default function FeedbackSection() {
  return (
    <section className="bg-white py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center max-w-3xl mx-auto"
      >
        <p className="text-sm font-mono uppercase text-blue-600 mb-2">What users say</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Trusted by creators, thinkers, and teams worldwide
        </h2>
      </motion.div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {feedbacks.map(({ name, role, avatar, feedback }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="bg-gray-50 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
          >
            <p className="text-gray-700 mb-6">&ldquo;{feedback}&rdquo;</p>
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt={`${name} avatar`}
                className="h-12 w-12 rounded-full object-cover border-2 border-blue-600"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
