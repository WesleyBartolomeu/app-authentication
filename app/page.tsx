import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
      <main className="flex items-center justify-center bg-gray-900 min-h-screen">
        <div className="bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-lg">
          <h2 className="text-white text-2x1 font-bold mb-4 text-center">Bem vindo ao armazenamento de fotos</h2>
          <p className="mb-6 text-lg text-center">Se inscreva e salve suas fotos favoritas</p>
           <AuthForm/>
        </div>
      </main>
  );
}
