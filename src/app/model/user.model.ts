export class User {
	constructor(
		public email : string, 
		public localId : string, 
		private _tokenId : string, 
		private _tokenExpirationDate : Date
	){}
	
	get token(){
		if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
			return null;
		}
		return this._tokenId;
	}
}