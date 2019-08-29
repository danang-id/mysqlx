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

import { IClient, ICollectionAdd, ICollectionFind, ICollectionModify, ICollectionRemove, IOperationResult, ISchema, ISession } from './index'
import { Document, IndexDefinition, SearchCondition, SearchConditionString } from './../types'

export interface ICollection {
	getClient(): IClient | null
	getSession(): ISession
	getSchema(): ISchema
	getXCollection(): any
	add(document: Document | Document[]): ICollectionAdd
	addOrReplaceOne(id: string, document: Document): Promise<IOperationResult>
	count(): Promise<number>
	createIndex(name: string, constraint: IndexDefinition): Promise<boolean>
	dropIndex(name: string): Promise<boolean>
	existsInDatabase(): Promise<boolean>
	find(condition?: SearchCondition | SearchConditionString): ICollectionFind
	findOne(condition: SearchCondition | SearchConditionString): Promise<Document | undefined>
	findByID(id: string): Promise<Document | undefined>
	getName(): string
	getOne(id: string): Promise<Document>
	inspect(): Object
	modify(condition: SearchCondition | SearchConditionString): ICollectionModify
	remove(condition?: SearchCondition | SearchConditionString): ICollectionRemove
	removeByID(id: string): Promise<IOperationResult>
	replaceOne(id: string, document: Document): Promise<IOperationResult>
}

export default ICollection
