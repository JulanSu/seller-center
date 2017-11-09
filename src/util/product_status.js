export const getProductStatus = (value) => {
	//let statusList = ['未通过', '草稿箱', '审核中', '待上架', '已上架', '已下架', '回收站']
	let curStatus = ''
	switch(value){
		case 1:
			curStatus = '审核中';
			break;
		case 2:
			curStatus = '待上架';
			break;		
		case 3:
			curStatus = '已上架';
			break;	
		case 4:
			curStatus = '已下架';
			break;	
		case 5:
			curStatus = '回收站';
			break;		
		case 0:
			curStatus = '草稿箱';
			break;
		case -1:
			curStatus = '未通过';
			break;
	}
	
	return curStatus
}