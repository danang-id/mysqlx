/**
 * Copyright 2019, Danang Galuh Tegar Prasetyo.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import OperationResult from './OperationResult'
import { ICollection, ICollectionAdd, IOperationResult } from './interfaces'
import { Document } from './types'

export class CollectionAdd implements ICollectionAdd {
	private readonly collection: ICollection
	private xCollectionAdd: any

	constructor(collection: ICollection, xCollectionAdd: any) {
		this.collection = collection
		this.xCollectionAdd = xCollectionAdd
	}

	public add(document: Document | Document[]): ICollectionAdd {
		try {
			this.xCollectionAdd = this.xCollectionAdd.add(document)
			return this
		} catch (error) {
			throw error
		}
	}

	public async execute(): Promise<IOperationResult> {
		try {
			const xResult = await this.xCollectionAdd.execute()
			return new OperationResult(xResult)
		} catch (error) {
			throw error
		}
	}
}

export default CollectionAdd
