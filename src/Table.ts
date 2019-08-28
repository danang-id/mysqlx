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
import TableInsert from './TableInsert';
import TableSelect from './TableSelect';
import TableUpdate from './TableUpdate';
import TableDelete from './TableDelete';
import OperationResult from './OperationResult';
import Document from './types/Document';
import IndexDefinition from './types/IndexDefinition';
import SearchCondition from './types/SearchCondition';
import SearchConditionString from './types/SearchConditionString';

export class Table {

	private readonly schema: Schema;
	private readonly xTable: any;

	constructor(schema: Schema, xTable: any) {
		this.schema = schema;
		this.xTable = xTable;
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

	public getXTable() {
		return this.xTable;
	}

	public async count(): Promise<number> {
		try {
			return await this.xTable.count();
		} catch (error) {
			throw error;
		}
	}

	public delete(condition: SearchCondition | SearchConditionString = true): TableDelete {
		try {
			const conditionString = Table.createConditionString(condition);
			const xTableRemove = this.xTable.delete(conditionString);
			return new TableDelete(this, xTableRemove);
		} catch (error) {
			throw error;
		}
	}

	public async existsInDatabase(): Promise<boolean> {
		try {
			return await this.xTable.existsInDatabase();
		} catch (error) {
			throw error;
		}
	}

	public getName(): string {
		return this.xTable.getName();
	}

	public insert(fields: string[]): TableInsert;
	public insert(fields: { [k: string]: any }): TableInsert;
	public insert(...fields: string[]): TableInsert;
	public insert(...fields: any[]): TableInsert {
		try {
			const xTableInsert = this.xTable.insert(...fields);
			return new TableInsert(this, xTableInsert);
		} catch (error) {
			throw error;
		}
	}

	public inspect(): Object {
		return this.xTable.inspect();
	}

	public async isView(): Promise<boolean> {
		return await this.xTable.isView();
	}

	public select(fields: string[]): TableSelect;
	public select(...fields: string[]): TableSelect;
	public select(...fields: any[]): TableSelect {
		try {
			const xTableSelect = this.xTable.select(...fields);
			return new TableSelect(this, xTableSelect);
		} catch (error) {
			throw error;
		}
	}

	public update(condition?: SearchCondition | SearchConditionString): TableUpdate {
		try {
			const conditionString = condition !== void 0 ? Table.createConditionString(condition) : condition;
			const xTableUpdate = this.xTable.modify(conditionString);
			return new TableUpdate(this, xTableUpdate);
		} catch (error) {
			throw error;
		}
	}

}

export default Table;
