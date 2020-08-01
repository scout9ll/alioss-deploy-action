import fs from 'fs'
import client from './ossClient'
import * as core from '@actions/core'

export async function deployToOss(localDir: string, deployDir: string): Promise<any[]> {
  const docs = fs.readdirSync(localDir)
  const fileMap = docs.map(async function(doc) {
    const _localDir = `${localDir}/${doc}`,
      _deployDir = `${deployDir}/${doc}`
    const st = fs.statSync(_localDir)
    if (st.isFile()) return putOSS(_deployDir, _localDir)
    return deployToOss(_localDir, _deployDir)
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
    core.info(
      `${new Date().toLocaleString()}>>>${fileKey} uploaded successfully`
    )
    return result
  } catch (err) {
    if (tryTime === 3) {
      throw new Error(`${localfile} upload failed`)
    }
    return putOSS(fileKey, localfile)
  }
}
