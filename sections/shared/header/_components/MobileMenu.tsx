import { EventDTO } from "@/data/events";
import { closeMenu } from "@/lib/close-menu";
import Link from "next/link";

export default function MobileMenu({ events }: { events: EventDTO[] }) {
  return (
    <div
      className="dropdown absolute lg:hidden"
      role="button"
      aria-haspopup="true"
      aria-label="Navegación principal"
    >
      <div
        tabIndex={0}
        className="btn btn-ghost px-0"
        aria-label="Abrir menú de navegación"
        aria-controls="mobile-menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          focusable="false"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul
        id="mobile-menu"
        tabIndex={0}
        className="mt-2 bg-base-200 dropdown-content menu rounded-box z-1 w-fit max-w-70 md:max-w-lvw p-2 shadow [&>*]:text-xl md:[&>*]:text-2xl"
        role="menu"
        aria-label="Menú principal"
      >
        <li role="none">
          <details>
            <summary role="menuitem" aria-haspopup="true">
              Organización
            </summary>
            <ul role="menu" aria-label="Servicios">
              <li role="none">
                <a
                  href="/organizacion#pilares"
                  onClick={closeMenu}
                  role="menuitem"
                >
                  Nuestros Pilares
                </a>
              </li>
              <li role="none">
                <a
                  href="/organizacion#mision"
                  onClick={closeMenu}
                  role="menuitem"
                >
                  Nuestra Misión
                </a>
              </li>
              <li role="none">
                <a href="/transparencia" onClick={closeMenu} role="menuitem">
                  Transparencia
                </a>
              </li>
              <li role="none">
                <Link
                  href="/#informes"
                  className="truncate"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Informes
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li role="none">
          <details>
            <summary role="menuitem" aria-haspopup="true">
              Intervención
            </summary>
            <ul role="menu" aria-label="Servicios">
              <li role="none">
                <details>
                  <summary role="menuitem" aria-haspopup="true">
                    Eventos
                  </summary>
                  {events.length > 0 ? (
                    <ul role="menu" aria-label="Eventos">
                      {events.map((event) => (
                        <li role="none" key={event.id}>
                          <a
                            href={`/eventos/${event.slug}`}
                            className="truncate"
                            role="menuitem"
                          >
                            <span>{event.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul role="menu" aria-label="Eventos">
                      <li role="none">
                        <a
                          href="#"
                          role="menuitem"
                          className="truncate w-50 md:w-70"
                        >
                          <span className="truncate">
                            No hay eventos disponibles
                          </span>
                        </a>
                      </li>
                    </ul>
                  )}
                </details>
              </li>
              <li role="none">
                <a href="/educacion" onClick={closeMenu} role="menuitem">
                  Educación
                </a>
              </li>
              <li role="none">
                <a
                  href="/desarrollo-comunitario"
                  onClick={closeMenu}
                  role="menuitem"
                >
                  Desarrollo Comunitario
                </a>
              </li>
              <li role="none">
                <a
                  href="/empoderamiento-economico"
                  onClick={closeMenu}
                  role="menuitem"
                >
                  Empoderamiento Económico
                </a>
              </li>
              <li role="none">
                <a href="/derechos-humanos" onClick={closeMenu} role="menuitem">
                  Derechos Humanos
                </a>
              </li>
              <li role="none">
                <a href="/salud" onClick={closeMenu} role="menuitem">
                  Salud
                </a>
              </li>
            </ul>
          </details>
        </li>
        <li role="none">
          <a href="/aliados" onClick={closeMenu} role="menuitem">
            Aliados
          </a>
        </li>
        <li role="none">
          <a href="#" onClick={closeMenu} role="menuitem">
            Contacto
          </a>
        </li>
      </ul>
    </div>
  );
}
