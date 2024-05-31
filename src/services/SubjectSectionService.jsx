import { api, auth } from "apis";
import { API } from "apis/constant";

export class SubjectSectionService {
  static async getSubjects( token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( "/subjects", {
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
  static async getAllBySubjectId( grade, subjectEnum, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SUBJECTS + "/drop-down", {
          headers: headers,
          params: {
            grade: grade,
            subjectEnum: subjectEnum,
          },
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
          console.log( "SSSSSSSSSS", response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
  static async getById( id, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SUBJECTS + `/${ id }`, {
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
  static async add( data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.post( API.SUBJECTS, data, {
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
  static async getNav( params, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SUBJECTS + `/nav`, {
          headers: headers,
          params: params,
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
  static async getNavBySet( params, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.SUBJECTS + `/nav-by-set`, {
          headers: headers,
          params: params,
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
