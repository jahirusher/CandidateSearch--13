const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log("GitHub Token:", import.meta.env.VITE_GITHUB_TOKEN);
    
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,  // Use Bearer instead of token
      },
    });

    console.log('Response:', response);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Invalid API response: ${response.status}`);
    }

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log('An error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {  
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,  // Use Bearer instead of token
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Invalid API response: ${response.status}`);
    }

    return data;
  } catch (err) {
    console.log('An error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
