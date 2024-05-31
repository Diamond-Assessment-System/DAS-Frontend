import { api, auth } from "apis";
import { API } from "apis/constant";

export class ManageService {
<<<<<<< Updated upstream
  static async getOwnExam(token, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.get(API.MANAGE + `/own-questionset`, {
          params: params,
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async getExamBank(token, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.get(API.MANAGE + `/bank`, {
          params: params,
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async create(data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        headers["Content-Type"] = "multipart/form-data";
=======
  static async getOwnExam( token, params ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.MANAGE + `/own-questionset`, {
          params: params,
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
  static async getExamBank( token, params ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.MANAGE + `/bank`, {
          params: params,
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
  static async create( data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        headers[ "Content-Type" ] = "multipart/form-data";
>>>>>>> Stashed changes
        const response = await api.post(
          API.MANAGE + "/import-questionset",
          data,
          {
            headers: headers,
          }
        );
<<<<<<< Updated upstream
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }

  static async getQuestionSetById(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.get(API.MANAGE + `/${id}`, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }

  static async changeStatus(id, data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.put(
          API.MANAGE + `/${id}/change-status`,
=======
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.response.data );
      }
    } );
  }

  static async getQuestionSetById( id, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.MANAGE + `/${ id }`, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }

  static async changeStatus( id, data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.put(
          API.MANAGE + `/${ id }/change-status`,
>>>>>>> Stashed changes
          data,
          {
            headers: headers,
          }
        );
<<<<<<< Updated upstream
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async save(data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);

        const response = await api.post(API.MANAGE + "/save", data, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
          console.log("testing /save", response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }

  static async delete(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.delete(API.MANAGE + `/${id}`, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
=======
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
  static async save( data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );

        const response = await api.post( API.MANAGE + "/save", data, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
          console.log( "testing /save", response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.response.data );
      }
    } );
  }

  static async delete( id, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.delete( API.MANAGE + `/${ id }`, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
>>>>>>> Stashed changes
  }
}
