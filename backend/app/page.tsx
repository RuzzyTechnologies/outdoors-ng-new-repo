export default function Home() {
  return (
    <main>
      <h1>Outdoors Next.js API</h1>
      <p>
        This project exposes REST-style CRUD endpoints for the existing Outdoors
        MySQL database (imported locally). Open <code>/api/health</code> to verify
        the server is running.
      </p>
      <h2>Auth</h2>
      <p>
        For write operations (POST/PUT/PATCH/DELETE), send a Bearer token:
      </p>
      <pre>{`Authorization: Bearer <token>`}</pre>
      <p>
        Get a token from <code>POST /api/auth/login</code>.
      </p>
    </main>
  );
}
