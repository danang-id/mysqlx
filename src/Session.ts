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

import Client from './Client';
import Schema from './Schema';
import QueryExecutable from './QueryExecutable';

export class Session {

	private readonly client: Client | null;
	private readonly xSession: any;

	constructor(
		client: Client | null,
		xSession: any
	) {
		this.client = client;
		this.xSession = xSession;
	}

	public getClient(): Client | null {
		return this.client;
	}

	public getXSession() {
		return this.xSession;
	}

	public async commit(): Promise<boolean> {
		try {
			return await this.xSession.commit();
		} catch (error) {
			throw error;
		}
	}

	public async createSchema(name: string): Promise<Schema> {
		try {
			const xSchema = await this.xSession.createSchema(name);
			return new Schema(this, xSchema);
		} catch (error) {
			throw error;
		}
	}

	public async dropSchema(name: string): Promise<boolean> {
		try {
			return await this.xSession.dropSchema(name);
		} catch (error) {
			throw error;
		}
	}

	public getDefaultSchema(): Schema {
		try {
			const xSchema = this.xSession.getDefaultSchema();
			return new Schema(this, xSchema);
		} catch (error) {
			throw error;
		}
	}

	public getSchema(name: string): Schema {
		try {
			const xSchema = this.xSession.getSchema(name);
			return new Schema(this, xSchema);
		} catch (error) {
			throw error;
		}
	}

	public getSchemas(): Schema[] {
		try {
			const xSchemas = this.xSession.getSchemas();
			const schemas: Schema[] = [];
			for (const xSchema of xSchemas) {
				schemas.push(new Schema(this, xSchema));
			}
			return schemas;
		} catch (error) {
			throw error;
		}
	}

	public async releaseSavepoint(name?: string): Promise<boolean> {
		try {
			return await this.xSession.releaseSavepoint(name);
		} catch (error) {
			throw error;
		}
	}

	public async rollback(): Promise<boolean> {
		try {
			return await this.xSession.rollback();
		} catch (error) {
			throw error;
		}
	}

	public async rollbackTo(name?: string): Promise<boolean> {
		try {
			return await this.xSession.rollbackTo(name);
		} catch (error) {
			throw error;
		}
	}

	public async setSavepoint(name?: string): Promise<string> {
		try {
			return await this.xSession.setSavepoint(name);
		} catch (error) {
			throw error;
		}
	}

	public sql(query: string): QueryExecutable {
		try {
			const xSqlExecute = this.xSession.sql(query);
			return new QueryExecutable(xSqlExecute);
		} catch (error) {
			throw error;
		}
	}

	public async startTransaction(): Promise<boolean> {
		try {
			return await this.xSession.startTransaction();
		} catch (error) {
			throw error;
		}
	}

}

export default Session;
