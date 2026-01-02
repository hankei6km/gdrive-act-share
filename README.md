# Google Drive tools Action - share

This action shares a file in Google Drive.

## Environment Variables

### `GOOGLE_APPLICATION_CREDENTIALS`

**Required** path to Service Account Credentials JSON file.

## Inputs

| name | description | required | default |
| --- | --- | --- | --- |
| `file_id` | <p>The ID of the file or shared drive.</p> | `false` | `""` |
| `parent_id` | <p>The ID of the parent folders in remote</p> | `false` | `""` |
| `dest_file_name` | <p>The name of the file in remote. When there are multiple files with the same parent id and the same name, only one of them is applied.</p> | `false` | `""` |
| `type` | <p>The type of the grantee.</p> | `true` | `""` |
| `role` | <p>The role granted by this permission</p> | `true` | `""` |
| `email_address` | <p>The email address of the user or group to which this permission refers.</p> | `false` | `""` |
| `domain` | <p>The domain to which this permission refers.    </p> | `false` | `""` |
| `move_to_new_owners_root` | <p>This parameter will only take effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item.</p> | `false` | `""` |
| `allow_file_discovery` | <p>Whether the permission allows the file to be discovered through search.</p> | `false` | `""` |
| `view` | <p>Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type domain or anyone.</p> | `false` | `""` |
| `transfer_ownership` | <p>Whether to transfer ownership to the specified user and downgrade the current owner to a writer.</p> | `false` | `""` |
| `send_notification_email` | <p>Whether to send a notification email when sharing to users or groups.</p> | `false` | `""` |
| `email_message` | <p>A plain text custom message to include in the notification email.</p> | `false` | `""` |



## Runs

This action is a `node20` action.

## Example usage

```yaml
- id: 'auth'
  name: 'Authenticate to Google Cloud'
  uses: 'google-github-actions/auth@v0'
  with:
    workload_identity_provider: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
    service_account: ${{ secrets.SERVICE_ACCOUNT }}

- name: Share file
  uses: : hankei6km/gdrive-act-share@v0.3.14
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
