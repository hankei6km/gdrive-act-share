# Google Drive tools Action - share

This action shares a file in Google Drive.



## Inputs

| parameter | description | required | default |
| - | - | - | - |
| file_id | The ID of the file or shared drive. | `false` |  |
| parent_id | The ID of the parent folders in remote | `false` |  |
| dest_file_name | The name of the file in remote | `false` |  |
| type | The type of the grantee. | `true` |  |
| role | The role granted by this permission | `true` |  |
| email_address | The email address of the user or group to which this permission refers. | `false` |  |
| domain | The domain to which this permission refers.	 | `false` |  |
| move_to_new_owners_root | This parameter will only take effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item. | `false` |  |
| allow_file_discovery | Whether the permission allows the file to be discovered through search. | `false` |  |
| view | Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type domain or anyone. | `false` |  |
| transfer_ownership | Whether to transfer ownership to the specified user and downgrade the current owner to a writer. | `false` |  |
| send_notification_email | Whether to send a notification email when sharing to users or groups. | `false` |  |
| email_message | A plain text custom message to include in the notification email. | `false` |  |


## Runs

This action is an `node16` action.



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
  uses: hankei6km/gdrive-act-send@v0.2.0
  with:
    parent_id: ${{ secrets.PARENT_ID }}
    dest-file-name: ${{ secrets.DEST_FILE_NAME }}
    src-file-name: ${{ secrets.SRC_FILE_NAME }}

- name: Share file
  uses: : hankei6km/gdrive-act-share@v0.1.1
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
