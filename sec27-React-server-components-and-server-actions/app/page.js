// import ClientDemo from "@/components/ClientDemo";
// import RSCDemo from "@/components/RSCDemo";

// import DataFetchingDemo from "@/components/DataFetchingDemo";
// import ServerActionsDemo from "@/components/ServerActionsDemo";
import UsePromiseDemo from "@/components/UsePromisesDemo";
import { Suspense } from "react";
import fs from 'node:fs/promises';
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default async function Home() {
  const fetchUsersPromise = new Promise((resolve) => setTimeout(async () => {
    const data = await fs.readFile('dummy-db.json', 'utf-8'); 
    const users = JSON.parse(data);
    resolve(users);
  }, 2000))

  return (
    <main>
      {/* <ClientDemo>
        <RSCDemo />
      </ClientDemo> */}
      {/* <DataFetchingDemo /> */}
      {/* <ServerActionsDemo /> */}
      <ErrorBoundary fallback={<p>Something went wrong!</p>}>
        <Suspense fallback={<p>Loading users...</p>}>
          <UsePromiseDemo usersPromise={fetchUsersPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
 