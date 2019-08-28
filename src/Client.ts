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
import mysql from '@mysql/xdevapi';
import Session from './Session';
import ConnectionOptions from './types/ConnectionOptions';
import PoolingOptions from './types/PoolingOptions';

export class Client {

	private readonly xClient: any;

	constructor(connectionOptions: ConnectionOptions, poolingOptions?: PoolingOptions) {
		this.xClient = mysql.getClient(connectionOptions, poolingOptions);
	}

	public getXClient() {
		return this.xClient;
	}

	public async getSession(): Promise<Session> {
		try {
			const xSession = await this.xClient.getSession();
			return new Session(this, xSession);
		} catch (error) {
			throw error;
		}
	}

	public async close() {
		try {
			await this.xClient.close();
		} catch (error) {
			throw error;
		}
	}

}

export default Client;
