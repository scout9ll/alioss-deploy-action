import * as core from '@actions/core'
import {deployToOss} from './ossUpload'

async function run(): Promise<void> {
  try {
    const staticPath = core.getInput('staticPath')
    const deployPath = core.getInput('deployPath')
    core.debug(new Date().toTimeString())
    await deployToOss(staticPath, deployPath)
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
