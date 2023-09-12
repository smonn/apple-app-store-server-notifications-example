Example project demoing App Store Server Notifications.

Check the `.env.example` file for initial setup.

Run the app via `pnpm start` and then setup a tunnel using ngrok.io or tunnel.dev for the configured port number.

Add `https://some.domain/webhooks/apple` as a sandbox URL for the app at `https://appstoreconnect.apple.com/apps/{id}/appstore/info`. Note that you will need to setup a (dummy) subscription for the app to see the option.

Finally, you can run `curl -X POST http://localhost:4000/webhooks/apple/send-test` to trigger a notification and see it logged.
