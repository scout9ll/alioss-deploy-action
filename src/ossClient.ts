import * as core from '@actions/core'
import OSS from 'ali-oss'

const client = new OSS({
  region: core.getInput('region'),
  bucket: core.getInput('bucket'),
  accessKeyId: core.getInput('accessKeyId'),
  accessKeySecret: core.getInput('accessKeySecret')
})

export default client
