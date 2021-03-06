import { Cache } from '@klasa/cache';
import { Store } from './Store';

import type { AliasPiece } from './AliasPiece';

/**
 * @since 0.0.1
 * The common base for all alias stores.
 */
export class AliasStore<V extends AliasPiece> extends Store<V> {

	/**
	 * The different aliases that represent the arguments in this store.
	 * @since 0.0.1
	 */
	public readonly aliases = new Cache<string, V>();

	/**
	 * Returns an AliasPiece in the store if it exists by its name or by an alias.
	 * @since 0.0.1
	 * @param name A argument or alias name
	 */
	public get(name: string): V | undefined {
		return super.get(name) || this.aliases.get(name);
	}

	/**
	 * Returns a boolean if the AliasPiece or alias is found within the store.
	 * @since 0.0.1
	 * @param name A piece or alias name
	 */
	public has(name: string): boolean {
		return super.has(name) || this.aliases.has(name);
	}

	/**
	 * Adds and sets up an AliasPiece in our store.
	 * @since 0.0.1
	 * @param piece The piece we are setting up
	 */
	public add(piece: V): V | null {
		const aliasPiece = super.add(piece);
		if (!aliasPiece) return null;
		for (const alias of aliasPiece.aliases) this.aliases.set(alias, aliasPiece);
		return aliasPiece;
	}

	/**
	 * Removes an AliasPiece from the store.
	 * @since 0.0.1
	 * @param name An AliasPiece object or a string representing an AliasPiece or alias name
	 * @returns Whether or not the removal was successful.
	 */
	public remove(name: V | string): boolean {
		const aliasPiece = this.resolve(name) as V | null;
		if (!aliasPiece) return false;
		for (const alias of aliasPiece.aliases) this.aliases.delete(alias);
		return super.remove(aliasPiece);
	}

	/**
	 * Clears the AliasPieces and aliases from this store
	 * @since 0.0.1
	 */
	public clear(): void {
		super.clear();
		this.aliases.clear();
	}

}
