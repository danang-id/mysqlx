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
import { ICollection, ICollectionModify, IOperationResult } from './interfaces'
import { Document } from './types'

export class CollectionModify implements ICollectionModify {
	private readonly collection: ICollection
	private xCollectionModify: any

	constructor(collection: ICollection, xCollectionModify: any) {
		this.collection = collection
		this.xCollectionModify = xCollectionModify
	}

	public arrayAppend(field: string, value: any): ICollectionModify {
		try {
			this.xCollectionModify = this.xCollectionModify.arrayAppend(field, value)
			return this
		} catch (error) {
			throw error
		}
	}

	public arrayInsert(field: string, value: any): ICollectionModify {
		try {
			this.xCollectionModify = this.xCollectionModify.arrayInsert(field, value)
			return this
		} catch (error) {
			throw error
		}
	}

	public patch(document: Document): ICollectionModify {
		try {
			this.xCollectionModify = this.xCollectionModify.patch(document)
			return this
		} catch (error) {
			throw error
		}
	}

	public set(field: string, value: any): ICollectionModify {
		try {
			this.xCollectionModify = this.xCollectionModify.set(field, value)
			return this
		} catch (error) {
			throw error
		}
	}

	public unset(field: string, value: any): ICollectionModify {
		try {
			this.xCollectionModify = this.xCollectionModify.unset(field, value)
			return this
		} catch (error) {
			throw error
		}
	}

	public async execute(): Promise<IOperationResult> {
		try {
			const xResult = await this.xCollectionModify.execute()
			return new OperationResult(xResult)
		} catch (error) {
			throw error
		}
	}
}

export default CollectionModify
