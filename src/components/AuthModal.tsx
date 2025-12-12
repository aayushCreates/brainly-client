import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";

interface AuthCardProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  modalType: "login" | "register";
}

export default function AuthModal({
  openModal,
  setOpenModal,
  modalType,
}: AuthCardProps) {
  const [isLogin, setIsLogin] = useState(modalType === "login");

  const { register, login } = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, phone, password);
      }
      setOpenModal(false); // Close modal after success
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!openModal) return null;

  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 relative"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-xl"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <h1 className="text-lg mb-5">{isLogin ? "Login" : "Register"}</h1>

            {/* Form */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.form
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-2"
              >
                {!isLogin && (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      required
                      value={name}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-black/20 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="phone"
                      required
                      value={phone}
                      placeholder="Phone No."
                      className="w-full px-4 py-3 border border-black/20 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                )}
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black/20 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  required
                  value={password}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black/20 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="w-full py-3 bg-linear-to-r from-blue-400/90 to-blue-600 text-white border border-blue-500/40 font-semibold rounded-md shadow-sm transition hover:cursor-pointer mt-2"
                  onClick={handleSubmit}
                >
                  {isLogin ? "Login" : "Register"}
                </motion.button>
              </motion.form>
            </AnimatePresence>

            <div className="flex items-center gap-2 mt-6 mb-4">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Auth */}
            <button
              className="w-full flex items-center justify-center gap-3 py-3 mb-6 border border-black/10 rounded-md shadow-sm bg-gray-100 transition hover:cursor-pointer"
              onClick={() => {}}
            >
              <FcGoogle size={26} />
              <span className="font-medium text-gray-700">
                {isLogin ? "Sign in with Google" : "Sign up with Google"}
              </span>
            </button>

            {/* Bottom switch */}
            <p className="mt-6 text-sm text-gray-500 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-medium hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
