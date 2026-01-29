import React from 'react';
import { Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header/Hero Section */}
      <header className="bg-gradient-to-r from-slate-50 to-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-5xl font-bold text-slate-900 mb-3">Yanis Berger</h1>
          <p className="text-xl text-slate-600 mb-8">Computer Science Master's Student | Cryptography & Privacy-Preserving Systems</p>
          <div className="flex gap-6 flex-wrap">
            <a href="mailto:yanis.berger@bluewin.ch" className="flex items-center gap-3 px-5 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200">
              <Mail size={22} />
              <span className="font-medium">Email</span>
            </a>
            <a href="https://github.com/yanisberger" className="flex items-center gap-3 px-5 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200">
              <Github size={22} />
              <span className="font-medium">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/yanis-berger-7b4771235/" className="flex items-center gap-3 px-5 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200">
              <Linkedin size={22} />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* About Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About Me</h2>
          <p className="text-slate-700 mb-4 leading-relaxed">
            I'm a Master's student in Computer Science at the University of Bern, specializing in cryptographic protocols 
            and privacy-preserving technologies. My research focuses on secure authentication systems and applied cryptography.
          </p>
          <p className="text-slate-700 leading-relaxed">
            As a Teaching Assistant for discrete mathematics and cryptographic protocols, I help students navigate complex 
            mathematical concepts while developing practical skills in secure system design.
          </p>
        </section>

        {/* Featured Project - Thesis */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Work</h2>
          
          <div className="border-l-4 border-blue-600 bg-blue-50 rounded-r-lg pl-6 pr-6 py-4 mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Privacy-Preserving Authentication for U2SSO with OpenID Self-Provider
            </h3>
            <p className="text-sm text-slate-600 mb-3">Bachelor's Thesis | University of Bern</p>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Designed and implemented a privacy-preserving authentication system integrating OpenID Connect protocols 
              with self-sovereign identity principles. The system ensures user privacy while maintaining security standards 
              for modern authentication flows.
            </p>
            <div className="flex gap-4">
              <a href="https://crypto.unibe.ch/archive/theses/2025.bsc.yanis.berger.pdf" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200">
                <FileText size={18} />
                <span>Read Thesis</span>
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors duration-200">
                <Github size={18} />
                <span>View Code</span>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Projects</h2>
          
          <div className="space-y-6">
            {/* Project 1 */}
            <div className="border-2 border-slate-200 rounded-lg p-6 hover:border-blue-400 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Cryptographic Protocol Implementations</h3>
              <p className="text-slate-700 mb-3 leading-relaxed">
                Implementation suite of fundamental cryptographic protocols including Shamir's Secret Sharing, 
                ElGamal encryption variants, and secure multiparty computation using MPyC.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Python</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Cryptography</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">MPC</span>
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <ExternalLink size={16} />
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Project 2 - Add your own */}
            <div className="border-2 border-slate-200 rounded-lg p-6 hover:border-blue-400 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">[Your Project Name]</h3>
              <p className="text-slate-700 mb-3 leading-relaxed">
                Brief description of what the project does and why it's interesting.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Technology</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Stack</span>
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <ExternalLink size={16} />
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Project 3 - Add your own */}
            <div className="border-2 border-slate-200 rounded-lg p-6 hover:border-blue-400 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">[Another Project]</h3>
              <p className="text-slate-700 mb-3 leading-relaxed">
                Brief description of what the project does and why it's interesting.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Technology</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Stack</span>
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <ExternalLink size={16} />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">Cryptography & Security</h3>
              <p className="text-slate-700 text-sm leading-relaxed">Zero-knowledge proofs, commitment schemes, secure multiparty computation, threshold cryptography, authentication protocols</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">Programming</h3>
              <p className="text-slate-700 text-sm leading-relaxed">Python, Java, GoLang, Git, MPyC, PyCryptodome</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">Areas of Interest</h3>
              <p className="text-slate-700 text-sm leading-relaxed">Privacy-preserving technologies, applied cryptography, secure systems design, QA, software development</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">Teaching Experience</h3>
              <p className="text-slate-700 text-sm leading-relaxed">TA for Discrete Mathematics and Cryptographic Protocols courses</p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Experience</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-slate-300 pl-6">
              <h3 className="text-lg font-semibold text-slate-900">Teaching Assistant</h3>
              <p className="text-slate-600 mb-2 font-medium">University of Bern | 2025 - Present</p>
              <p className="text-slate-700 leading-relaxed">
                Supporting discrete mathematics and cryptographic protocols courses through grading, tutorial guidance, 
                and creating educational materials for a class of students.
              </p>
            </div>
            
            {/* Add more experience as needed */}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="mb-6 text-lg">I'm currently seeking opportunities in QA and software development. Feel free to reach out!</p>
          <a href="mailto:yanis.berger@bluewin.ch" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            Get in Touch
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p>© 2026 Yanis Berger. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}