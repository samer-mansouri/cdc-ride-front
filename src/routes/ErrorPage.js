import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ErrorPage() {
    return (
      <>
        <Navbar />
        <div className="min-h-full py-64 flex flex-col bg-white bg-gray-100">
          <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 flex justify-center">
              <a href="/" className="inline-flex">
                <span className="sr-only">Workflow</span>
                <h1 className="text-[#ffc65e] font-bold text-5xl">RIDE</h1>
              </a>
            </div>
            <div className="py-16">
              <div className="text-center">
                <h1 className="text-6xl font-semibold text-[#ffc65e] uppercase tracking-wide">ERREUR 404</h1>
                <h1 className="mt-2 text-6xl font-extrabold text-gray-900 tracking-tight">Cette page n'existe pas.</h1>
                <p className="mt-4 text-2xl text-gray-500">
Désolé, nous n'avons pas trouvé la page que vous recherchez.</p>
                <div className="mt-6">
                  <NavLink to="/" className="text-xl font-medium text-[#ffc65e] hover:text-[#ffc65e]">
                    Revenir à la page d'Accueil<span aria-hidden="true"> &rarr;</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    )
  }