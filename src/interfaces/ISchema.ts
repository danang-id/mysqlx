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

import { IClient, ICollection, ISession, ITable } from './index'
import { CreateCollectionOptions } from './../types'

export interface ISchema {
	getClient(): IClient | null
	getSession(): ISession
	getXSchema(): any
	createCollection(name: string, options?: CreateCollectionOptions): Promise<ICollection>
	dropCollection(name: string): Promise<boolean>
	existsInDatabase(): Promise<boolean>
	getCollection(name: string): ICollection
	getCollectionAsTable(name: string): ITable
	getCollections(): Promise<ICollection[]>
	getTable(name: string): ITable
	getTables(): Promise<ITable[]>
	getName(): string
	inspect(): Object
}

export default ISchema
