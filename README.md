# Are we asymmetric yet?

SaaS webhook signing schemes, ranked by verifiability without a shared secret.

> **11 / 40** providers (28%) sign webhooks asymmetrically — meaning consumers can verify them with only a public key, no shared secret required.

## Legend

- **Asymmetric** — verifying webhooks requires no secret key material on the consumer.
- **Shared secret** — verifying requires key material on the consumer (HMAC or static token); anyone with it can forge webhooks.

## Providers

| Provider | Category | Verification | Scheme | Docs |
| --- | --- | --- | --- | --- |
| ![](https://www.google.com/s2/favicons?sz=32&domain=apple.com) **Apple App Store** | App stores | Asymmetric | `JWS / ES256` | [docs](https://developer.apple.com/documentation/appstoreservernotifications/responsebodyv2) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=aws.amazon.com) **AWS SNS** | Infrastructure | Asymmetric | `RSA-SHA256 (X.509 cert)` | [docs](https://docs.aws.amazon.com/sns/latest/dg/sns-verify-signature-of-message.html) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=discord.com) **Discord** | Communication | Asymmetric | `Ed25519` | [docs](https://docs.discord.com/developers/interactions/overview#setting-up-an-endpoint-validating-security-request-headers) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=play.google.com) **Google Play RTDN** | App stores | Asymmetric | `OIDC JWT / RS256` | [docs](https://cloud.google.com/pubsub/docs/authenticate-push-subscriptions) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=atlassian.com) **Jira** | Productivity | Asymmetric | `JWT RS256 (lifecycle) / HS256 (Connect)` | [docs](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=microsoft.com) **Microsoft Graph** | Productivity | Asymmetric | `JWS RS256 (validation token) + RSA-OAEP encrypted payload` | [docs](https://learn.microsoft.com/en-us/graph/change-notifications-with-resource-data) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=paypal.com) **PayPal** | Payments | Asymmetric | `RSA-SHA256 (rotating X.509 certs)` | [docs](https://developer.paypal.com/api/rest/webhooks/rest/#link-verifywebhooksignature) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=plaid.com) **Plaid** | Fintech | Asymmetric | `JWT / ES256` | [docs](https://plaid.com/docs/api/webhooks/webhook-verification/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=sendgrid.com) **SendGrid** | Email | Asymmetric | `ECDSA P-256` | [docs](https://www.twilio.com/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook-security-features) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=svix.com) **Svix** | Webhook infra | Asymmetric | `Ed25519 (opt-in) / HMAC-SHA256 (default)` | [docs](https://docs.svix.com/receiving/verifying-payloads/how) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=twilio.com) **Twilio** | Communications | Asymmetric | `ECDSA P-256 (opt-in) / HMAC-SHA1 (default)` | [docs](https://www.twilio.com/docs/usage/webhooks/webhooks-security) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=adyen.com) **Adyen** | Payments | Shared secret | `HMAC-SHA256` | [docs](https://docs.adyen.com/development-resources/webhooks/secure-webhooks/verify-hmac-signatures) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=auth0.com) **Auth0** | Identity | Shared secret | `Bearer token` | [docs](https://auth0.com/docs/customize/log-streams/custom-log-streams) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=calendly.com) **Calendly** | Scheduling | Shared secret | `HMAC-SHA256` | [docs](https://developer.calendly.com/api-docs/4c305798a61d3-webhook-signatures) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=clerk.com) **Clerk** | Identity | Shared secret | `HMAC-SHA256 (Svix)` | [docs](https://clerk.com/docs/webhooks/overview) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=cloudflare.com) **Cloudflare** | Infrastructure | Shared secret | `Static shared secret` | [docs](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=commerce.coinbase.com) **Coinbase Commerce** | Payments | Shared secret | `HMAC-SHA256` | [docs](https://docs.cdp.coinbase.com/commerce/api-arcitecture/webhooks-security) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=docusign.com) **DocuSign** | Documents | Shared secret | `HMAC-SHA256` | [docs](https://developers.docusign.com/platform/webhooks/connect/hmac/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=github.com) **GitHub** | Developer tools | Shared secret | `HMAC-SHA256` | [docs](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=gitlab.com) **GitLab** | Developer tools | Shared secret | `HMAC-SHA256 / X-Gitlab-Token` | [docs](https://docs.gitlab.com/user/project/integrations/webhooks/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=hubspot.com) **HubSpot** | CRM | Shared secret | `HMAC-SHA256` | [docs](https://developers.hubspot.com/docs/api/webhooks/validating-requests) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=intercom.com) **Intercom** | Customer support | Shared secret | `HMAC-SHA1` | [docs](https://developers.intercom.com/docs/references/2.7/rest-api/webhooks/webhook-models) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=linear.app) **Linear** | Productivity | Shared secret | `HMAC-SHA256` | [docs](https://linear.app/developers/webhooks) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=mailgun.com) **Mailgun** | Email | Shared secret | `HMAC-SHA256` | [docs](https://documentation.mailgun.com/docs/mailgun/user-manual/webhooks/securing-webhooks) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=mux.com) **Mux** | Media | Shared secret | `HMAC-SHA256` | [docs](https://www.mux.com/docs/core/verify-webhook-signatures) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=netlify.com) **Netlify** | Hosting | Shared secret | `JWS HS256` | [docs](https://docs.netlify.com/deploy/deploy-notifications/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=notion.so) **Notion** | Productivity | Shared secret | `HMAC-SHA256` | [docs](https://developers.notion.com/reference/webhooks) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=okta.com) **Okta** | Identity | Shared secret | `Static header token` | [docs](https://developer.okta.com/docs/concepts/event-hooks/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=paddle.com) **Paddle** | Payments | Shared secret | `HMAC-SHA256` | [docs](https://developer.paddle.com/webhooks/signature-verification) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=postmarkapp.com) **Postmark** | Email | Shared secret | `HTTP Basic Auth` | [docs](https://postmarkapp.com/developer/webhooks/webhooks-overview) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=replicate.com) **Replicate** | AI / ML | Shared secret | `HMAC-SHA256 (Svix)` | [docs](https://replicate.com/docs/topics/webhooks/verify-webhook) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=resend.com) **Resend** | Email | Shared secret | `HMAC-SHA256 (Svix)` | [docs](https://resend.com/docs/webhooks/verify-webhooks-requests) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=sentry.io) **Sentry** | Observability | Shared secret | `HMAC-SHA256` | [docs](https://docs.sentry.io/organization/integrations/integration-platform/webhooks/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=shopify.com) **Shopify** | E-commerce | Shared secret | `HMAC-SHA256` | [docs](https://shopify.dev/docs/apps/build/webhooks/subscribe/https#step-3-verify-the-webhook) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=slack.com) **Slack** | Communication | Shared secret | `HMAC-SHA256` | [docs](https://docs.slack.dev/authentication/verifying-requests-from-slack) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=squareup.com) **Square** | Payments | Shared secret | `HMAC-SHA256` | [docs](https://developer.squareup.com/docs/webhooks/step3validate) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=stripe.com) **Stripe** | Payments | Shared secret | `HMAC-SHA256` | [docs](https://docs.stripe.com/webhooks#verify-official-libraries) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=vercel.com) **Vercel** | Hosting | Shared secret | `HMAC-SHA1` | [docs](https://vercel.com/docs/headers/request-headers#x-vercel-signature) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=zendesk.com) **Zendesk** | Customer support | Shared secret | `HMAC-SHA256` | [docs](https://developer.zendesk.com/documentation/webhooks/verifying/) |
| ![](https://www.google.com/s2/favicons?sz=32&domain=zoom.us) **Zoom** | Communication | Shared secret | `HMAC-SHA256` | [docs](https://developers.zoom.us/docs/api/webhooks/) |

## Contributing

Spotted a missing or wrong entry? This list is open source — PRs and issues welcome at [movitz-s/are-we-asymmetric-yet](https://github.com/movitz-s/are-we-asymmetric-yet).

---

<sub>Generated from `src/data/providers.json` by `scripts/generate-readme.mjs`. Do not edit this file by hand.</sub>
