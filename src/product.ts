import {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {PRODUCT_BY_HANDLE_QUERY, PRODUCT_BY_ID_QUERY} from './queries/product';
import {
	ProductByHandleQuery,
	ProductByHandleQueryVariables,
	ProductByIdQuery,
	ProductByIdQueryVariables,
} from './graphql/schema';
import type {Storefront, ShopifyFetchConfig} from './types/index';
import {normalizeProduct} from './normalize/product';

const getProductByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Product | undefined> => {
	const response = await shopifyFetch<
		ProductByHandleQuery,
		ProductByHandleQueryVariables
	>(
		PRODUCT_BY_HANDLE_QUERY,
		{
			handle,
		},
		fetchConfig,
	);

	if (!response?.product) return;
	return normalizeProduct(response.product);
};

const getProductById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Product | undefined> => {
	const response = await shopifyFetch<
		ProductByIdQuery,
		ProductByIdQueryVariables
	>(
		PRODUCT_BY_ID_QUERY,
		{
			id,
		},
		fetchConfig,
	);

	if (!response?.product) return;
	return normalizeProduct(response.product);
};

type FindOptionalArgs = {
	handle: string;
	id: string;
};
type FindMandatoryArgs = {config: ShopifyFetchConfig};

type FindCollectionArgs = Merge<
	RequireExactlyOne<FindOptionalArgs>,
	FindMandatoryArgs
>;

export const find = async ({id, handle, config}: FindCollectionArgs) => {
	if (handle) {
		return getProductByHandle(handle, config);
	}

	if (id) {
		return getProductById(id, config);
	}

	throw new Error('provide either id or handle');
};