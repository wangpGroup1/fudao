import {AsyncStorage} from "react-native";
import {observable,computed, action} from "mobx";

class ArticleStore {
	@observable articleColumnList = [];
	@observable errorMsg = '';
	@observable a = 1;
	@observable idArr = [];


	@action
	/*fetchArticleColumnList() {
		request.getJson(urls.apis.ARTICLE_GETARTICLECOLUMNLIST)
			.then((result) => {
				if (result.ok) {
					this.articleColumnList = result.obj;
				} else {
					tools.showToast('请求出错！')
				}
			});
	}*/
	@action
	_fetchArticleColumnList(a) {
		this.articleColumnList=[];
		request.getJson(urls.apis.ARTICLEAPI_GETARTICLELIST, {page:a,ids:this.idArr})
			.then((result) => {
				/*this.refs.list.scrollTo([0, 0]);*/
				this.articleColumnList = result.obj.list;
				this.idArr=[];
				result.obj.list.map((item,index)=>{
					this.idArr.push(item.id)
				})
			});
	}
	@computed
	get isFetching() {
		return this.articleColumnList.length == 0 && this.errorMsg == ''
	}
}
const articleStore = new ArticleStore();
export default articleStore