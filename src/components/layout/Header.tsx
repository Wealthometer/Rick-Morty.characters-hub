import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="relative py-8 md:py-12 overflow-hidden">
      {/* Background portal effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] opacity-20 gradient-portal blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] opacity-10 gradient-portal blur-3xl"
        />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-display text-glow text-primary mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Rick & Morty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
          >
            Explore characters from across the multiverse
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
}
