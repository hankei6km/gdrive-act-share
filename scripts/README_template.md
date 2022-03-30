# Google Drive tools Action - share

This action shares a file in Google Drive.

## Environment Variables

### `GOOGLE_APPLICATION_CREDENTIALS`

**Required** path to Service Account Credentials JSON file.

<!-- INSERT -->

## Example usage

```yaml
- id: 'auth'
  name: 'Authenticate to Google Cloud'
  uses: 'google-github-actions/auth@v0'
  with:
    workload_identity_provider: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
    service_account: ${{ secrets.SERVICE_ACCOUNT }}

- name: Share file
  uses: : hankei6km/gdrive-act-share@v:CUR_VER
  with:
    file_id: ${{ steps.send.outputs.file_id }}
    type: ${{ secrets.SHARE_TYPE }}
    role: ${{ secrets.SHARE_ROLE }}
    email_address: ${{ secrets.SHARE_EMAIL_ADDRESS }}
    send_notification_email: 'false'
```

## Related

- [Google Drive tools Action - send](https://github.com/hankei6km/gdrive-act-send)
- [Google Drive tools Action - recv](https://github.com/hankei6km/gdrive-act-recv)

## Licenses

MIT License

Copyright (c) 2022 hankei6km
