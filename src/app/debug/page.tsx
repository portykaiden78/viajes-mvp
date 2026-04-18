export default function Debug() {
    return (
      <pre>
        {JSON.stringify(
          {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            service: process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10) + "...",
          },
          null,
          2
        )}
      </pre>
    );
  }
  