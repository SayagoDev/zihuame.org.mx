"use client";

import { useEffect, useRef } from "react";
import { closeMenu } from "@/lib/close-menu";
import { EventDTO } from "@/data/events";
import Link from "next/link";
import { useContactModal } from "@/components/providers/ContactProvider";

export default function DesktopMenu({ events }: { events: EventDTO[] }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { open } = useContactModal();

  const closeAllMenus = () => {
    if (menuRef.current) {
      const openDetails = menuRef.current.querySelectorAll("details[open]");
      openDetails.forEach((details) => {
        (details as HTMLDetailsElement).open = false;
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const openDetails = menuRef.current.querySelectorAll("details[open]");
        openDetails.forEach((details) => {
          (details as HTMLDetailsElement).open = false;
          const summary = details.querySelector("summary");
          if (summary) {
            summary.setAttribute("aria-expanded", "false");
          }
        });
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      // Cerrar menú con la tecla Escape
      if (event.key === "Escape") {
        if (menuRef.current) {
          const openDetails = menuRef.current.querySelectorAll("details[open]");
          openDetails.forEach((details) => {
            (details as HTMLDetailsElement).open = false;
            const summary = details.querySelector("summary");
            if (summary) {
              summary.setAttribute("aria-expanded", "false");
              summary.focus();
            }
          });
        }
        closeMenu();
      }

      // Navegación con flechas en submenú
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const isInSubmenu = target.closest('ul[role="menu"]');
        if (isInSubmenu) {
          event.preventDefault();
          const menuItems = Array.from(
            isInSubmenu.querySelectorAll('a[role="menuitem"]')
          ) as HTMLElement[];
          const currentIndex = menuItems.indexOf(target);

          if (event.key === "ArrowDown") {
            const nextIndex = (currentIndex + 1) % menuItems.length;
            menuItems[nextIndex]?.focus();
          } else {
            const prevIndex =
              currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
            menuItems[prevIndex]?.focus();
          }
        }
      }

      // Cerrar menú cuando se presiona Tab y el foco sale del menú
      if (event.key === "Tab") {
        setTimeout(() => {
          if (
            menuRef.current &&
            document.activeElement &&
            !menuRef.current.contains(document.activeElement)
          ) {
            const openDetails =
              menuRef.current.querySelectorAll("details[open]");
            openDetails.forEach((details) => {
              (details as HTMLDetailsElement).open = false;
              const summary = details.querySelector("summary");
              if (summary) {
                summary.setAttribute("aria-expanded", "false");
              }
            });
          }
        }, 0);
      }
    };

    // Observar cambios en el atributo open de details
    const handleToggle = (event: Event) => {
      const details = event.target as HTMLDetailsElement;
      const summary = details.querySelector("summary");
      if (summary) {
        summary.setAttribute("aria-expanded", details.open ? "true" : "false");

        // Cerrar otros menus abiertos al mismo nivel
        if (details.open) {
          const parentList = details.closest("ul");
          if (parentList) {
            const openSiblings = parentList.querySelectorAll(
              ":scope > li details[open]"
            );
            openSiblings.forEach((other) => {
              if (other !== details) {
                (other as HTMLDetailsElement).open = false;
                const otherSummary = other.querySelector("summary");
                if (otherSummary) {
                  otherSummary.setAttribute("aria-expanded", "false");
                }
              }
            });
          }
        }

        // Enfocar el primer elemento del submenú cuando se abre
        if (details.open) {
          const firstMenuItem = details.querySelector(
            'ul[role="menu"] a[role="menuitem"]'
          ) as HTMLElement;
          if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 0);
          }
        }
      }
    };

    if (menuRef.current) {
      const detailsElements = menuRef.current.querySelectorAll("details");
      detailsElements.forEach((details) => {
        details.addEventListener("toggle", handleToggle);
      });
    }

    // Usar mousedown en lugar de click para capturarlo antes
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);

      if (menuRef.current) {
        const detailsElements = menuRef.current.querySelectorAll("details");
        detailsElements.forEach((details) => {
          details.removeEventListener("toggle", handleToggle);
        });
      }
    };
  }, []);

  const handleLinkClick = () => {
    closeAllMenus();
    closeMenu();
  };

  return (
    <nav
      ref={menuRef}
      className="hidden lg:flex lg:justify-end relative z-50"
      role="navigation"
      aria-label="Navegación principal"
      id="desktop-menu"
    >
      <ul
        className="menu menu-horizontal py-0 w-fit text-2xl"
        role="menubar w-fit"
      >
        <li role="none">
          <details className="relative z-50">
            <summary
              className=""
              role="menuitem"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
            >
              Organización
            </summary>
            <ul
              className="bg-base-200 rounded-box p-2 shadow-lg z-50"
              role="menu"
              aria-label="Servicios"
            >
              <li role="none">
                <a
                  href="/organizacion#pilares"
                  className="truncate"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Nuestros Pilares
                </a>
              </li>
              <li role="none">
                <a
                  href="/organizacion#mision"
                  className="truncate"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Nuestra Misión
                </a>
              </li>
              <li role="none">
                <a
                  href="/transparencia"
                  className="truncate"
                  role="menuitem"
                  tabIndex={-1}
                >
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
        <li role="none" className="relative">
          <details className="relative z-50">
            <summary
              className=""
              role="menuitem"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
            >
              Intervención
            </summary>
            <ul
              className="bg-base-200 rounded-box p-2 shadow-lg z-50 w-fit"
              role="menu"
              aria-label="Servicios"
            >
              <li>
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
                            role="menuitem"
                            className="truncate"
                          >
                            <span>{event.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul role="menu" aria-label="Eventos">
                      <li role="none">
                        <a href="#" role="menuitem" className="truncate">
                          No hay eventos disponibles
                        </a>
                      </li>
                    </ul>
                  )}
                </details>
              </li>
              <li role="none">
                <a href="/educacion" className="" role="menuitem" tabIndex={-1}>
                  Educación
                </a>
              </li>
              <li role="none">
                <a
                  href="/desarrollo-comunitario"
                  onClick={closeMenu}
                  role="menuitem"
                  className="truncate"
                >
                  Desarrollo Comunitario
                </a>
              </li>
              <li role="none">
                <a
                  href="/empoderamiento-economico"
                  onClick={closeMenu}
                  role="menuitem"
                  className="truncate"
                >
                  Empoderamiento Económico
                </a>
              </li>
              <li role="none">
                <a
                  href="/derechos-humanos"
                  onClick={closeMenu}
                  role="menuitem"
                  className="truncate"
                >
                  Derechos Humanos
                </a>
              </li>
              <li role="none">
                <a
                  href="/salud"
                  onClick={closeMenu}
                  role="menuitem"
                  className="truncate"
                >
                  Salud
                </a>
              </li>
            </ul>
          </details>
        </li>
        <li role="none">
          <a href="/aliados" className="" role="menuitem" tabIndex={-1}>
            Aliados
          </a>
        </li>
        <li role="none">
          <a
            href="/#contacto"
            className=""
            role="menuitem"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
          >
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
}
