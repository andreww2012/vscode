/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Emitter } from 'vs/base/common/event';
import { Disposable, IDisposable, toDisposable } from 'vs/base/common/lifecycle';
import { ISCMHistoryProvider, ISCMHistoryService } from 'vs/workbench/contrib/scm/common/history';

export class SCMHistoryService extends Disposable implements ISCMHistoryService {

	declare readonly _serviceBrand: undefined;

	private historyProviders: Map<string, ISCMHistoryProvider> = new Map<string, ISCMHistoryProvider>();

	private readonly _onDidChangeHistoryProviders = this._register(new Emitter<void>());
	readonly onDidChangeHistoryProviders = this._onDidChangeHistoryProviders.event;

	addHistoryProvider(historyProvider: ISCMHistoryProvider): IDisposable {
		this.historyProviders.set(historyProvider.id, historyProvider);
		this._onDidChangeHistoryProviders.fire();

		return toDisposable(() => {
			this.historyProviders.delete(historyProvider.id);
			this._onDidChangeHistoryProviders.fire();
		});
	}

	getHistoryProvider(id: string): ISCMHistoryProvider | undefined {
		return this.historyProviders.get(id);
	}
}
