//test
// export const increment = ({commit}) => {
// 	console.log('nihao', commit)
//     commit('INCREMENT')
// }

// export const decrement = ({commit}) => {
//     commit('DECREMENT')
// }

// export const updateUserSelectedSku = ({commit}) => {
// 	console.log('nihao', commit)
//     commit('UPDATE_USER_SELECTED_THE_SKU')
// }
export default {
	updateUserSelectedSku( {commit}, data ) {
		commit('UPDATE_USER_SELECTED_THE_SKU', data)
	}
}