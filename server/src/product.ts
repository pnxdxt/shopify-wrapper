import {
	PRODUCT_BY_HANDLE_QUERY,
	PRODUCT_BY_ID_QUERY,
} from '@/common/queries/product';
import {
	ProductByHandleQuery,
	ProductByHandleQueryVariables,
	ProductByIdQuery,
	ProductByIdQueryVariables,
} from '@/common/schema';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {shopifyFetch} from './fetch';
import {productWithPlaiceholder} from './lib/product-plaiceholder';

export const getProductByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig
): Promise<Storefront.Product | undefined> => {
	const res = await shopifyFetch<
		ProductByHandleQuery,
		ProductByHandleQueryVariables
	>(
		PRODUCT_BY_HANDLE_QUERY,
		{
			handle,
		},
		fetchConfig
	);

	if (!res?.product) return;
	return productWithPlaiceholder(res.product);
};

export const getProductById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig
): Promise<Storefront.Product | undefined> => {
	const res = await shopifyFetch<ProductByIdQuery, ProductByIdQueryVariables>(
		PRODUCT_BY_ID_QUERY,
		{
			id,
		},
		fetchConfig
	);

	if (!res?.product) return;
	return productWithPlaiceholder(res.product);
};
