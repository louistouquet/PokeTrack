"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface Option<T extends string> {
  value: T;
  label: string;
}

/**
 * Liste déroulante dessinée par le site. La liste d'un <select> natif échappe au CSS :
 * selon le navigateur (Opera notamment) elle s'affiche sans aucun style.
 * Clavier : flèches, Début, Fin, Entrée, Échap, et la première lettre d'un choix.
 */
export function Select<T extends string>({
  value,
  options,
  onChange,
  label,
  className = "",
}: {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  label?: string; // nom accessible quand aucun <label> n'entoure le contrôle
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [instant, setInstant] = useState(false); // ouverture au clavier : pas d'animation
  const [up, setUp] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const current = Math.max(0, options.findIndex((o) => o.value === value));

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const show = (keyboard: boolean) => {
    const box = root.current!.getBoundingClientRect();
    const below = window.innerHeight - box.bottom;
    setUp(below < Math.min(options.length * 40 + 16, 300) && box.top > below);
    setActive(current);
    setInstant(keyboard);
    setOpen(true);
  };
  const pick = (i: number) => {
    if (options[i].value !== value) onChange(options[i].value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show(true);
      }
      return;
    }
    if (e.key === "Tab") return setOpen(false);
    const move: Record<string, number> = { ArrowDown: Math.min(active + 1, last), ArrowUp: Math.max(active - 1, 0), Home: 0, End: last };
    if (e.key in move) setActive(move[e.key]);
    else if (e.key === "Enter" || e.key === " ") pick(active);
    else if (e.key === "Escape") setOpen(false);
    else if (e.key.length === 1) {
      const found = options.findIndex((o) => o.label.toLowerCase().startsWith(e.key.toLowerCase()));
      if (found >= 0) setActive(found);
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div ref={root} className={`select ${className}`}>
      <button
        type="button"
        role="combobox"
        className="field select-trigger"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show(false))}
        onKeyDown={onKeyDown}
      >
        <span className="truncate">{options[current]?.label}</span>
      </button>
      {open && (
        // Le pointeur ne doit pas retirer le focus du bouton : le clavier continue de fonctionner.
        <ul ref={list} id={`${id}-list`} role="listbox" className="select-list" data-up={up || undefined} data-instant={instant || undefined} onPointerDown={(e) => e.preventDefault()}>
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === current}
              data-active={i === active || undefined}
              className="select-option"
              onPointerMove={() => i !== active && setActive(i)}
              onClick={() => pick(i)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
