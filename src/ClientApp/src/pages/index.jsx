export function NotFound() {
  return (
    <main>
      <section className="flex flex-col items-center py-6 text-5xl font-black text-gray-800">
        <h1 className="mb-6 block">How did you get here?</h1>
      </section>
      <section className="mx-auto max-w-prose">
        <p>This page does not exist.</p>
      </section>
    </main>
  );
}

export function LandingPage() {
  return (
    <main>
      <p className="mt-4 text-center">
        To use this app, you must have a Utah ID account and have been granted permissions. Please login at{' '}
        <a type="Primary" href="/">
          UtahID
        </a>
        .
      </p>
    </main>
  );
}
