import {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {
	MetafieldByProductHandleQuery,
	MetafieldByProductHandleQueryVariables,
	MetafieldByProductIdQuery,
	MetafieldByProductIdQueryVariables,
} from './graphql/schema.js';
import {normalizeMetafield} from './normalize/metafield';
import {
	METAFIELD_BY_PRODUCT_HANDLE_QUERY,
	METAFIELD_BY_PRODUCT_ID_QUERY,
} from './queries/metafield';
import type {ShopifyFetchConfig, Storefront} from './types/index';

const getMetafieldByProductHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	namespace: string,
	key: string,
): Promise<Storefront.Metafield | undefined> => {
	const response = await shopifyFetch<
		MetafieldByProductHandleQuery,
		MetafieldByProductHandleQueryVariables
	>(
		METAFIELD_BY_PRODUCT_HANDLE_QUERY,
		{
			handle,
			namespace,
			key,
		},
		fetchConfig,
	);

	if (!response?.product?.metafield) {
		return;
	}

	return normalizeMetafield(response.product.metafield);
};

const getMetafieldByProductId = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	namespace: string,
	key: string,
): Promise<Storefront.Metafield | undefined> => {
	const response = await shopifyFetch<
		MetafieldByProductIdQuery,
		MetafieldByProductIdQueryVariables
	>(
		METAFIELD_BY_PRODUCT_ID_QUERY,
		{
			id,
			namespace,
			key,
		},
		fetchConfig,
	);

	if (!response?.product?.metafield) {
		return;
	}

	return normalizeMetafield(response.product.metafield);
};

type FindOptionalArgs = {
	productHandle: string;
	productId: string;
};

type FindMandatoryArgs = {
	config: ShopifyFetchConfig;
	namespace: string;
	key: string;
};

type FindCollectionArgs = Merge<
	RequireExactlyOne<FindOptionalArgs>,
	FindMandatoryArgs
>;

export const find = async ({
	productId,
	productHandle,
	config,
	namespace,
	key,
}: FindCollectionArgs) => {
	if (productHandle) {
		return getMetafieldByProductHandle(productHandle, config, namespace, key);
	}

	if (productId) {
		return getMetafieldByProductId(productId, config, namespace, key);
	}

	throw new Error('provide either productId or productHandle');
};