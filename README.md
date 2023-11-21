# GitHub Discord Updater

Application to retrieve GitHub updates and send them through Discord webhooks.

## Requirements

- **[Node.js](https://nodejs.org/en/) -** 18.x
- Discord Webhook URL
- **Environment variables:**

    | Variable        | Type   | Description                                                        | Required | Default | Example           |
    | --------------- | ------ | ------------------------------------------------------------------ | -------- | ------- | ----------------- |
    | `PORT`          | Number | The port where the HTTP server will be running                     | No       | `3000`  | `9020`            |
    | `WEBHOOK_ID`    | String | The ID of the Discord webhook where GitHub updates will be sent    | Yes      | None    | `<webhook ID>`    |
    | `WEBHOOK_TOKEN` | String | The token of the Discord webhook where GitHub updates will be sent | Yes      | None    | `<webhoot token>` |

    **Note:** At the moment, only one webhook is supported.

### Development Tools

- [EditorConfig](https://editorconfig.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Smee Client](https://smee.io/)
