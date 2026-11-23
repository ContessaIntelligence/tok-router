# Code signing policy

Token Router is open source (MIT). Windows release binaries are intended to be
signed with a certificate provided by the
[SignPath Foundation](https://signpath.org/) and used through
[SignPath.io](https://about.signpath.io/).

Until the SignPath application is approved and wired into CI, release binaries
are unsigned and Windows SmartScreen may show an "unknown publisher" warning.

## What gets signed

- `token-router-windows-x64.exe`, built from this repository by the GitHub
  Actions workflow `.github/workflows/build.yml` when a `v*` tag is pushed.
- Only binaries built from the source in this repository are signed. Upstream
  or third-party binaries are not signed by this project.

## Roles

| Role                     | Who                                 | Responsibility                                        |
| ------------------------ | ----------------------------------- | ----------------------------------------------------- |
| Committers and reviewers | Repository maintainers (routok.com) | Write and review the code that is built and signed.   |
| Approvers                | Repository owner                    | Manually approve every signing request for a release. |

All team members use multi-factor authentication for GitHub and SignPath.

## Release process

1. A maintainer bumps the version, merges to `main`, and pushes a `v*` tag.
2. GitHub Actions builds the executables from the tagged commit.
3. The Windows executable is submitted to SignPath for signing.
4. An approver reviews the signing request and approves it.
5. The signed executable is published in the GitHub release.

## Privacy

Token Router does not send telemetry. The app talks to the network only to
reach the provider endpoints the user configures and, when the user clicks
the link, to open `https://api.routok.com` in the system browser. Provider
keys stay in the local database under `~/.cc-switch`.

## Attribution

Free code signing provided by [SignPath.io](https://about.signpath.io/),
certificate by the [SignPath Foundation](https://signpath.org/).

## Maintainer setup after approval

SignPath gives you an organization ID, a project slug, a signing policy slug
and an artifact configuration. Then:

1. In the GitHub repo, add the secret `SIGNPATH_API_TOKEN`, and the variables
   `SIGNPATH_ORGANIZATION_ID`, `SIGNPATH_PROJECT_SLUG` and
   `SIGNPATH_SIGNING_POLICY_SLUG`.
2. Resolve the commit SHA of the SignPath action tag
   (`git ls-remote https://github.com/SignPath/github-action-submit-signing-request.git "refs/tags/v2*"`),
   pin it by SHA with the version in a comment, and add it to the table in
   `AGENTS.md`.
3. In `build.yml`, upload the unsigned Windows exe as its own artifact, run the
   SignPath action on it with `wait-for-completion: true`, and publish the
   signed output. The artifact must be uploaded with `actions/upload-artifact`
   first, because SignPath reads the GitHub artifact by ID.
