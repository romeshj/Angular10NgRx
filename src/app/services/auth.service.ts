import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

export interface AuthResponseData{
	idToken : string,
	email : string,
	refreshToken : string,
	expiresIn : string,
	localId : string,
	registered? : boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private tokenExpirationTimer: any;

  constructor(private http : HttpClient, private router : Router, private store: Store<fromApp.AppState>) { }
  
  signUp(email : string, password :  string){
	
	return this.http.post<AuthResponseData>(
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
		{
			email : email,
			password : password,
			returnSecureToken: true
		}
	)
	.pipe(
		catchError(this.handleError), 
		tap(resData => {
				console.log(resData);
				this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
		})
	);	
  }
  
  
  
  logout(){
	this.store.dispatch(new AuthActions.Logout())
	this.router.navigate(['/dashboard/auth']);
	localStorage.removeItem('userData');
	if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  
  
  autoLogin(){
	const userData : {
		email : string,
		localId : string, 
		_tokenId : string, 
		_tokenExpirationDate : Date
	} = JSON.parse(localStorage.getItem('userData'));
	
	if(!userData) {
		return;
	}
	
	const loggedInUser = new User(userData.email, userData.localId, userData._tokenId, new Date(userData._tokenExpirationDate));
	
	console.log(loggedInUser);
	
	if(loggedInUser.token){
		this.store.dispatch(
        new AuthActions.Login({
          email: loggedInUser.email,
          localId: loggedInUser.localId,
          token: loggedInUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      );
		const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
	}
  }
  
  autoLogout(expirationDuration: number) {
   console.log(expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  
  
  private handleAuthentication(email : string, userId : string, token : string, expiresIn : number){
	const currentTime = new Date().getTime();
	const expires_In = expiresIn * 1000;
	const expirationTime = currentTime + expires_In;
	const expirationDate = new Date(expirationTime);
	
	const user = new User(email, userId, token, expirationDate);
	console.log(" user ", user);
	this.store.dispatch(new AuthActions.Login(
		{
		email : email, 
		localId : userId, 
		token : token, 
		expirationDate : expirationDate
		}
	))
	this.autoLogout(expiresIn * 1000);
	localStorage.setItem('userData', JSON.stringify(user));
  }
  
  private handleError(errorRes : HttpErrorResponse){
	let errorMessage = 'An unknown error occurred!';
	console.log( "  errorRes " , errorRes);
	if (!errorRes.error || !errorRes.error.error) {
		return throwError(errorMessage);
	}
	switch (errorRes.error.error.message) {
		case 'EMAIL_EXISTS':
			errorMessage = 'This email already exists.';
		break;
		case 'EMAIL_NOT_FOUND':
			errorMessage = 'This email dose not exist.';
		break;
		case 'INVALID_PASSWORD':
			errorMessage = 'The password is not correct.';
		break;		
	}
	
	console.log(errorMessage)
	return throwError(errorMessage)
  }
}
