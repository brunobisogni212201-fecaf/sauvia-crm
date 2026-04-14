import { auth } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const { userId } = await auth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-on-surface mb-4">
          Página Protegida
        </h1>
        <p className="text-on-surface-variant">User ID: {userId}</p>
      </div>
    </main>
  );
}
