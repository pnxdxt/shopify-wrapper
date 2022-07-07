import gql from 'graphql-tag';
import {FullCustomer} from '../fragments.js';

export const CUSTOMER_QUERY = gql`
	query customer($accessToken: String!) {
		customer(customerAccessToken: $accessToken) {
			...FullCustomer
		}
	}
	${FullCustomer}
`;
