import { fileURLToPath } from 'node:url'
import { jest } from '@jest/globals'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// mock の作り方が不明なので、input の検証のみ.

// read-only property で戻せない。前は使えたと思ったのだが.
//const saveEnv = process.env
//beforeEach(() => (process.env = { ...saveEnv }))
//afterAll(() => (process.env = { ...saveEnv }))

const saveInputs = {
  fileId: process.env['INPUT_FILE_ID'],
  type: process.env['INPUT_TYPE'],
  role: process.env['INPUT_ROLE'],
  emailAddress: process.env['INPUT_EMAIL_ADDRESS'],
  domain: process.env['INPUT_DOMAIN'],
  moveToNewOwnersRoot: process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'],
  allowFileDiscovery: process.env['INPUT_ALLOW_FILE_DISCOVERY'],
  view: process.env['INPUT_VIEW'],
  transferOwnership: process.env['INPUT_TRANSFER_OWNERSHIP'],
  sendNotificationEmail: process.env['INPUT_SEND_NOTIFICATION_EMAIL'],
  emailMessage: process.env['INPUT_EMAIL_MESSAGE']
}
beforeEach(() => {
  process.env['INPUT_FILE_ID'] = saveInputs.fileId
  process.env['INPUT_TYPE'] = saveInputs.type
  process.env['INPUT_ROLE'] = saveInputs.role
  process.env['INPUT_EMAIL_ADDRESS'] = saveInputs.emailAddress
  process.env['INPUT_DOMAIN'] = saveInputs.domain
  process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = saveInputs.moveToNewOwnersRoot
  process.env['INPUT_ALLOW_FILE_DISCOVERY'] = saveInputs.allowFileDiscovery
  process.env['INPUT_VIEW'] = saveInputs.view
  process.env['INPUT_TRANSFER_OWNERSHIP'] = saveInputs.transferOwnership
  process.env['INPUT_SEND_NOTIFICATION_EMAIL'] =
    saveInputs.sendNotificationEmail
  process.env['INPUT_EMAIL_MESSAGE'] = saveInputs.emailMessage
})
afterAll(() => {
  process.env['INPUT_FILE_ID'] = saveInputs.fileId
  process.env['INPUT_TYPE'] = saveInputs.type
  process.env['INPUT_ROLE'] = saveInputs.role
  process.env['INPUT_EMAIL_ADDRESS'] = saveInputs.emailAddress
  process.env['INPUT_DOMAIN'] = saveInputs.domain
  process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = saveInputs.moveToNewOwnersRoot
  process.env['INPUT_ALLOW_FILE_DISCOVERY'] = saveInputs.allowFileDiscovery
  process.env['INPUT_VIEW'] = saveInputs.view
  process.env['INPUT_TRANSFER_OWNERSHIP'] = saveInputs.transferOwnership
  process.env['INPUT_SEND_NOTIFICATION_EMAIL'] =
    saveInputs.sendNotificationEmail
  process.env['INPUT_EMAIL_MESSAGE'] = saveInputs.emailMessage
})

