#!/bin/bash
# Code inspired from https://raphaelpralat.medium.com/system-environment-variables-in-next-js-with-docker-1f0754e04cde

# config
envFilename='.env'

ls -la

# Generate process.env
echo "Generating process.env..."
while read line; do
    # Skip comments and empty lines
    if [ "${line:0:1}" == "#" ] || [ "${line}" == "" ]; then
        continue
    fi

    # Extract name
    configName="$(cut -d'=' -f1 <<<"$line")"

    # Extract value in current enviroment
    envValue=$(env | grep "^$configName=" | cut -d'=' -f2);

    # Add the current enviroment variable to process.env so nextjs does not
    # replace it
    if [ -n "$envValue" ]; then
        echo "Adding ${configName}=${envValue} to process.env.local"
        printf "${configName}=${envValue}\n" >> .env.local
fi
done < $envFilename

cat .env.local
cat .env

# Execute nextjs
exec "$@"
