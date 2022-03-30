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

- name: Send file
  id: send
  uses: hankei6km/gdrive-act-send@v0
  with:
    parent_id: ${{ secrets.PARENT_ID }}
    dest-file-name: ${{ secrets.DEST_FILE_NAME }}
    src-file-name: ${{ secrets.SRC_FILE_NAME }}

- name: Share file
  uses: : hankei6km/gdrive-act-share@v:CUR_VER
  with:
    file_id: ${{ steps.send.outputs.file_id }}
    type: ${{ secrets.SHARE_TYPE }}
    role: ${{ secrets.SHARE_ROLE }}
    email_address: ${{ secrets.SHARE_EMAIL_ADDRESS }}
    send_notification_email: 'false'
```

## Licenses

MIT License

Copyright (c) 2022 hankei6km
