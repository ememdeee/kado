// import { PrismicNextLink } from "@prismicio/next";
import React from "react";
import clsx from "clsx";
import { KeyTextField, LinkField } from "@prismicio/client";

type TextHoverableProps = {
//   linkField: LinkField;
  label: KeyTextField;
  className?: string;
  active?: boolean;
};

export default function TextHoverable({
//   linkField,
  label,
  className,
  active,
}: TextHoverableProps) {
  return (
    <span className={clsx("group relative block overflow-hidden px-3 py-1 text-base font-bold text-slate-900 rounded-md border-2 border-slate-900", className,)}>
      <span className={clsx("absolute inset-0 z-0 h-full bg-yellow-300 transition-transform duration-300 ease-in-out md:group-hover:translate-y-0",
        {
          "translate-y-9": !active,
          "translate-y-7": active,
        }
      )}/>
      <span className="relative flex items-center justify-center gap-2">
        {label}
      </span>
    </span>
  );
}
