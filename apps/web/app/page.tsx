import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-slate-800 text-white p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold">Chess Master</h2>
          <div className="space-x-4">
            <a href="#" className="hover:text-amber-300 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors">
              Learn
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors">
              About
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Main Header */}
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-slate-800">
            Chess <span className="text-amber-700">Master</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Experience the royal game of strategy and intellect
          </p>
        </section>

        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Chess GIF */}
            <div className="w-full md:w-1/2 p-6 flex justify-center items-center bg-slate-100">
              <div className="relative border-8 border-amber-800 shadow-xl">
                <Image
                  src="https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/TotallyJuvenal/php1HL4fp.gif"
                  alt="Chess Game Animation"
                  width={400}
                  height={400}
                  className="max-w-full h-auto"
                />
              </div>
            </div>

            {/* Right side - Title and Buttons */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
                  Play Chess Online
                </h2>
                <p className="text-lg text-slate-600 mb-2">
                  Join our thriving community of chess enthusiasts.
                </p>
                <p className="text-lg text-slate-600">
                  Play chess online with
                  <span className="font-bold text-amber-700"> 1.5M+ </span>
                  players from around the world.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-amber-700 hover:bg-amber-800 text-white text-lg py-6 px-8">
                  Play Online
                </Button>
                <Button className="bg-slate-700 hover:bg-slate-800 text-white text-lg py-6 px-8">
                  Play with Bot
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
            Why Choose Chess Master?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-amber-800">
                Fast Matchmaking
              </h3>
              <p className="text-slate-600">
                Find opponents at your skill level in seconds
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-amber-800">
                Advanced Analytics
              </h3>
              <p className="text-slate-600">
                Review your games and track your progress
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-amber-800">
                Interactive Lessons
              </h3>
              <p className="text-slate-600">
                Learn and improve with guided tutorials
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-slate-800 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make your move?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of players already enjoying Chess Master. Create your
            free account and start playing today.
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 px-8">
            Create Free Account
          </Button>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p>© 2025 Chess Master. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}