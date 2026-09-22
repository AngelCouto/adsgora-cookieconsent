# Adsgora Cookie Consent

Consent Management Platform (CMP) template for Google Tag Manager based on
[Orestbida CookieConsent](https://github.com/orestbida/cookieconsent) and
Google Consent Mode v2.

The template provides a configurable cookie consent banner and automatically
updates Google Consent Mode according to the visitor's choices.

## Features

- Google Consent Mode v2 integration
- Default consent state before user interaction
- Accept, reject and granular cookie preferences
- Four consent categories:
  - Necessary
  - Functionality
  - Analytics
  - Advertising
- Support for:
  - `ad_storage`
  - `analytics_storage`
  - `ad_user_data`
  - `ad_personalization`
  - `functionality_storage`
  - `personalization_storage`
  - `security_storage`
- Configurable `wait_for_update`
- `url_passthrough` support
- `ads_data_redaction` support
- Optional `dataLayer` consent update event
- Configurable cookie expiration
- Cookie consent revision management
- Permanent preferences button
- Custom banner width and button colors
- Responsive design
- Automatic browser language detection
- Spanish, English and Galician
- Configurable cookie policy URL

## Installation

### Community Template Gallery

Once the template is available in the Google Tag Manager Community Template
Gallery:

1. Open Google Tag Manager.
2. Go to **Templates**.
3. Click **Search Gallery**.
4. Search for **Adsgora Cookie Consent**.
5. Add the template to your workspace.
6. Create a new tag using the template.

### Manual installation

You can also install the template manually:

1. Download `template.tpl` from this repository.
2. Open Google Tag Manager.
3. Go to **Templates**.
4. Click **New** under Tag Templates.
5. Open the template menu.
6. Select **Import**.
7. Import `template.tpl`.
8. Save the template.

## Recommended trigger

The tag should run as early as possible so the default consent state is
established before tags that depend on consent are evaluated.

Use the appropriate early initialization trigger in Google Tag Manager for
your Consent Mode implementation.

## Consent Mode mapping

| Cookie category | Google Consent Mode |
| --- | --- |
| Necessary | `security_storage` |
| Functionality | `functionality_storage`, `personalization_storage` |
| Analytics | `analytics_storage` |
| Advertising | `ad_storage`, `ad_user_data`, `ad_personalization` |

Necessary cookies cannot be disabled.

Before the visitor makes a choice, storage types are denied by default except
for `security_storage`.

## dataLayer event

The template can optionally push a consent update event to the `dataLayer`:

```javascript
{
  event: 'cookie_consent_update',
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  personalization_storage: 'granted',
  security_storage: 'granted'
}
```

The values reflect the visitor's current consent choices.

## Languages

The template currently includes:

- Spanish (`es`)
- English (`en`)
- Galician (`gl`)

Automatic language detection can be enabled. A fallback language can also be
configured.

## Cookie expiration

Acceptance and rejection expiration periods can be configured independently.

Default values:

- Acceptance: 730 days
- Rejection: 7 days

The consent revision number can also be changed when a new consent should be
requested from existing visitors.

## Content Security Policy (CSP)

This template loads version-pinned JavaScript dependencies from jsDelivr.

Websites using a restrictive Content Security Policy may need to allow:

```text
https://cdn.jsdelivr.net
```

for scripts.

For example, an existing `script-src` policy may need to include:

```text
script-src 'self' https://cdn.jsdelivr.net;
```

Do not replace your existing Content Security Policy with this example.
Instead, add the required origin to the site's existing policy when necessary.

The exact CSP configuration depends on the website and its existing security
policy.

## Dependencies

The template currently uses version-pinned dependencies:

- Orestbida CookieConsent `3.1.0`
- Adsgora Cookie Consent Helper `1.0.0`

Dependencies are pinned to specific releases instead of tracking development
branches.

## Privacy

The template itself does not send visitor data to Adsgora.

Consent choices are stored in the visitor's browser and used to update
Google Consent Mode according to the configured categories.

Third-party tags and services configured separately in Google Tag Manager may
process data according to their own privacy policies and consent requirements.

## Issues

If you find a bug or have a feature request, please open an issue in this
GitHub repository.

When reporting a problem, please include:

- Browser and version
- Google Tag Manager configuration
- Consent settings used
- Steps to reproduce the issue
- Relevant console errors, if available

## License

Licensed under the Apache License 2.0.

See the `LICENSE` file for details.

## Credits

Built using [Orestbida CookieConsent](https://github.com/orestbida/cookieconsent).

## Maintainer

Adsgora
