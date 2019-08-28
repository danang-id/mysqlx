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

import isBoolean from 'lodash.isboolean';
import isNumber from 'lodash.isnumber';
import isString from 'lodash.isstring';
import Client from './Client';
import Session from './Session';
import Schema from './Schema';
import CollectionAdd from './CollectionAdd';
import CollectionFind from './CollectionFind';
import CollectionModify from './CollectionModify';
import CollectionRemove from './CollectionRemove';
import OperationResult from './OperationResult';
import Document from './types/Document';
import IndexDefinition from './types/IndexDefinition';
import SearchCondition from './types/SearchCondition';
import SearchConditionString from './types/SearchConditionString';

export class Collection {

	private readonly schema: Schema;
	private readonly xCollection: any;

	constructor(schema: Schema, xCollection: any) {
		this.schema = schema;
		this.xCollection = xCollection;
	}

	private static createConditionString(condition: SearchCondition | SearchConditionString): SearchConditionString {
		let conditionString: SearchConditionString = '';
		if (isString(condition)) {
			conditionString = condition;
		} else if (isBoolean(condition)) {
			conditionString = condition.toString();
		} else {
			let firstCondition = true;
			for (const key in condition) {
				if (condition.hasOwnProperty(key)) {
					const value = isNumber(condition[key]) || isBoolean(condition[key])
						? condition[key].toString()
						: `"${ condition[key] }"`;
					conditionString = conditionString
						.concat(firstCondition ? '' : '  & ')
						.concat(key)
						.concat('=')
						.concat(value);
					if (firstCondition) {
						firstCondition = false;
					}
				}
			}
		}
		return conditionString;
	}

	public getClient(): Client | null {
		return this.schema.getClient();
	}

	public getSession(): Session {
		return this.schema.getSession();
	}

	public getSchema(): Schema {
		return this.schema;
	}

	public getXCollection() {
		return this.xCollection;
	}

	public add(document: Document | Document[]): CollectionAdd {
		try {
			const xCollectionAdd = this.xCollection.add(document);
			return new CollectionAdd(this, xCollectionAdd);
		} catch (error) {
			throw error;
		}
	}

	public async addOrReplaceOne(id: string, document: Document): Promise<OperationResult> {
		try {
			const xResult = await this.xCollection.addOrReplaceOne(id, document);
			return new OperationResult(xResult);
		} catch (error) {
			throw error;
		}
	}

	public async count(): Promise<number> {
		try {
			return await this.xCollection.count();
		} catch (error) {
			throw error;
		}
	}

	public async createIndex(name: string, constraint: IndexDefinition): Promise<boolean> {
		try {
			return await this.xCollection.createIndex(name, constraint);
		} catch (error) {
			throw error;
		}
	}

	public async dropIndex(name: string): Promise<boolean> {
		try {
			return await this.xCollection.dropIndex(name);
		} catch (error) {
			throw error;
		}
	}

	public async existsInDatabase(): Promise<boolean> {
		try {
			return await this.xCollection.existsInDatabase();
		} catch (error) {
			throw error;
		}
	}

	public find(condition: SearchCondition | SearchConditionString = true): CollectionFind {
		try {
			const conditionString = Collection.createConditionString(condition);
			const xCollectionFind = this.xCollection.find(conditionString);
			return new CollectionFind(this, xCollectionFind);
		} catch (error) {
			throw error;
		}
	}

	public async findOne(condition: SearchCondition | SearchConditionString): Promise<Document | undefined> {
		try {
			const findResult = await this.find(condition).execute();
			const documents = findResult.getDocuments();
			return documents.length > 0 ? documents[0] : void 0;
		} catch (error) {
			throw error;
		}
	}

	public async findByID(id: string): Promise<Document | undefined> {
		try {
			return await this.findOne({ _id: id });
		} catch (error) {
			throw error;
		}
	}

	public getName(): string {
		return this.xCollection.getName();
	}

	public async getOne(id: string): Promise<Document> {
		try {
			return await this.xCollection.getOne(id);
		} catch (error) {
			throw error;
		}
	}

	public inspect(): Object {
		return this.xCollection.inspect();
	}

	public modify(condition: SearchCondition | SearchConditionString): CollectionModify {
		try {
			const conditionString = Collection.createConditionString(condition);
			const xCollectionModify = this.xCollection.modify(conditionString);
			return new CollectionModify(this, xCollectionModify);
		} catch (error) {
			throw error;
		}
	}

	public remove(condition: SearchCondition | SearchConditionString = true): CollectionRemove {
		try {
			const conditionString = Collection.createConditionString(condition);
			const xCollectionRemove = this.xCollection.remove(conditionString);
			return new CollectionRemove(this, xCollectionRemove);
		} catch (error) {
			throw error;
		}
	}

	public async removeByID(id: string): Promise<OperationResult> {
		try {
			return await this.remove({ _id: id }).execute();
		} catch (error) {
			throw error;
		}
	}

	public async replaceOne(id: string, document: Document): Promise<OperationResult> {
		try {
			const xResult = await this.xCollection.replaceOne(id, document);
			return new OperationResult(xResult);
		} catch (error) {
			throw error;
		}
	}

}

export default Collection;
