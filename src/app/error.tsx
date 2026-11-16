"use client"; // une page d'erreur est obligatoirement un composant client

// Le site lit le catalogue chez TCGdex au moment d'afficher une fiche ou une recherche.
// Quand cette source ne répond pas, on le dit et on propose de réessayer, plutôt que de
// laisser une page cassée.
export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  return (
    <div className="wrap max-w-[40rem] pt-14">
      <div className="lcd px-6 py-8">
        <p className="pixel text-6xl leading-none">Oups</p>
        <p className="mt-2 text-lg font-semibold">La source du catalogue ne répond pas.</p>
      </div>
      <p className="mt-7 text-ink-soft">C&apos;est en général l&apos;affaire de quelques secondes. Votre collection n&apos;est pas touchée : elle est dans votre navigateur.</p>
      <button type="button" className="btn mt-5" onClick={() => retry()}>
        Réessayer
      </button>
    </div>
  );
}
