import {observable, runInAction, computed, action, reaction} from "mobx";

class CollectionListStore {
    @observable collectionList_articl = []
    @observable collectionList_theme = []
    @observable page_a = 1
    @observable page_t = 1
    @observable pageCount_a = 1
    @observable pageCount_t = 1
    @observable isRefreshing_a = false
    @observable isRefreshing_t = false
    @observable errorMsg_a = ''
    @observable errorMsg_t = ''


    @action
    fetchCollectionList_articl = async () => {
        try {
            if (this.isRefreshing_a) this.page_a = 1
            const result = await this._fetchDataFromUrl(1,this.page_a)
            runInAction(() => {
                this.isRefreshing_a = false
                this.errorMsg_a = ''

                this.pageCount_a = result.pageCount
                if (this.page_a == 1) {
                    this.collectionList_articl.replace(result.list)
                } else {
                    this.collectionList_articl.splice(this.collectionList_articl.length, 0, ...result.list);
                }
            })
        } catch (error) {
            this.errorMsg_a = error
        }
    }
    @action
    fetchCollectionList_theme = async () => {
        try {
            if (this.isRefreshing_t) this.page_t = 1
            const result = await this._fetchDataFromUrl(2,this.page_t)
            runInAction(() => {
                this.isRefreshing_t = false
                this.errorMsg_t = ''

                this.pageCount_t = result.pageCount
                if (this.page_t == 1) {
                    this.collectionList_theme.replace(result.list)
                } else {
                    this.collectionList_theme.splice(this.collectionList_theme.length, 0, ...result.list);
                }
            })
        } catch (error) {
            this.errorMsg_t = error
        }
    }
    @computed
    get isFetching_a() {
        return this.collectionList_articl.length == 0 && this.errorMsg_a == ''
    }

    @computed
    get isNoResult_a() {
        return this.collectionList_articl.length !== 0
    }

    @computed
    get isLoadMore_a() {
        return this.page_a != 1
    }

    @computed
    get isLastPage_a() {
        return this.page_a == this.pageCount_a
    }

    @computed
    get isFetching_t() {
        return this.collectionList_theme.length == 0 && this.errorMsg_t == ''
    }

    @computed
    get isNoResult_t() {
        return this.collectionList_theme.length !== 0
    }

    @computed
    get isLoadMore_t() {
        return this.page_t != 1
    }

    @computed
    get isLastPage_t() {
        return this.page_t == this.pageCount_t
    }

    _fetchDataFromUrl(tp,pa) {
        return new Promise((resolve, reject) => {
            request.getJson(urls.apis.COLLECTIONAPI_GETMYCOLLECTIONLIST, {
                type:tp,
                page:pa
            }).then((result) => {
                    if (result.ok) {
                        resolve(result.obj)
                    }
                })
        })
    }
}
const collectionListStore = new CollectionListStore()

reaction(
    () => collectionListStore.page,
    () => collectionListStore.fetchCollectionList_articl()
)

export default collectionListStore