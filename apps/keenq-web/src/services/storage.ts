import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { Api } from '@/services/api'

import { IApi } from '@/types/types'

export function createStorageApi(storage: FirebaseStorage): (root: Api) => StorageApi {
  return (root) => new StorageApi({ root, storage })
}

export class StorageApi implements IApi {

  root: Api
  storage: FirebaseStorage

  constructor({ root, storage }: { root: Api, storage: FirebaseStorage }) {
    this.root = root
    this.storage = storage
  }

  async init() {
    return true
  }

  async upload(folder: string, file: File) {
    const storageRef = ref(this.storage, `${folder}/${Date.now()}_${file.name}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

}
