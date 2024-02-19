# GitHub Discord Updater

Application to retrieve GitHub updates and send them through Discord webhooks.

## Purpose

The purpose of this application is to retrieve GitHub updates
than Discord webhooks cannot process successfully
due to the expected format of the payload from Discord.

## Requirements

- **[Node.js](https://nodejs.org/en/) -** Version 20.x
- Discord Webhook URL
- **Environment variables:**

    | Variable              | Type    | Description                                         | Required | Default     | Example       |
    | --------------------- | ------- | --------------------------------------------------- | -------- | ----------- | ------------- |
    | `NODE_ENV`            | String  | The environment where the application is running    | No       | None        | `development` |
    | `PORT`                | Number  | The port where the HTTP server will be running      | No       | `3000`      | `9020`        |
    | `PUBLIC_HOST_ADDRESS` | String  | The public address where the application is running | No       | `localhost` | `example.com` |
    | `SHOULD_USE_HTTPS`    | Boolean | Whether the application should use HTTPS            | No       | `false`     | `true`        |

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

## Running

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
$ corepack prepare pnpm@latest --activate
```

After installing PNPM, you can run
the following command to install the dependencies:

```sh
# Development
$ pnpm install

# Production
$ pnpm install
$ pnpm build
# ...Remove node_modules folder
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
