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

import Collection from './Collection';
import Document from './types/Document';
import OperationResult from './OperationResult';

export class CollectionAdd {

	private readonly collection: Collection;
	private xCollectionAdd: any;

	constructor(collection: Collection, xCollectionAdd: any) {
		this.collection = collection;
		this.xCollectionAdd = xCollectionAdd;
	}

	public add(document: Document | Document[]): CollectionAdd {
		try {
			this.xCollectionAdd = this.xCollectionAdd.add(document);
			return this;
		} catch (error) {
			throw error;
		}
	}

	public async execute(): Promise<OperationResult> {
		try {
			const xResult = await this.xCollectionAdd.execute();
			return new OperationResult(xResult);
		} catch (error) {
			throw error;
		}
	}

}

export default CollectionAdd;
