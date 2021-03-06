import * as core from '@actions/core'
import { driveClient, createPermisson } from 'guratan'

export function optionalBoolean(s: string): boolean | undefined {
  const t = core.getInput(s)
  if (t === undefined || t === 'undefined' || t === '') {
    return
  }
  return core.getBooleanInput(s)
}

try {
  const fileId = core.getInput('file_id')
  const parentId = core.getInput('parent_id')
  const destFileName = core.getInput('dest_file_name')
  const type = core.getInput('type')
  const role = core.getInput('role')
  const emailAddress = core.getInput('email_address')
  const domain = core.getInput('domain')
  const moveToNewOwnersRoot = optionalBoolean('move_to_new_owners_root')
  const allowFileDiscovery = optionalBoolean('allow_file_discovery')
  const view = core.getInput('view')
  const transferOwnership = optionalBoolean('transfer_ownership')
  const sendNotificationEmail = optionalBoolean('send_notification_email')
  const emailMessage = core.getInput('email_message')
  if (typeof fileId !== 'string') {
    throw new Error(`file_id: the input is invalid : ${fileId}`)
  }
  if (typeof parentId !== 'string') {
    throw new Error(`parent_id: the input is invalid : ${parentId}`)
  }
  if (typeof destFileName !== 'string') {
    throw new Error(`dest_file_name: the input is invalid : ${destFileName}`)
  }
  if (typeof type !== 'string' || type === '') {
    throw new Error(`type: the input is invalid : ${type}`)
  }
  if (typeof role !== 'string' || role === '') {
    throw new Error(`role: the input is invalid : ${role}`)
  }

  const permission_id = await createPermisson(driveClient(), {
    fileId,
    parentId,
    destFileName,
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
