import fs from 'fs'
import client from './ossClient'
import * as core from '@actions/core'

export async function deployToOss(src: string, dist: string): Promise<any[]> {
  const docs = fs.readdirSync(src)
  const fileMap = docs.map(async function(doc) {
    const _src = `${src}/${doc}`,
      _dist = `${dist}/${doc}`
    const st = fs.statSync(_src)
    if (st.isFile()) return putOSS(_dist, _src)
    return deployToOss(_src, _dist)
  })
  return Promise.all(fileMap)
}

/**
 * 上传文件到 OSS
 * @param {string} fileKey 表示上传到 OSS 的 Object 名称
 * @param {string} localfile 本地文件夹或者文件路径
 */
async function putOSS(fileKey, localfile): Promise<string> {
  let tryTime = 0
  try {
    tryTime++
    const result = await client.put(fileKey, localfile)
    core.info(`${new Date()}>>${fileKey} uploaded`)
    return result
  } catch (err) {
    if (tryTime === 3) {
      throw new Error(`${localfile} upload failed`)
    }
    return putOSS(fileKey, localfile)
  }
}
