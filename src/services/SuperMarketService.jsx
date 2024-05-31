import { api, auth } from "apis";
import { API } from "apis/constant";

export class SuperMarketService {
  static async getExam( token, params ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SHARE + `/market?studyYear=${ params.studyYear }`, {
          // params: params,
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
  static async getListPay( token, params ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SHARE + `/sell-list`, {
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
  static async getListBought( token, params ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SHARE + `/bought-list`, {
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
  static async getRequest( token, params ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SHARE + `/requests`, {
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
  static async createRequest( data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.post( API.SHARE + `/requests`, data, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          console.log( response )
          reject( response.data );
        }
      } catch ( error ) {
        console.log( error )
<<<<<<< Updated upstream
        reject( error.request.response );
=======
        reject( error.response.data );
>>>>>>> Stashed changes
        // reject( error.message );
      }
    } );
  }
  static async share( data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.post( API.SHARE + "/individual", data, {
          headers: headers,
        } );
        console.log( response );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
<<<<<<< Updated upstream
=======
        console.log( error )
>>>>>>> Stashed changes
        reject( error.response.data );
      }
    } );
  }

  static async buy( data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.post( API.SHARE + "/buy", data, {
          headers: headers,
        } );
        console.log( response );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
<<<<<<< Updated upstream
        reject( error.message );
=======
        reject( error.response.data );
>>>>>>> Stashed changes
      }
    } );
  }

  static async report( id, data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.put( API.SHARE + `/report/${ id }`, data, {
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

  static async getQuestionSetById( id, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SHARE + `/${ id }`, {
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
  static async save( data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );

        const response = await api.post( API.SHARE + "/save", data, {
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

  static async response( id, data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.put( API.SHARE + `/response/${ id }`, data, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
<<<<<<< Updated upstream
        reject( error.message );
=======
        reject( error.response.data );
>>>>>>> Stashed changes
      }
    } );
  }

  static async delete( id, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.delete( API.SHARE + `/${ id }`, {
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
}
