import { motion } from "framer-motion";
import Image from "next/image";
import { FiCommand } from "react-icons/fi";

export default function FeatureSection() {
  return (
    <section className="w-full py-24 bg-white flex flex-col items-center px-4">
      {/* Top label */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-wider text-blue-500 uppercase"
      >
        Better team collaboration
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 text-center"
      >
        Elevate your productivity to  
        <br className="hidden sm:block" />
        the next level
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 max-w-2xl text-center text-gray-600"
      >
        Whether you're managing tasks, collaborating with your team, or customizing your workflow, BrainLY empowers you to work smarter and accomplish more.
      </motion.p>

      {/* Main Card Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 w-full max-w-6xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
      >
        {/* Title row */}
        <div className="flex items-center gap-2 mb-2">
          <FiCommand className="text-blue-600" size={18} />
          <h3 className="text-lg font-semibold text-gray-900">
            Integrate with your favorite tools
          </h3>
        </div>

        <p className="text-gray-600 mb-6">
          Connect BrainLY with your existing tools like Slack, Google Calendar, and more.
        </p>

        {/* Large preview image */}
        <div className="w-full h-auto rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <Image
            src="/integrations-preview.png"
            alt="Integrations Preview"
            width={1600}
            height={950}
            className="w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mt-10">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <FiCommand className="text-blue-600" size={18} />
            <h3 className="text-lg font-semibold">Integrate with your tools</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Whether you're working on complex projects, BrainLY provides flexible workflows that adapt to how you work best.
          </p>
          <Image
            src="/integration-card-1.png"
            alt="Workflow"
            width={500}
            height={350}
            className="rounded-lg w-full"
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <FiCommand className="text-blue-600" size={18} />
            <h3 className="text-lg font-semibold">Integrate with your tools</h3>
          </div>
          <p className="text-gray-600 mb-4">
            BrainLY makes collaboration a breeze, ensuring everyone stays on the same page no matter where they are.
          </p>
          <Image
            src="/integration-card-2.png"
            alt="Team Sync"
            width={500}
            height={350}
            className="rounded-lg w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
