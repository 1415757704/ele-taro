import { GETADDRESSLIST } from '@constants/address.js'
import { getAddressList } from '@api/address.js'

const setAddressyList = (addressList) => {
	return {
		type: GETADDRESSLIST,
		data: addressList
	}
}

export const asyncGetAddressList = ({ phone }) => {
	return async dispatch => {
		let addressList = await getAddressList({ phone })
		dispatch(setAddressyList(addressList))
		return Promise.resolve(addressList)
	}
}
