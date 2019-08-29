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

import { IOperationResult } from './interfaces'
import { OperationWarning } from './types'

export class OperationResult implements IOperationResult {
	private readonly xResult: any

	constructor(xResult: any) {
		this.xResult = xResult
	}

	public getAffectedItemsCount(): number {
		return this.xResult.getAffectedItemsCount()
	}

	public getAffectedRowsCount(): number {
		return this.xResult.getAffectedRowsCount()
	}

	public getAutoIncrementValue(): number {
		return this.xResult.getAutoIncrementValue()
	}

	public getGeneratedIds(): string[] {
		return this.xResult.getGeneratedIds()
	}

	public getWarnings(): OperationWarning[] {
		return this.xResult.getWarnings()
	}

	public getWarningsCount(): number {
		return this.xResult.getWarningsCount()
	}
}

export default OperationResult
