#! /usr/bin/env node 

import { program } from 'commander';

program.version('1.0.0');
   program
      .description('Show GitHub activity for a user')
      .addArgument('<username>', 'GitHub username')
      .action((username) => {    
        const url = `https://api.github.com/users/${username}/events`;
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error fetching data for user ${username}`);
            }
            return response.json();
            }).then(data => {
                if (data.length === 0) {
                console.log(`No activity found for user ${username}`);
                return;
                }
                data.forEach(event => {
                console.log(`Event: ${event.type}, Repo: ${event.repo.name}, Created At: ${event.created_at}`);
                });
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        

    });

    program.parse(process.argv);