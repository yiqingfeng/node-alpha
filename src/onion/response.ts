const response: Response = {
	res: {},
	_body: null,
	get body() {
		return this._body;
	},
	set body(data) {
		this._body = data;
	},
};
export default request;
