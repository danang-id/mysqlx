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

import { IClient, ISchema, ISession, ITableDelete, ITableInsert, ITableSelect, ITableUpdate } from './index'
import { SearchCondition, SearchConditionString } from './../types'

export interface ITable {
	getClient(): IClient | null
	getSession(): ISession
	getSchema(): ISchema
	getXTable(): any
	count(): Promise<number>
	delete(condition?: SearchCondition | SearchConditionString): ITableDelete
	existsInDatabase(): Promise<boolean>
	getName(): string
	insert(fields: string[]): ITableInsert
	insert(fields: { [k: string]: any }): ITableInsert
	insert(...fields: string[]): ITableInsert
	insert(...fields: any[]): ITableInsert
	inspect(): Object
	isView(): Promise<boolean>
	select(fields: string[]): ITableSelect
	select(...fields: string[]): ITableSelect
	select(...fields: any[]): ITableSelect
	update(condition?: SearchCondition | SearchConditionString): ITableUpdate
}

export default ITable
