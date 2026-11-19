import type { ReactNode } from "react";

export function Surface({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="surface">
      <h2 className="surface-title">{title}</h2>
      {children}
    </section>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="empty-state">
      <span className="empty-symbol" aria-hidden="true">—</span>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

export function PageHeading({ title, subtitle, preview }: { title: string; subtitle: string; preview: string }) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{preview}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
