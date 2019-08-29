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

import Collection from './Collection'
import Table from './Table'
import { IClient, ICollection, ISchema, ISession, ITable } from './interfaces'
import { CreateCollectionOptions } from './types'

export class Schema implements ISchema {
	private readonly client: IClient | null
	private readonly session: ISession
	private readonly xSchema: any

	constructor(session: ISession, xSchema: any) {
		this.client = session.getClient()
		this.session = session
		this.xSchema = xSchema
	}

	public getClient(): IClient | null {
		return this.client
	}

	public getSession(): ISession {
		return this.session
	}

	public getXSchema(): any {
		return this.xSchema
	}

	public async createCollection(name: string, options?: CreateCollectionOptions): Promise<ICollection> {
		try {
			const xCollection = await this.xSchema.createCollection(name, options)
			return new Collection(this, xCollection)
		} catch (error) {
			throw error
		}
	}

	public async dropCollection(name: string): Promise<boolean> {
		try {
			return await this.xSchema.dropCollection(name)
		} catch (error) {
			throw error
		}
	}

	public async existsInDatabase(): Promise<boolean> {
		try {
			return await this.xSchema.existsInDatabase()
		} catch (error) {
			throw error
		}
	}

	public getCollection(name: string): ICollection {
		try {
			const xCollection = this.xSchema.getCollection(name)
			return new Collection(this, xCollection)
		} catch (error) {
			throw error
		}
	}

	public getCollectionAsTable(name: string): ITable {
		try {
			const xTable = this.xSchema.getCollectionAsTable(name)
			return new Table(this, xTable)
		} catch (error) {
			throw error
		}
	}

	public async getCollections(): Promise<ICollection[]> {
		try {
			const xCollections = await this.xSchema.getCollections()
			const collections: ICollection[] = []
			for (const xCollection of xCollections) {
				collections.push(new Collection(this, xCollection))
			}
			return collections
		} catch (error) {
			throw error
		}
	}

	public getTable(name: string): ITable {
		try {
			const xTable = this.xSchema.getTable(name)
			return new Table(this, xTable)
		} catch (error) {
			throw error
		}
	}

	public async getTables(): Promise<ITable[]> {
		try {
			const xTables = await this.xSchema.getTables()
			const tables: ITable[] = []
			for (const xTable of xTables) {
				tables.push(new Table(this, xTable))
			}
			return tables
		} catch (error) {
			throw error
		}
	}

	public getName(): string {
		return this.xSchema.getName()
	}

	public inspect(): Object {
		return this.xSchema.inspect()
	}
}

export default Schema
