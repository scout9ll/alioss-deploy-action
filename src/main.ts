import * as core from '@actions/core'
import {deployToOss} from './ossUpload'

async function run(): Promise<void> {
  try {
    const multiDirs = JSON.parse(core.getInput('dirMap'))
    // const deployDir = core.getInput('deployDir')
    core.debug(new Date().toTimeString())
    const deployTasks = Object.entries(multiDirs).map(
      ([localDir, deployDir]) => {
        if (typeof deployDir !== 'string') {
          return core.error(`${localDir}'s deployDir must be a string`)
        }
        deployToOss(localDir, deployDir)
      }
    )
    await Promise.all(deployTasks)
    core.debug(new Date().toTimeString())
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
