import { JSX } from "react";

export default function ErrorDevelopment(): JSX.Element {
  return (
    <section>
      <div className="relative min-h-screen w-full bg-[url('https://www.material-tailwind.com/logos/pattern-lines.png')] bg-cover bg-no-repeat">
        <div className="grid min-h-screen px-8">
          <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
            <h1 className="block antialiased tracking-normal font-sans text-5xl font-bold leading-tight text-blue-gray-900 lg:text-5xl">
              Coming Soon!
            </h1>
            <h2 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-tight text-blue-gray-900 mt-6">
              Halaman Dalam Tahap Pengembangan
            </h2>
            <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-gray-700 mt-4 mb-6 w-full md:max-w-full lg:mb-12 lg:max-w-3xl">
              Tim sedang berusaha menyempurnakan halaman ini untuk memberikan pengalaman terbaik bagi Anda. Silakan kembali lagi nanti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
