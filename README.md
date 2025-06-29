# GitHub Discord Updater

Application to retrieve GitHub updates and send them through Discord webhooks.

## Purpose

The purpose of this application is to retrieve GitHub updates
than Discord webhooks cannot process successfully
due to the expected format of the payload from Discord.

## Requirements

- **[Node.js](https://nodejs.org/en/) -** Version 22.x
- **[PNPM](https://pnpm.io/) -** Version 9.x
- Discord Webhook URL
- **Environment variables:**

    | Variable              | Type    | Description                                         | Required | Default | Example             |
    |-----------------------|---------|-----------------------------------------------------|----------|---------|---------------------|
    | `HTTPS_CERT_FILEPATH` | String  | The file path of the HTTPS certificate file         | No       | None    | `/path/to/cert.pem` |
    | `HTTPS_KEY_FILEPATH`  | String  | The file path of the HTTPS key file                 | No       | None    | `/path/to/key.pem`  |
    | `NODE_ENV`            | String  | The environment where the application is running    | No       | None    | `development`       |
    | `PORT`                | Number  | The port where the HTTP server will be running      | No       | `3000`  | `9020`              |
    | `PUBLIC_HOST_ADDRESS` | String  | The public address where the application is running | Yes      | None    | `example.com`       |
    | `SHOULD_USE_HTTPS`    | Boolean | Whether the application should use HTTPS            | No       | `false` | `true`              |

    **Note:**

    - The `NODE_ENV` variable is used to determine the environment
      where the application is running. It is highly recommended
      to set it to `production` when deploying the application
      to a production environment.

### Development Tools

- [EditorConfig](https://editorconfig.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Smee Client](https://smee.io/)

## Supported GitHub Events

- `gollum`

## Building

Whenever you want to apply changes to the application,
you must build the application in order to apply the changes.

In order to build the application, you must install the dependencies
using the following command:

```sh
$ pnpm install
```

After installing the dependencies, you can build the application
using the following command:

```sh
$ pnpm build
```

## Running

### Using Docker (Recommended)

In order to run the application using [Docker](https://www.docker.com/),
you must have Docker installed on your machine.

For running the application with Docker, you will need to mount both
the SSL cert and key files using Docker volumes
and map port `3000` to your host machine.

#### Docker CLI

- **Windows**

    ```shell
    > docker run -dp 8080:8080 \
        -v <path\to\ssl-cert>:${HTTPS_CERT_FILEPATH} \
        -v <path\to\ssl-key>:${HTTPS_KEY_FILEPATH} \
        --env-file <path\to\env\file> \
        --name <container-name> \
        juansecu/github-discord-updater:v<version number>
    ```

- **MacOS/Linux**

    ```shell
    $ docker run -dp 3000:3000 \
        --env-file <path/to/env/file> \
        --name <container-name> \
        juansecu/github-discord-updater:v<version number>
    ```

#### Docker Compose

For running the application with Docker Compose,
you can use the
[Docker Compose file](https://github.com/Juansecu/github-discord-updater/blob/main/compose.yml)
provided in this repository for development and production.

After configuring the environment variables, you can run the application using the following command:

```shell
$ docker compose up -d
```

### Using Node.js

In order to run the application using Node.js,
you must have Node.js installed on your machine,
and have PNPM installed globally on your machine.

For checking if you have PNPM installed globally on your machine,
you can run the following command:

```sh
$ pnpm --version
```

If you don't have PNPM installed globally on your machine,
you can install it using the following commands:

```sh
# Enable Corepack
$ corepack enable

# Install PNPM
$ corepack prepare pnpm@latest-8 --activate
```

After installing PNPM, you can run
the following command to install the dependencies:

```sh
# Development
$ pnpm install

# Production
$ pnpm install --prod
```

After installing the dependencies, you can run
the following command to start the application:

```sh
# Development
$ pnpm run start:dev

# Production
$ pnpm run start:prod
```

## How to Use

For learning how to use the application, you can
check the API documentation by visiting the path
`/api-docs` on the application's URL.

Once you understand how to use the application,
you can start using it to retrieve GitHub updates
by adding the application's URL as a webhook
to the GitHub repository you want to retrieve updates from.
