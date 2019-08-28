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
import Client from "./Client";
import Session from "./Session";
import LockContentionConstant from "./types/LockContentionConstant";
import DataModelConstant from "./types/DataModelConstant";
import ConnectionOptions from "./types/ConnectionOptions";
import PoolingOptions from "./types/PoolingOptions";
import Expression from "./types/Expression";
import ParserOptions from "./types/ParserOptions";
import ProtobufObject from "./types/ProtobufObject";

export const LockContention: LockContentionConstant = {
	DEFAULT: 0,
	NOWAIT: 1,
	SKIP_LOCKED: 2
}

export const DataModel: DataModelConstant = {
	DOCUMENT: 1,
	TABLE: 2
}

export function expr(expression: Expression, options?: ParserOptions): ProtobufObject {
	return mysql.expr(expression, options);
}

export function getClient(connection: ConnectionOptions, pooling: PoolingOptions): Client {
	return new Client(connection, pooling);
}

export async function getSession(connection: ConnectionOptions): Promise<Session> {
	try {
		const xSession = await mysql.getSession(connection);
		return new Session(null, xSession);
	} catch (error) {
		throw error;
	}
}

export function getVersion(): string {
	return require('root-require')('package.json').version;
}

export function getXVersion(): string {
	return mysql.getVersion();
}

export default {
	LockContention,
	DataModel,
	expr,
	getClient,
	getSession,
	getVersion,
	getXVersion
}