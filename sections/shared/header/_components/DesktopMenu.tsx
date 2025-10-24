"use client";

import { useEffect, useRef } from "react";
import { closeMenu } from "@/lib/close-menu";

export default function DesktopMenu() {
  const menuRef = useRef<HTMLDivElement>(null);

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
      <ul className="menu menu-horizontal py-0 text-2xl" role="menubar">
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
                <a
                  href="/#informes"
                  className="truncate"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Informes
                </a>
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
              className="bg-base-200 rounded-box p-2 shadow-lg z-50"
              role="menu"
              aria-label="Servicios"
            >
              <li role="none">
                <a href="/educacion" className="" role="menuitem" tabIndex={-1}>
                  Educación
                </a>
              </li>
              <li role="none">
                <a href="#" className="" role="menuitem" tabIndex={-1}>
                  Capacitación
                </a>
              </li>
              <li role="none">
                <a href="#" className="" role="menuitem" tabIndex={-1}>
                  Desarrollo
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
          <a href="#" className="" role="menuitem" tabIndex={0}>
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
}
