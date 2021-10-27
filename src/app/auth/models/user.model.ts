export class UserModel{
  constructor(public id:string, public email:string,
              private expiresDate: Date, private _token:string){}

  get token(){
    if(this.expiresDate > new Date()){
      return this._token;
    }else{
      return null;
    }
  }
}