describe('index', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const ip = path.join(__dirname, '..', 'dist', 'index.js')
  it('should print error message(fileId = blank)', async () => {
    process.env['INPUT_FILE_ID'] = ''
    process.env['INPUT_TYPE'] = 'type'
    process.env['INPUT_ROLE'] = 'role'
    process.env['INPUT_EMAIL_ADDRESS'] = 'emailAddress'
    process.env['INPUT_DOMAIN'] = 'domain'
    process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = 'false'
    process.env['INPUT_ALLOW_FILE_DISCOVERY'] = 'false'
    process.env['INPUT_VIEW'] = ''
    process.env['INPUT_TRANSFER_OWNERSHIP'] = 'false'
    process.env['INPUT_SEND_NOTIFICATION_EMAIL'] = 'true'
    process.env['INPUT_EMAIL_MESSAGE'] = ''
    const [stdout, stderr] = await new Promise((resolve) => {
      cp.exec(`node ${ip}`, { env: process.env }, (_err, stdout, stderr) => {
        resolve([stdout.toString(), stderr.toString()])
      })
    })
    expect(stdout).toMatch(/\:\:error\:\:file_id\: the input is invalid \:/)
    expect(stderr).toEqual('')
  })

  it('should print error message(type = blank)', async () => {
    process.env['INPUT_FILE_ID'] = 'parentId'
    process.env['INPUT_TYPE'] = ''
    process.env['INPUT_ROLE'] = 'role'
    process.env['INPUT_EMAIL_ADDRESS'] = 'emailAddress'
    process.env['INPUT_DOMAIN'] = 'domain'
    process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = 'false'
    process.env['INPUT_ALLOW_FILE_DISCOVERY'] = 'false'
    process.env['INPUT_VIEW'] = ''
    process.env['INPUT_TRANSFER_OWNERSHIP'] = 'false'
    process.env['INPUT_SEND_NOTIFICATION_EMAIL'] = 'true'
    process.env['INPUT_EMAIL_MESSAGE'] = ''
    const [stdout, stderr] = await new Promise((resolve) => {
      cp.exec(`node ${ip}`, { env: process.env }, (_err, stdout, stderr) => {
        resolve([stdout.toString(), stderr.toString()])
      })
    })
    expect(stdout).toMatch(/\:\:error\:\:type\: the input is invalid \:/)
    expect(stderr).toEqual('')
  })

  it('should print error message(role = blank)', async () => {
    process.env['INPUT_FILE_ID'] = 'parentId'
    process.env['INPUT_TYPE'] = 'type'
    process.env['INPUT_ROLE'] = ''
    process.env['INPUT_EMAIL_ADDRESS'] = 'emailAddress'
    process.env['INPUT_DOMAIN'] = 'domain'
    process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = 'false'
    process.env['INPUT_ALLOW_FILE_DISCOVERY'] = 'false'
    process.env['INPUT_VIEW'] = ''
    process.env['INPUT_TRANSFER_OWNERSHIP'] = 'false'
    process.env['INPUT_SEND_NOTIFICATION_EMAIL'] = 'true'
    process.env['INPUT_EMAIL_MESSAGE'] = ''
    const [stdout, stderr] = await new Promise((resolve) => {
      cp.exec(`node ${ip}`, { env: process.env }, (_err, stdout, stderr) => {
        resolve([stdout.toString(), stderr.toString()])
      })
    })
    expect(stdout).toMatch(/\:\:error\:\:role\: the input is invalid \:/)
    expect(stderr).toEqual('')
  })

  it('should print error message(moveToNewOwnersRoot = blank)', async () => {
    process.env['INPUT_FILE_ID'] = 'parentId'
    process.env['INPUT_TYPE'] = 'type'
    process.env['INPUT_ROLE'] = 'role'
    process.env['INPUT_EMAIL_ADDRESS'] = 'emailAddress'
    process.env['INPUT_DOMAIN'] = ''
    process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = ''
    process.env['INPUT_ALLOW_FILE_DISCOVERY'] = 'false'
    process.env['INPUT_VIEW'] = ''
    process.env['INPUT_TRANSFER_OWNERSHIP'] = 'false'
    process.env['INPUT_SEND_NOTIFICATION_EMAIL'] = 'true'
    process.env['INPUT_EMAIL_MESSAGE'] = ''
    const [stdout, stderr] = await new Promise((resolve) => {
      cp.exec(`node ${ip}`, { env: process.env }, (_err, stdout, stderr) => {
        resolve([stdout.toString(), stderr.toString()])
      })
    })
    expect(stdout).toMatch(/move_to_new_owners_root/)
    expect(stderr).toEqual('')
  })

  it('should print error message(allow_file_discovery = blank)', async () => {
    process.env['INPUT_FILE_ID'] = 'parentId'
    process.env['INPUT_TYPE'] = 'type'
    process.env['INPUT_ROLE'] = 'role'
    process.env['INPUT_EMAIL_ADDRESS'] = 'emailAddress'
    process.env['INPUT_DOMAIN'] = 'domain'
    process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = 'false'
    process.env['INPUT_ALLOW_FILE_DISCOVERY'] = ''
    process.env['INPUT_VIEW'] = 'view'
    process.env['INPUT_TRANSFER_OWNERSHIP'] = 'false'
    process.env['INPUT_SEND_NOTIFICATION_EMAIL'] = 'true'
    process.env['INPUT_EMAIL_MESSAGE'] = ''
    const [stdout, stderr] = await new Promise((resolve) => {
      cp.exec(`node ${ip}`, { env: process.env }, (_err, stdout, stderr) => {
        resolve([stdout.toString(), stderr.toString()])
      })
    })
    expect(stdout).toMatch(/allow_file_discovery/)
    expect(stderr).toEqual('')
  })

  it('should print error message(transfer_ownership = blank)', async () => {
    process.env['INPUT_FILE_ID'] = 'parentId'
    process.env['INPUT_TYPE'] = 'type'
    process.env['INPUT_ROLE'] = 'role'
    process.env['INPUT_EMAIL_ADDRESS'] = 'emailAddress'
    process.env['INPUT_DOMAIN'] = 'domain'
    process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = 'false'
    process.env['INPUT_ALLOW_FILE_DISCOVERY'] = 'false'
    process.env['INPUT_VIEW'] = ''
    process.env['INPUT_TRANSFER_OWNERSHIP'] = ''
    process.env['INPUT_SEND_NOTIFICATION_EMAIL'] = 'true'
    process.env['INPUT_EMAIL_MESSAGE'] = ''
    const [stdout, stderr] = await new Promise((resolve) => {
      cp.exec(`node ${ip}`, { env: process.env }, (_err, stdout, stderr) => {
        resolve([stdout.toString(), stderr.toString()])
      })
    })
    expect(stdout).toMatch(/transfer_ownership/)
    expect(stderr).toEqual('')
  })

  it('should print error message(send_notification_email = blank)', async () => {
    process.env['INPUT_FILE_ID'] = 'parentId'
    process.env['INPUT_TYPE'] = 'type'
    process.env['INPUT_ROLE'] = 'role'
    process.env['INPUT_EMAIL_ADDRESS'] = 'emailAddress'
    process.env['INPUT_DOMAIN'] = 'domain'
    process.env['INPUT_MOVE_TO_NEW_OWNERS_ROOT'] = 'false'
    process.env['INPUT_ALLOW_FILE_DISCOVERY'] = 'false'
    process.env['INPUT_VIEW'] = ''
    process.env['INPUT_TRANSFER_OWNERSHIP'] = 'false'
    process.env['INPUT_SEND_NOTIFICATION_EMAIL'] = ''
    process.env['INPUT_EMAIL_MESSAGE'] = ''
    const [stdout, stderr] = await new Promise((resolve) => {
      cp.exec(`node ${ip}`, { env: process.env }, (_err, stdout, stderr) => {
        resolve([stdout.toString(), stderr.toString()])
      })
    })
    expect(stdout).toMatch(/send_notification_email/)
    expect(stderr).toEqual('')
  })
})
