import React, {Component} from "react";
import {View, Dimensions} from "react-native";
import ImagePicker from "react-native-image-picker";
import {GiftedChat, Composer, Bubble, Actions, MessageText, Send} from "./components/GiftedChat";
import {Container, Content, Header} from "../../components/index";

var width = Dimensions.get('window').width;

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			typingText: null,
			isLoadingEarlier: false,
			flag: false,
			bottom: true,
		};
		that = this;
		this._isMounted = false;
		this.onSend = this.onSend.bind(this);
		this.onReceive = this.onReceive.bind(this);
		this.renderBubble = this.renderBubble.bind(this);

	}

	componentWillMount() {
		this._isMounted = true;

	}

	componentWillUnmount() {
		this._isMounted = false
	}


	onSend(messages = []) {
		let {dispatch, userchat} = this.props;
		this.setState(previousState => {
			return {
				messages: GiftedChat.append(previousState.messages, messages),
			}
		});
		// dispatch(changeChatLog(messages, userchat));

		this.onReceive(messages)
	}

	onReceive(messages) {
		let {dispatch, userchat} = this.props;
		request.getJson("http://www.tuling123.com/openapi/api", {
			key: '327180406d377b990d919b0947a909b5',
			info: messages[0].text
		}).then((res) => {
			let receiveMessage = {
				text: res.text,
				_id: (Math.random() * 35213321212).toString(),
				// text: res[0].content,
				createdAt: new Date(),
				user: {
					_id: 2,
					name: userchat,
					avatar: 'https://facebook.github.io/react/img/logo_og.png',
				},
			};
			this.setState(previousState => {
				return {
					messages: GiftedChat.append(previousState.messages, receiveMessage),
				}
			});
			// dispatch(changeChatLog([receiveMessage], userchat))
		})
	}


	renderBubble(props) {
		let {dispatch, userchat} = this.props;
		return (
			<Bubble
				{...props}
				wrapperStyle={styles.wrapperStyle}
				containerStyle={styles.containerStyle}
			/>
		)
		// deleteMessage={(id)=>{
		//     dispatch(changeChatLog(id, userchat))
		// }}
	}

	renderMessageText(props) {
		return (
			<MessageText
				{...props}
				textStyle={styles.textStyle}
			/>
		)
	}

	renderComposer(props) {
		return (
			<Composer
				{...props}
				placeholder=""
			/>
		)
	}

	renderSend(props) {
		return (
			<Send
				{...props}
				label="发送"
			/>
		)
	}

	renderActions(props) {
		return (
			<Actions
				{...props}
			/>
		)
	}

	onPressActionButton() {
		let {dispatch, userchat} = this.props;
		const options = {
			title: '选择图片',
			cancelButtonTitle: '取消',
			takePhotoButtonTitle: '拍照',
			chooseFromLibraryButtonTitle: '从手机相册选择',
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		};
		var source = {};
		ImagePicker.showImagePicker(options, (response) => {
			if (response.uri) {
				// let source = {uri: response.uri};
				let receiveMessage = {
					image: response.uri,
					_id: (Math.random() * 35213321212).toString(),
					// text: res[0].content,
					createdAt: new Date(),
					user: {
						_id: 1,
						name: 'React Native',
						avatar: 'https://facebook.github.io/react/img/logo_og.png',
					},
				};
				this.setState(previousState => {
					return {
						messages: GiftedChat.append(previousState.messages, receiveMessage),
					}
				});
				// dispatch(changeChatLog([receiveMessage], userchat));

			} else {
				return;
			}
		});
	}

	render() {
		return (
			<Container delay>
				<Header {...this.props}/>
				<Content gray>
					<GiftedChat
						messages={this.state.messages}
						onSend={this.onSend}
						user={{
                            _id: 1,
                            name: 'React Native',
                            avatar: 'https://facebook.github.io/react/img/logo_og.png',
                        }}
						flag={this.state.bottom}
						renderBubble={this.renderBubble}
						renderAvatarOnTop={true}
						renderTime={() => {}}
						renderMessageText={this.renderMessageText}
						renderComposer={this.renderComposer}
						renderSend={this.renderSend}
						renderActions={this.renderActions}
						onPressActionButton={this.onPressActionButton.bind(this)}
					/>
				</Content>
			</Container>
		)
	}


}
const styles = {
	footerContainer: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	footerText: {
		fontSize: 14,
		color: '#aaa',
	},
	wrapperStyle: {
		right: {
			backgroundColor: '#A1CC00',
			borderRadius: 5,
		},
		left: {
			backgroundColor: '#fff',
			borderRadius: 5,
		}
	},
	containerStyle: {
		right: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'flex-start',
		},
		left: {
			flexDirection: 'row',
			alignItems: 'flex-start',
			justifyContent: 'flex-start'
		}
	},
	textStyle: {
		right: {
			padding: 5,
		},
		left: {
			padding: 5,
		}
	}

}