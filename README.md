# GitHub Discord Updater

Application to retrieve GitHub updates and send them through Discord webhooks.

## Requirements

- **[Node.js](https://nodejs.org/en/) -** 18.x
- Discord Webhook URL
- **Environment variables:**

    | Variable   | Type   | Description                                                        | Required | Default | Example           |
    | ---------- | ------ | ------------------------------------------------------------------ | -------- | ------- | ----------------- |
    | `NODE_ENV` | String | The environment where the application is running                   | No       | None    | `development`     |
    | `PORT`     | Number | The port where the HTTP server will be running                     | No       | `3000`  | `9020`            |

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
