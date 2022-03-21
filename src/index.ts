import * as core from '@actions/core'
import { driveClient, createPermisson } from 'guratan'

try {
  const fileId = core.getInput('file_id')
  const type = core.getInput('type')
  const role = core.getInput('role')
  const emailAddress = core.getInput('email_address')
  const domain = core.getInput('domain')
  const moveToNewOwnersRoot = core.getBooleanInput('move_to_new_owners_root')
  const allowFileDiscovery = core.getBooleanInput('allow_file_discovery')
  const view = core.getInput('view')
  const transferOwnership = core.getBooleanInput('transfer_ownership')
  const sendNotificationEmail = core.getBooleanInput('send_notification_email')
  const emailMessage = core.getInput('email_message')
  if (typeof fileId !== 'string' || fileId === '') {
    throw new Error(`file_id: the input is invalid : ${fileId}`)
  }
  if (typeof type !== 'string' || type === '') {
    throw new Error(`type: the input is invalid : ${type}`)
  }
  if (typeof role !== 'string' || role === '') {
    throw new Error(`role: the input is invalid : ${role}`)
  }

  const permission_id = await createPermisson(driveClient(), {
    fileId,
    type,
    role,
    emailAddress,
    domain,
    moveToNewOwnersRoot,
    allowFileDiscovery,
    view: view || '',
    transferOwnership,
    sendNotificationEmail,
    emailMessage: emailMessage || ''
  })
} catch (err: any) {
  core.setFailed(err.message)
}
