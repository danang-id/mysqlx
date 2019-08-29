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
import { ISelectOperationResult } from './interfaces'
import { Metadata, Row } from './types'

export class SelectOperationResult extends OperationResult implements ISelectOperationResult {
	private readonly rows: Row[][]
	private readonly metadata: Metadata
	private readonly objects: Object[]

	constructor(xResult: any, rows: Row[][], metadata: Metadata) {
		super(xResult)
		this.rows = rows
		this.metadata = metadata
		this.objects = []
		for (const row of this.rows) {
			const object: { [key: string]: any } = {}
			let index: number = 0
			for (const column of this.metadata) {
				object[column.name] = row[index]
				index++
			}
			this.objects.push(object)
		}
	}

	public getRows(): Row[][] {
		return this.rows
	}

	public getMetadata(): Metadata {
		return this.metadata
	}

	public getObjects(): Object[] {
		return this.objects
	}
}

export default SelectOperationResult
