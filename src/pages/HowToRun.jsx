import { motion } from 'framer-motion';

export default function HowToRun() {
  return (
    <div className="pt-10 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-brand-blue mb-6">How To Run This Project</h1>
          <p className="text-xl text-gray-300">
            Developer guide for setting up, running, and deploying the Meru Prison Stars website.
          </p>
        </motion.div>

        <div className="space-y-8 text-gray-300">
          <section className="glass-card p-8 border-l-4 border-brand-blue">
            <h2 className="text-2xl font-bold text-white mb-4">1. Prerequisites</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Node.js (v18 or higher recommended)</li>
              <li>npm (Node Package Manager)</li>
            </ul>
          </section>

          <section className="glass-card p-8 border-l-4 border-brand-gold">
            <h2 className="text-2xl font-bold text-white mb-4">2. Setup & Installation</h2>
            <p className="mb-4">Open your terminal and navigate to the project directory, then run:</p>
            <div className="bg-black/50 p-4 rounded-md font-mono text-brand-gold mb-4">
              npm install
            </div>
            <p>This installs all required dependencies including React, Vite, TailwindCSS, and Framer Motion.</p>
          </section>

          <section className="glass-card p-8 border-l-4 border-brand-gold">
            <h2 className="text-2xl font-bold text-white mb-4">3. Running Locally</h2>
            <p className="mb-4">Start the development server:</p>
            <div className="bg-black/50 p-4 rounded-md font-mono text-brand-gold mb-4">
              npm run dev
            </div>
            <p>Open your browser and navigate to <code className="text-white">http://localhost:5173</code> to view the project.</p>
          </section>

          <section className="glass-card p-8 border-l-4 border-white">
            <h2 className="text-2xl font-bold text-white mb-4">4. Project Structure</h2>
            <pre className="bg-black/50 p-4 rounded-md font-mono text-sm overflow-x-auto text-gray-400">
{`src/
├── assets/        # Images, fonts, etc.
├── components/    # Reusable UI components (Navbar, Footer, etc.)
├── data/          # Mock data for players, events, etc.
├── layouts/       # Page layouts (MainLayout)
├── pages/         # Route pages (Home, About, etc.)
├── App.jsx        # Main routing component
├── main.jsx       # Entry point
└── index.css      # Tailwind directives & global styles`}
            </pre>
          </section>

          <section className="glass-card p-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-white mb-4">5. Build & Deployment</h2>
            <p className="mb-4">To build the project for production:</p>
            <div className="bg-black/50 p-4 rounded-md font-mono text-brand-gold mb-4">
              npm run build
            </div>
            <p className="mb-4">This generates a <code className="text-white">dist/</code> directory ready to be deployed to Vercel, Netlify, or any static hosting service.</p>
            <p><strong>To deploy to Vercel/Netlify:</strong> Simply connect your GitHub repository and let the platform auto-detect Vite settings.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
