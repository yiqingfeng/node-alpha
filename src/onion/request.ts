const request: Request = {
	req: {},
	get url() {
		return this.req.url;
	},
	get method() {
		return this.req.method.toLowerCase();
	},
};
export default request;
