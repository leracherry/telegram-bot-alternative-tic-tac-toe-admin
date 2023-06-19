class TokenService {
  getHeaders() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
  getToken() {
    return localStorage.getItem('accessToken');
  }

  getPasswordToken() {
    return localStorage.getItem('passwordToken');
  }

  setToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  setPasswordToken(accessToken: string) {
    localStorage.setItem('passwordToken', accessToken);
  }

  removeToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('passwordToken');
  }
}

export default new TokenService();
