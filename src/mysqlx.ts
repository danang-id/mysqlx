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

// @ts-ignore
import mysql from '@mysql/xdevapi'
import Client from './Client'
import Session from './Session'
import * as Types from './types'
import * as Interfaces from './interfaces'

export type Client = Interfaces.IClient
export type Collection = Interfaces.ICollection
export type CollectionAdd = Interfaces.ICollectionAdd
export type CollectionFind = Interfaces.ICollectionFind
export type CollectionModify = Interfaces.ICollectionModify
export type CollectionRemove = Interfaces.ICollectionRemove
export type FindOperationResult = Interfaces.IFindOperationResult
export type OperationResult = Interfaces.IOperationResult
export type QueryExecutable = Interfaces.IQueryExecutable
export type Schema = Interfaces.ISchema
export type SelectOperationResult = Interfaces.ISelectOperationResult
export type Session = Interfaces.ISession
export type Table = Interfaces.ITable
export type TableDelete = Interfaces.ITableDelete
export type TableInsert = Interfaces.ITableInsert
export type TableSelect = Interfaces.ITableSelect
export type TableUpdate = Interfaces.ITableUpdate

export type Column = Types.Column
export type ConnectionOptions = Types.ConnectionOptions
export type CreateCollectionOptions = Types.CreateCollectionOptions
export type DataModel = Types.DataModel
export type DataModelConstant = Types.DataModelConstant
export type Document = Types.Document
export type Expression = Types.Expression
export type FieldDefinition = Types.FieldDefinition
export type IndexDefinition = Types.IndexDefinition
export type LockContention = Types.LockContention
export type LockContentionConstant = Types.LockContentionConstant
export type Metadata = Types.Metadata
export type OperationWarning = Types.OperationWarning
export type ParserOptions = Types.ParserOptions
export type PoolingOptions = Types.PoolingOptions
export type Projection = Types.Projection
export type ProtobufObject = Types.ProtobufObject
export type Row = Types.Row
export type SearchCondition = Types.SearchCondition
export type SearchConditionString = Types.SearchConditionString

export const LockContention: LockContentionConstant = {
	DEFAULT: 0,
	NOWAIT: 1,
	SKIP_LOCKED: 2,
}

export const DataModel: DataModelConstant = {
	DOCUMENT: 1,
	TABLE: 2,
}

export function expr(expression: Expression, options?: ParserOptions): ProtobufObject {
	return mysql.expr(expression, options)
}

export function getClient(connection: ConnectionOptions, pooling: PoolingOptions): Client {
	return new Client(connection, pooling)
}

export async function getSession(connection: ConnectionOptions): Promise<Session> {
	try {
		const xSession = await mysql.getSession(connection)
		return new Session(null, xSession)
	} catch (error) {
		throw error
	}
}

export function getVersion(): string {
	return require('root-require')('package.json').version
}

export function getXVersion(): string {
	return mysql.getVersion()
}

export default {
	LockContention,
	DataModel,
	expr,
	getClient,
	getSession,
	getVersion,
	getXVersion,
}
