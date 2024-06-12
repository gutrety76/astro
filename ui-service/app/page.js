import { zodiac_flags } from '@/helpers';
import Image from 'next/image';
import React from 'react';



async function fetchRepoData() {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns 0-based month
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  const params = new URLSearchParams({
    zodiac: zodiac_flags.get('Scorpio').value,
    date_now: formattedDate,
    days_to_get: 14
  })
  
  const res = await fetch(`localhost:8000/api-v1/get_zodiac_predictions?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page() {
  const repo = await fetchRepoData();
  console.log(repo)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Next.js Repository Details</h1>
      <div className="mt-8">
        <p><strong>Repository Name:</strong> {repo.name}</p>
        <p><strong>Description:</strong> {repo.description}</p>
        <p><strong>Stars:</strong> {repo.stargazers_count}</p>
        <p><strong>Forks:</strong> {repo.forks_count}</p>
        <p><strong>Open Issues:</strong> {repo.open_issues_count}</p>
        {repo.owner && (
          <div className="mt-4 flex items-center">
            {/* <Image
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              width={50}
              height={50}
              className="rounded-full"
            /> */}
            <p className="ml-4"><strong>Owner:</strong> {repo.owner.login}</p>
          </div>
        )}
      </div>
    </main>
  );
}
