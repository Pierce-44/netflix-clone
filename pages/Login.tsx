import { signIn, signOut, useSession } from 'next-auth/react';

export default function Login() {
  const { data: session, status } = useSession();

  return (
    <div className="text-white">
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>
        login
      </button>
      <button onClick={() => signOut()}>logout</button>

      {session ? (
        <div>
          <p>signed in</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
