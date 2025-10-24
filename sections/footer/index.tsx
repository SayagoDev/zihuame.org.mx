import Break from "@/components/Break";
import Button from "@/components/Button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-success rounded-t-xl lg:rounded-xl lg:m-4 p-2 xl:px-[3.75rem] xl:pt-[2.31rem] xl:pb-[5.31rem]">
      <div className="flex flex-col lg:flex-row items-start p-4 sm:px-10 lg:p-0 lg:justify-between relative lg:gap-4 @container">
        <div className="flex items-center gap-2 mt-2 mx-auto lg:gap-0 lg:mx-0">
          <Image
            src="/images/logo_zihuame.png"
            alt="Logo Zihuame Mochilla"
            width={278}
            height={165}
            className="w-2/3 md:w-[12rem] lg:w-[15rem] xl:w-[17rem]"
          />
          <div className="text-start uppercase text-sm xl:text-xl">
            <p className="3xl:whitespace-nowrap">
              Julian villagrán 116 sur, planta alta
            </p>
            <p>col. centro de monterrey</p>
            <p>cp 64000</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-[auto_auto_auto_auto] gap-4 mt-4 mx-auto md:text-lg xl:text-2xl xl:gap-8 xl:mx-0">
          <nav className="w-fit">
            <h6 className="font-medium">Organización</h6>
            <ul className="space-y-1">
              <li>
                <a
                  href="/organizacion/#pilares"
                  className="link link-hover block truncate"
                >
                  Nuestros Pilares
                </a>
              </li>
              <li>
                <a
                  href="/organizacion/#mision"
                  className="link link-hover block truncate"
                >
                  Nuestra Misión
                </a>
              </li>
              <li>
                <a href="/aliados" className="link link-hover block truncate">
                  Aliados
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover block truncate">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          <nav className="max-w-[12rem]">
            <h6 className="font-medium">Programas</h6>
            <ul className="space-y-1">
              <li>
                <a href="#" className="link link-hover block truncate">
                  Desarrollo Comunitario
                </a>
              </li>
              <li>
                <a href="/educacion" className="link link-hover block truncate">
                  Educación
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover block truncate">
                  Salud
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover block truncate">
                  Empoderamiento Económico
                </a>
              </li>
            </ul>
          </nav>

          <nav className="w-fit">
            <h6 className="font-medium">Involúcrate</h6>
            <ul className="space-y-1">
              <li>
                <a
                  href="/transparencia"
                  className="link link-hover block truncate"
                >
                  Transparencia
                </a>
              </li>
              <li>
                <a href="/#eventos" className="link link-hover block truncate">
                  Eventos
                </a>
              </li>
            </ul>
          </nav>

          <nav className="w-fit">
            <ul className="space-y-1">
              <li>
                <a href="#" className="block truncate link link-hover">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="block truncate link link-hover">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="block truncate link link-hover">
                  Youtube
                </a>
              </li>
              <li>
                <a href="#" className="block truncate link link-hover">
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="h-[1px] bg-base-content w-full mb-4 lg:my-4"></div>

      <div className="text-sm flex flex-col md:flex-row items-center md:justify-between text-center w-full mx-auto md:mx-0 md:gap-4 md:text-lg xl:text-2xl">
        <p>
          &copy; {new Date().getFullYear()} Zihuame Mochilla A.C. | Diseño y
          Desarrollo por{" "}
          <a
            href="https://sayago.dev"
            className="link link-hover"
            target="_blank"
          >
            sáyago;dev{" "}
          </a>
          |{" "}
          <a href="#" className="link link-hover text-nowrap">
            Aviso de Privacidad
          </a>
        </p>
        <Button
          href="#"
          className="bg-black mt-4 md:mt-0 border-none text-base-100 w-fit"
        >
          Quiero Donar
        </Button>
        <a href="">
          <Image
            src="/images/confio.png"
            alt="Footer Image"
            width={148}
            height={61}
            className="mt-4 md:mt-0"
          />
        </a>
      </div>
    </footer>
  );
}
