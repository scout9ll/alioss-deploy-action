# Ali-OSS Deploy

This is a simple GitHub Action to deploy a static website to ali-oss.

## Usage

To use a GitHub action you can just reference it on your Workflow file
(for more info check [this article by Github](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-a-workflow))

<!-- > Important: this action will execute `npm i` and `npm run build`. Please open an issue if another command is needed -->

```yml
name: 'My Workflow'

on:
  release:
    types: [published]

jobs:
  deploy:
    name: 'Deploy to ali-oss'
    steps:
      - uses: steve9II/alioss-deploy-action
        with:
          dirMap: Mapping between local directory and deployment directory
          region: ${{ secrets.region }}
          bucket: ${{ secrets.bucket }}
          accessKeyId: ${{ secrets.accessKeyId }}
          accessKeySecret: ${{ secrets.accessKeySecret }}
```

### Inputs

As most GitHub actions, this action requires and uses some inputs, that you define in
your workflow file.

The inputs this action uses are:

> we should not write sensitive information into action file ,please store these in github ([how to create secret in github](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets))

| Name | Required | Default | Description |
|:----:|:--------:|:-------:|:-----------:|
| `accessKeyId` | `true` | N/A |your ali-oss accessKeyId([create here](https://usercenter.console.aliyun.com/#/manage/ak))|
| `accessKeySecret` | `true` | N/A | your ali-oss accessKeySecret| 
| `region` | `true` |  N/A  | your oss region|
| `bucket` | `true` |  N/A | your bucket|
| `localDir` | `true` | N/A | your local static files path |
| `deployDir` | `true` | N/A | your expected ali-oss deploy directory|


## Example

### Deploy to production on release

> You can setup repo secrets to use in your workflows

```yml
name: 'ali-oss Deploy'

on:
  push:
    branches:
      - master
    tags:
      - v1
    # file paths to consider in the event. Optional; defaults to all.
    paths:
      - 'public/*'

jobs:
  deploy:
    name: 'Deploy'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: steve9II/alioss-deploy-action
        with:
          localDir: your local static path
          deployDir: your expected ali-oss path
          region: ${{ secrets.region }}
          bucket: ${{ secrets.bucket }}
          accessKeyId: ${{ secrets.accessKeyId }}
          accessKeySecret: ${{ secrets.accessKeySecret }}
```

### Preview Deploy on pull request

```yml
name: 'ali-oss Preview Deploy'

on:
  pull_request:
    types: ['opened', 'edited', 'synchronize']

jobs:
  deploy:
    name: 'Deploy'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: steve9II/alioss-deploy-action
        with:
          localDir: your local static path
          deployDir: your expected ali-oss path
          region: ${{ secrets.region }}
          bucket: ${{ secrets.bucket }}
          accessKeyId: ${{ secrets.accessKeyId }}
          accessKeySecret: ${{ secrets.accessKeySecret }}

```
