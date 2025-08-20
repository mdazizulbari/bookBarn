import React, { useEffect } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  BookHeart,
  Users,
  Target,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, mirror: false });
  }, []);

  const libraryImageUrl =
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80";
  const teamImageUrl =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80";

  return (
      <section className="relative px-4 sm:px-6 py-16 md:py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111827] text-slate-200 overflow-hidden selection:bg-purple-700 selection:text-white">
          <title>BookBarn | About Us</title>

        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-indigo-600 opacity-20 rounded-full blur-3xl -z-0 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-pink-600 opacity-20 rounded-full blur-3xl -z-0 animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/3 w-60 h-60 md:w-80 md:h-80 bg-purple-600 opacity-10 rounded-full blur-3xl -z-0 animate-pulse delay-500" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-blue-400 tracking-tight">
              About BookBarn
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto text-slate-400">
              Where every page tells a story, and every reader finds their next
              adventure in the vast cosmos of literature.
            </p>
          </div>

          {/* Section 1 */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
            <div data-aos="fade-right" className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 animate-tilt" />
              <img
                src={libraryImageUrl}
                alt="Library"
                className="relative rounded-2xl shadow-xl hover:scale-[1.03] transition-transform duration-500 ease-in-out aspect-video object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/1e293b/94a3b8?text=Book+Haven";
                }}
              />
            </div>
            <div
              data-aos="fade-left"
              className="prose prose-invert prose-lg max-w-none"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-5 text-blue-400">
                Our Story
              </h2>
              <p>
                BookBarn was forged in the crucible of passion for literature,
                with a singular mission: to democratize reading and make the
                boundless universe of books accessible to all.
              </p>
              <p>
                We champion the transformative power of narratives—their
                capacity to ignite inspiration, disseminate wisdom, and reshape
                destinies.
              </p>
            </div>
          </div>

          {/* Guiding Stars */}
          <div className="mb-16 md:mb-24 text-center" data-aos="zoom-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-blue-400">
              Our Guiding Stars
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  icon: BookHeart,
                  title: "Passion for Reading",
                  text: "Fostering a lifelong love for books.",
                },
                {
                  icon: Users,
                  title: "Community Centric",
                  text: "Building a vibrant space for book lovers.",
                },
                {
                  icon: Target,
                  title: "Accessibility for All",
                  text: "Making literature available to everyone.",
                },
              ].map(({ icon: Icon, title, text }, i) => (
                <div
                  key={i}
                  className="bg-base-200 p-6 rounded-xl shadow-md border border-gray-700 hover:border-purple-500 transition-all transform hover:-translate-y-1"
                >
                  <Icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
            <div
              data-aos="fade-left"
              className="prose prose-invert prose-lg max-w-none md:order-2"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-5 text-blue-400">
                Meet the Curators
              </h2>
              <p>
                Behind BookBarn is a dedicated crew of bibliophiles, tech
                wizards, and dreamers, united by a shared love for stories.
              </p>
              <p>
                Whether you’re a casual reader or a seasoned bibliophile,
                BookBarn is your celestial guide to celebrate the enduring magic
                of books.
              </p>
            </div>
            <div data-aos="fade-right" className="relative group md:order-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 animate-tilt" />
              <img
                src={teamImageUrl}
                alt="Team"
                className="relative rounded-2xl shadow-xl hover:scale-[1.03] transition-transform duration-500 ease-in-out aspect-video object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/1e293b/94a3b8?text=Our+Team";
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 md:mt-20 text-center" data-aos="zoom-in">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-400">
              Join Our Literary Universe
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Follow us, subscribe, and become part of the BookBarn family.
            </p>
            <div className="flex justify-center gap-6 sm:gap-8">
              <a
                href="#"
                className="text-slate-400 hover:text-purple-400 transition-colors duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={32} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={32} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={32} />
              </a>
            </div>
          </div>
        </div>
      </section>
  );
};

const App = AboutUs;
export default App;
