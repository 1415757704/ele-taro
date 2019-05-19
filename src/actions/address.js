import { GETADDRESSLIST, UPDATEADDRESSBYID, SETDEVELERYADDRESS } from '@constants/address.js'
import { getAddressList, modifiedAddress, addAddress } from '@api/address.js'

const setAddressyList = (addressList) => {
	return {
		type: GETADDRESSLIST,
		data: addressList
	}
}

const updateAddressById = (address) => {
	return {
		type: UPDATEADDRESSBYID,
		data: address
	}
}

// 更新当前选中的收货地址
export const updateSelectedAddress = ({ address }) => {
	return {
		type: SETDEVELERYADDRESS,
		data: address
	}
}

// 获取收货地址
export const asyncGetAddressList = ({ phone }) => {
	return async dispatch => {
		let addressList = await getAddressList({ phone })
		dispatch(setAddressyList(addressList))
		return Promise.resolve(addressList)
	}
}

// 修改收获地址
export const asyncModifiedAddress = ({ phone, address }) => {
	return async dispatch => {
		let {
			status,
			data: {
				harvestAddress
			}
		} = await modifiedAddress({ phone, address })
		
		dispatch(updateAddressById(harvestAddress))
		return Promise.resolve(status)
	}
}

// 添加收货地址
export const asyncAddAddress = ({ phone, address }) => {
	return async dispatch => {
		let {
			status,
			data: {
				harvestAddress
			}
		} = await addAddress({ phone, address })
		
		dispatch(updateAddressById(harvestAddress))
		return Promise.resolve(status)
	}
}
