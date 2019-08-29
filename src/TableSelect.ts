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

import SelectOperationResult from './SelectOperationResult'
import { ISelectOperationResult, ITable, ITableSelect } from './interfaces'
import { Metadata, Row } from './types'

export class TableSelect implements ITableSelect {
	private readonly table: ITable
	private xTableSelect: any

	constructor(table: ITable, xTableSelect: any) {
		this.table = table
		this.xTableSelect = xTableSelect
	}

	public async execute(): Promise<ISelectOperationResult> {
		try {
			const rows: Row[][] = []
			let metadata: Metadata = []
			const xResult = await this.xTableSelect.execute(
				(row: Row[]) => {
					rows.push(row)
				},
				(meta: Metadata) => {
					metadata = meta
				}
			)
			return new SelectOperationResult(xResult, rows, metadata)
		} catch (error) {
			throw error
		}
	}
}

export default TableSelect
