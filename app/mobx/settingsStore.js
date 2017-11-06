import {observable, asMap, action, reaction, runInAction} from "mobx";

class SettingsStore {
	@observable isRecommend = true
}

const settingsStore = new SettingsStore()
export default settingsStore